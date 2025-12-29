PRAGMA journal_mode = 'wal';
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS timeSenseEvents (
  id INTEGER PRIMARY KEY NOT NULL,
  createdOn TEXT NOT NULL,
  details BLOB,
  icon TEXT,
  name TEXT NOT NULL,
);
CREATE TABLE IF NOT EXISTS eventTriggers(
  tsEventId INTEGER,
  triggerTimestamp TEXT,
  FOREIGN KEY (tsEventId) REFERENCES timeSenseEvents(id)
    DEFERRABLE INITIALLY DEFERRED
    ON UPDATE CASCADE
    ON DELETE CASCADE,
);
CREATE INDEX triggerIndex ON eventTriggers(tsEventId);

PRAGMA user_version = 1;

INSERT INTO timeSenseEvents (value, intValue) VALUES ('hello', 1);
INSERT INTO timeSenseEvents (value, intValue) VALUES ('world', 2);
