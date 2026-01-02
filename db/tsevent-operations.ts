import type { HistoryTag } from '@/types/history-tag';
import { type ITimeSenseEvent, TimeSenseEvent } from '@/types/time-sense-event';
import { UTCDate } from '@date-fns/utc';
import type { SQLiteDatabase } from 'expo-sqlite';

// CREATE Operations
export async function addTsEvent(
  db: SQLiteDatabase,
  tsEvent: Partial<ITimeSenseEvent> & { name: string }
): Promise<ITimeSenseEvent> {
  const newTsEvent = new TimeSenseEvent(tsEvent);

  const result = await db
    .runAsync(
      `
    INSERT INTO timeSenseEvents (details, icon, name)
      VALUES ($details, $icon, $name);
    `,
      {
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
  timestamps: {
    timestamp: UTCDate;
    tags: HistoryTag[];
  }[];
}) {
  const stmt = await db.prepareAsync(
    'INSERT INTO eventTriggers (tsEventId, triggerTimestamp) VALUES ($rowId, $timestamp);'
  );

  try {
    timestamps.map(async (ts) => {
      const normTs = {
        timestamp: ts.timestamp.toISOString(),
        tags: ts.tags as string[],
      };
      await stmt.executeAsync({
        $rowId: rowId,
        $timestamp: JSON.stringify(normTs),
      });
    });
  } finally {
    await stmt.finalizeAsync();
  }
}

// READ Operations
export async function getAllTsEvents(
  db: SQLiteDatabase
): Promise<ITimeSenseEvent[]> {
  return await db.getAllAsync<TimeSenseEvent>(
    `SELECT
      ts.rowid AS id, ts.details, ts.icon, ts.name,
      et.triggerTimestamp as triggerTimestamp
    FROM timeSenseEvents AS ts
    LEFT JOIN eventTriggers AS et
    ON ts.rowid == et.tsEventId
    GROUP BY ts.rowid;`
  );
}

export async function getTsEventById(
  db: SQLiteDatabase,
  id: number
): Promise<ITimeSenseEvent | null> {
  return await db.getFirstAsync<TimeSenseEvent>(`
    SELECT
      ts.rowid AS id, ts.details, ts.icon, ts.name,
      et.triggerTimestamp as triggerTimestamp
    FROM timeSenseEvents AS ts
    WHERE ts.id == ${id}
    LEFT JOIN eventTriggers AS et
    ON ts.rowid == et.tsEventId;
    `);
}

// UPDATE Operations
// export async function updateTsEvent(
//   db: SQLiteDatabase,
//   newTsEvent: Partial<ITimeSenseEvent> & { id: number }
// ): Promise<ITimeSenseEvent> {
//   const current = await getTsEventById(db, newTsEvent.id);

//   // Walk current and put fields with differences in a dictionary.
//   return newTsEvent;
// }

// DELETE Operations

async function normalizeTsEvent(tsEvent: TimeSenseEvent) {
  // Still need the DTO, I think. Pick up here tomorrow.
}
