import type { SQLiteDatabase } from 'expo-sqlite';

export const DATABASE_NAME = 'time-sense.db';
const DATABASE_VERSION = 2;

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
    // TODO: DO NOT CHECK THIS IN
    // await db.runAsync(`
    //   DROP INDEX IF EXISTS triggerIndex;
    //   DROP TABLE IF EXISTS eventTriggers;
    //   DROP TABLE IF EXISTS timeSenseEvents;
    // `);

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

  if (currentDbVersion === 1) {
    await seedInitialData(db);
    currentDbVersion = 2;
  }

  await db.execAsync(`PRAGMA user_version = ${currentDbVersion};`);
}

// REMOVE THIS BEFORE MERGING TO MAIN
async function seedInitialData(db: SQLiteDatabase) {
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
    await db
      .execAsync(
        `
      INSERT INTO timeSenseEvents (icon, name) values ('bookmark', 'first event');
      INSERT INTO timeSenseEvents (icon, name) values ('bookmark-outline', 'second event');
      INSERT INTO timeSenseEvents (icon, name) values ('favorite', 'third event');
      INSERT INTO timeSenseEvents (icon, name) values ('work', 'fourth event');
      INSERT INTO timeSenseEvents (icon, name) values ('work-outline', 'fifth event');

      INSERT INTO eventTriggers (tsEventId, triggerTimestamp) values (1, json('{"timestamp":"2025-12-10T00:00:00Z","tags":["meta"]}'));
      INSERT INTO eventTriggers (tsEventId, triggerTimestamp) values (2, json('{"timestamp":"2025-12-10T00:00:00Z","tags":["meta"]}'));
      INSERT INTO eventTriggers (tsEventId, triggerTimestamp) values (3, json('{"timestamp":"2025-12-10T00:00:00Z","tags":["meta"]}'));
      INSERT INTO eventTriggers (tsEventId, triggerTimestamp) values (4, json('{"timestamp":"2025-12-10T00:00:00Z","tags":["meta"]}'));
      INSERT INTO eventTriggers (tsEventId, triggerTimestamp) values (5, json('{"timestamp":"2025-12-10T00:00:00Z","tags":["meta","user"]}'));
      INSERT INTO eventTriggers (tsEventId, triggerTimestamp) values (3, json('{"timestamp":"1997-11-06T00:35:00Z","tags":["user"]}'));
      INSERT INTO eventTriggers (tsEventId, triggerTimestamp) values (4, json('{"timestamp":"2025-12-23T00:00:00Z","tags":["user"]}'));
      INSERT INTO eventTriggers (tsEventId, triggerTimestamp) values (4, json('{"timestamp":"2023-05-23T02:30:00Z","tags":["user"]}'));
    `
      )
      .then(async () => {
        console.log(
          await db.getFirstAsync(
            `SELECT * FROM timeSenseEvents WHERE rowid == 3;`
          )
        );
        console.log(
          await db.getFirstAsync(
            `SELECT * FROM eventTriggers WHERE tsEventId == 5;`
          )
        );
      });
  });

  return;
}
