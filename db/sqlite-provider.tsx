import type { SQLiteDatabase } from 'expo-sqlite';

export const DATABASE_NAME = 'time-sense.db';
const DATABASE_VERSION = 1;

export async function initDatabaseConnection(db: SQLiteDatabase) {
  await migrateDbIfNeeded(db);

  console.log(await db.getFirstAsync(`PRAGMA user_version;`));
}

/**
 *
 * @param db A SQLiteDatabase object, as created by connectSQLiteDb
 * @returns A Promise containing the same `db` object as passed in, to enable chaining.
 */
export async function migrateDbIfNeeded(db: SQLiteDatabase) {
  let { user_version: currentDbVersion } = (await db.getFirstAsync<{
    user_version: number;
  }>(`PRAGMA user_version;`)) ?? { user_version: 0 };

  if (currentDbVersion >= DATABASE_VERSION) {
    return;
  }

  if (currentDbVersion === 0) {
    // New install, so initialize the database.
    await db.execAsync(`
      PRAGMA journal_mode = 'wal';
      PRAGMA foreign_keys = 1;

      CREATE TABLE IF NOT EXISTS timeSenseEvents (
        id INTEGER PRIMARY KEY NOT NULL,
        details BLOB,
        icon TEXT,
        name TEXT NOT NULL
        );
      CREATE TABLE IF NOT EXISTS eventTriggers(
        tsEventId INTEGER,
        triggerTimestamp JSON,
        FOREIGN KEY (tsEventId) REFERENCES timeSenseEvents(id) ON UPDATE CASCADE ON DELETE CASCADE
        );
      CREATE INDEX IF NOT EXISTS triggerIndex ON eventTriggers(tsEventId);
    `);
    currentDbVersion = 1;
  }

  await db.execAsync(`PRAGMA user_version = ${currentDbVersion};`);
}
