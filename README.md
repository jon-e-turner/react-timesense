# TimeSense

TimeSense is a project I am using to learn React Native and an attempt at building a reminder app I'll actually use.

The end goal is to have both a published application and an npm library that can be included in other React Native applications, which requires proper attention to separation of concerns. For example, as the library must be framework-agnostic, components that will be included **must not** take dependencies on Expo or SQLite.

## Tech Stack

- React v19
- Expo
- SQLite

## Application Design

I'm still looking into how I want to present this graphically, so expect updates to this section.

The application consists of an Expo router and tab navigation with two tabs. The first tab is the main application window containing a [flat list](https://reactnative.dev/docs/flatlist) of [`TimeSenseEvent`s](./types/time-sense-event.ts) rendered into an expandable card. The second tab is a simple 'About' page with links to this repository.

## Library Design

The library exposes the main components required to re-implement the feature in another stack. It is framework-agnostic and expects the consumer to integrate its data models into their application back-end through a custom abstraction. To enforce this purity and provide a working example, I intend to refactor the application to load the library as a dependency.

## Database Design

The data model is fairly simple: each event must have a name and each trigger record must be tied to a single event, though one event can have multiple trigger records. Per the recommendations of SQLite, I also create an index on the child table by its foreign key to enhance join performance.

On first launch, the `expo-sqlite` provider component creates the database using the standard `migrateDbIfNeeded` pattern. Of note in that process:

- The database is configured for [write-ahead logging](https://sqlite.org/wal.html) since the expected use case includes frequent INSERTS to the `eventTriggers` table.
- `PRAGMA foreign_keys = 1` ensures the database is configured to use foreign keys.
- The `triggerTimestamp` field is of type `JSON` to allow for application-level schema changes to not necessarily require a database migration.

```text
+--------------------+      +-----------------------------+
|   timeSenseEvent   |      |        eventTriggers        |
+--------------------+      +-----------------------------+
| id PK INTEGER      |-----<| tsEventId FK INTEGER        |
| details BLOB       |      | triggerTimestamp JSON       |
| icon TEXT          |      +-----------------------------+
| name TEXT NOT NULL |      | IDX triggerIndex(tsEventId) |
+--------------------+      +-----------------------------+
```

## License

This project is licensed under the terms of the MIT license.
