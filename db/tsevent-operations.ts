import { type ITimeSenseEvent, TimeSenseEvent } from '@/types/time-sense-event';
import { UTCDate } from '@date-fns/utc';
import type { SQLiteDatabase } from 'expo-sqlite';

type TsEventDto = TimeSenseEvent & { triggerHistory?: string };

export async function getAllTsEvents(
  db: SQLiteDatabase
): Promise<ITimeSenseEvent[]> {
  const rawData = await db.getAllAsync<TsEventDto>(
    `SELECT
      ts.rowid AS id, ts.createdOn, ts.details, ts.icon, ts.name,
      COALESCE(GROUP_CONCAT(et.triggerTimestamp, ','), '') AS triggerHistory
    FROM timeSenseEvents AS ts
    LEFT JOIN eventTriggers AS et
    ON ts.rowid == et.tsEventId
    GROUP BY ts.rowid;`
  );

  return await Promise.all(
    rawData.map(async (evt) => await normalizeTimeSenseEvent(evt))
  );
}

export async function addTsEvent(
  db: SQLiteDatabase,
  tsEvent: Partial<ITimeSenseEvent> & { name: string }
): Promise<ITimeSenseEvent> {
  const newTsEvent = new TimeSenseEvent(tsEvent);

  const result = await db
    .runAsync(
      `
    INSERT INTO timeSenseEvents (createdOn, details, icon, name)
      VALUES ($createdOn, $details, $icon, $name);
    `,
      {
        $createdOn: newTsEvent.createdOn.toISOString(),
        $details: newTsEvent.details ?? null,
        $icon: newTsEvent.icon,
        $name: newTsEvent.name,
      }
    )
    .catch((reason) => {
      throw new Error(`Insert operation failed with error: ${reason}`);
    });

  if (result.changes !== 1) {
    throw new Error(
      `Insert operation was expected to change 1 row, actually changed ${result.changes}.`
    );
  }

  const rowId = result.lastInsertRowId;

  if (newTsEvent.triggerHistory.length > 0) {
    await addEventTriggers({
      db: db,
      rowId: rowId,
      timestamps: newTsEvent.triggerHistory,
    });
  }

  return newTsEvent;
}

export async function addEventTriggers({
  db,
  rowId,
  timestamps,
}: {
  db: SQLiteDatabase;
  rowId: number;
  timestamps: UTCDate[];
}) {
  const stmt = await db.prepareAsync(
    'INSERT INTO eventTriggers (tsEventId, triggerTimestamp) VALUES ($rowId, $timestamp);'
  );

  try {
    timestamps.map(
      async (ts) =>
        await stmt.executeAsync({
          $rowId: rowId,
          $timestamp: ts.toISOString(),
        })
    );
  } finally {
    await stmt.finalizeAsync();
  }
}

async function normalizeTimeSenseEvent(
  tsEvent: TsEventDto
): Promise<ITimeSenseEvent> {
  if (tsEvent.triggerHistory && typeof tsEvent.triggerHistory == 'string') {
    const histAsArray: UTCDate[] = tsEvent.triggerHistory
      .split(',')
      .map((h) => new UTCDate(h));

    return new TimeSenseEvent({ ...tsEvent, triggerHistory: histAsArray });
  }

  return new TimeSenseEvent({
    ...tsEvent,
    triggerHistory: tsEvent.triggerHistory,
  });
}
