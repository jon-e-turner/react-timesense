import { TimeSenseEvent } from '@/models/time-sense-event';
import type { HistoryTag } from '@/types/history-tag';
import { type ITimeSenseEvent } from '@/types/time-sense-event';
import { UTCDate } from '@date-fns/utc';
import type { SQLiteDatabase } from 'expo-sqlite';

// CREATE Operations
export async function addTsEvent(
  db: SQLiteDatabase,
  tsEvent: Partial<ITimeSenseEvent> & Pick<ITimeSenseEvent, 'name'>,
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
      },
    )
    .catch((reason) => {
      throw new Error(`Insert operation failed with error: ${reason}`);
    });

  if (result.changes !== 1) {
    throw new Error(
      `Insert operation was expected to change 1 row, actually changed ${result.changes}.`,
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

  return getTsEventById(db, rowId, true);
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
    'INSERT INTO eventTriggers (tsEventId, triggerTimestamp) VALUES ($rowId, json($timestamp));',
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
export async function getAllTsEvents( // TODO: Paginate this
  db: SQLiteDatabase,
  userOnly: boolean = false,
): Promise<ITimeSenseEvent[]> {
  const tsEvents = await db.getAllAsync<TimeSenseEvent>(`
    SELECT ts.id, ts.details, ts.icon, ts.name,
      json_group_array(json(et.triggerTimestamp)) as triggerHistory
    FROM timeSenseEvents AS ts
    LEFT JOIN (
      SELECT tsEventId, triggerTimestamp
      FROM eventTriggers AS et, json_each(et.triggerTimestamp, '$.tags')
      ${userOnly ? "WHERE json_each.value == 'user'" : ''}
    ) as et
    ON ts.rowid == et.tsEventId
    GROUP BY ts.rowid;
  `);

  return tsEvents.map((res) => {
    // TODO: Figure out how to not need this step. It makes the db read synchronous.
    res.triggerHistory = JSON.parse(res.triggerHistory as any as string);
    return new TimeSenseEvent(res);
  });
}

export async function getTsEventById(
  db: SQLiteDatabase,
  id: number,
  userOnly: boolean = false,
): Promise<ITimeSenseEvent> {
  const res = await db.getFirstAsync<TimeSenseEvent>(`
    SELECT ts.id, ts.details, ts.icon, ts.name,
      json_group_array(json(et.triggerTimestamp)) as triggerHistory
    FROM timeSenseEvents AS ts
    LEFT JOIN (
      SELECT tsEventId, triggerTimestamp
      FROM eventTriggers AS et, json_each(et.triggerTimestamp, '$.tags')
      ${userOnly ? "WHERE json_each.value == 'user'" : ''}
    ) as et
    ON ts.rowid == et.tsEventId
    WHERE ts.id == ${id}
    GROUP BY ts.id;
  `);

  if (res === null) {
    throw new Error(`Could not locate db record with id ${id}`);
  }

  res.triggerHistory = JSON.parse(res.triggerHistory as any as string);
  return new TimeSenseEvent(res);
}

// UPDATE Operations

/**
 * Use this function to update an existing `TimeSenseEvent `record. The `id` is assigned
 * by the database and is immutable. Since `eventTriggers` are considered immutable in
 * the library's data model, this function also does not update the trigger history. Use
 * either `addEventTrigger()` or `deleteEventTrigger()` as appropriate instead.
 *
 * @param db The database context.
 * @param newTsEvent The updated TimeSenseEvent; `newTsEvent.id` must be defined.
 * @returns A Promise that wil resolve to the updated TimeSenseEvent.
 */
export async function updateTsEvent(
  db: SQLiteDatabase,
  newTsEvent: ITimeSenseEvent,
): Promise<ITimeSenseEvent> {
  let updatedTsEvent: ITimeSenseEvent;

  return await db
    .withTransactionAsync(async () => {
      await db
        .runAsync(
          `
        UPDATE timeSenseEvents SET
          details = ?,
          icon = ?,
          name = ?
        WHERE id = ?;
        `,
          newTsEvent.details ?? null,
          newTsEvent.icon,
          newTsEvent.name,
          newTsEvent.id,
        )
        .then(async (_) => {
          updatedTsEvent = await getTsEventById(db, newTsEvent.id, true);
        });
    })
    .then(async () => {
      return updatedTsEvent;
    })
    .catch((reason) => {
      throw new Error(`Update operation failed with error: ${reason}`);
    });
}

// DELETE Operations

export async function deleteTsEvents(
  db: SQLiteDatabase,
  idsToDelete: number[],
): Promise<void> {
  return await db.withTransactionAsync(async () => {
    for (const id of idsToDelete) {
      db.runAsync(`DELETE FROM eventTriggers WHERE tsEventId = ${id};`);
      db.runAsync(`DELETE FROM timeSenseEvents WHERE id = ${id};`);
    }
  });
}
