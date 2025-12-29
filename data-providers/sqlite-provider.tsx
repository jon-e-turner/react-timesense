import type { SQLiteDatabase } from 'expo-sqlite';

const DATABASE_VERSION = 2;

export async function initDatabaseConnection(db: SQLiteDatabase) {
  await migrateDbIfNeeded(db);

  console.log(await db.getAllAsync(`SELECT * FROM timeSenseEvents`));
}

/**
 *
 * @param db A SQLiteDatabase object, as created by connectSQLiteDb
 * @returns A Promise containing the same `db` object as passed in, to enable chaining.
 */
export async function migrateDbIfNeeded(db: SQLiteDatabase) {
  let { user_version: currentDbVersion } = (await db.getFirstAsync<{
    user_version: number;
  }>('PRAGMA user_version;')) ?? { user_version: 0 };
  if (currentDbVersion >= DATABASE_VERSION) {
    console.log(await db.getFirstAsync(`PRAGMA user_version`));
    // await db.execAsync(`DROP INDEX IF EXISTS triggerIndex;`);
    // await db.execAsync(`DROP TABLE IF EXISTS eventTriggers;`);
    // await db.execAsync(`DROP TABLE IF EXISTS timeSenseEvents;`);
    return;
  }
  if (currentDbVersion === 0) {
    console.log(await db.getFirstAsync(`PRAGMA user_version`));
    // New install, so initialize the database.
    await db.execAsync(`
PRAGMA journal_mode = 'wal';
PRAGMA foreign_keys = 1;

CREATE TABLE IF NOT EXISTS timeSenseEvents (
  id INTEGER PRIMARY KEY NOT NULL,
  createdOn TEXT NOT NULL,
  details BLOB,
  icon TEXT,
  name TEXT NOT NULL
  );
CREATE TABLE IF NOT EXISTS eventTriggers(
  tsEventId INTEGER,
  triggerTimestamp TEXT,
  FOREIGN KEY (tsEventId) REFERENCES timeSenseEvents(id) ON UPDATE CASCADE ON DELETE CASCADE
  );
CREATE INDEX IF NOT EXISTS triggerIndex ON eventTriggers(tsEventId);
          `);
    currentDbVersion = 1;
  }
  if (currentDbVersion === 1) {
    console.log(await db.getFirstAsync(`PRAGMA user_version`));
    await seedInitialData(db);
    currentDbVersion = 2;
  }

  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION};`);
}

export async function seedInitialData(db: SQLiteDatabase) {
  console.log(db.databasePath);
  if ((await db.getFirstAsync(`SELECT * FROM timeSenseEvents;`)) !== null) {
    await db.execAsync(`
BEGIN;
DELETE FROM eventTriggers;
DELETE FROM timeSenseEvents;
COMMIT;
      `);
  }

  await db.withTransactionAsync(async () => {
    await db.execAsync(`
INSERT INTO timeSenseEvents (createdOn, icon, name) values ('2025-12-10T00:00:00Z', 'bookmark', 'first event');
INSERT INTO timeSenseEvents (createdOn, icon, name) values ('2025-12-10T00:00:00Z', 'bookmark-outline', 'second event');
INSERT INTO timeSenseEvents (createdOn, icon, name) values ('2025-12-10T00:00:00Z', 'heart', 'third event');
INSERT INTO timeSenseEvents (createdOn, icon, name) values ('2025-12-10T00:00:00Z', 'work', 'fourth event');
INSERT INTO timeSenseEvents (createdOn, icon, name) values ('2025-12-10T00:00:00Z', 'work-outline', 'fifth event');

INSERT INTO eventTriggers (tsEventId, triggerTimestamp) values (3, '1997-11-06T00:35:00Z');
INSERT INTO eventTriggers (tsEventId, triggerTimestamp) values (4, '2025-12-23T00:00:00Z');
INSERT INTO eventTriggers (tsEventId, triggerTimestamp) values (4, '2023-05-23T02:30:00Z');
        `);
  });

  console.log(await db.getFirstAsync(`SELECT * FROM timeSenseEvents;`));
  return;
}
