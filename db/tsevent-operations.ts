import type { HistoryTag } from '@/types/history-tag';
import { type ITimeSenseEvent, TimeSenseEvent } from '@/types/time-sense-event';
import { UTCDate } from '@date-fns/utc';
import type { SQLiteDatabase } from 'expo-sqlite';

// CREATE Operations
export async function addTsEvent(
  db: SQLiteDatabase,
  tsEvent: Partial<ITimeSenseEvent> & Pick<ITimeSenseEvent, 'name'>
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
export async function getAllTsEvents( // TODO: Paginate this
  db: SQLiteDatabase,
  userOnly: boolean = false
): Promise<ITimeSenseEvent[]> {
  return (
    await db.getAllAsync<TimeSenseEvent>(`
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
  `)
  ).map((res) => {
    // TODO: Figure out how to not need this step. It makes the db read synchronous.
    res.triggerHistory = JSON.parse(res.triggerHistory as any as string);
    return new TimeSenseEvent(res);
  });

  // return db_json.map((js) => new TimeSenseEvent(js));
}

export async function getTsEventById(
  db: SQLiteDatabase,
  id: number
): Promise<ITimeSenseEvent | null> {
  const res = await db.getFirstAsync<TimeSenseEvent>(`
    SELECT ts.id, ts.details, ts.icon, ts.name,
      json_group_array(json(et.triggerTimestamp)) as triggerHistory
    FROM timeSenseEvents AS ts
    LEFT JOIN eventTriggers AS et
    ON ts.id == et.tsEventId
    WHERE ts.id == ${id}
    GROUP BY ts.id;
  `);

  if (res === null) {
    return null;
  }

  res.triggerHistory = JSON.parse(res.triggerHistory as any as string);
  return new TimeSenseEvent(res);
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
