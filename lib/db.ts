import Database from "better-sqlite3";

const db = new Database("donations.db", {
  verbose: process.env.NODE_ENV === "development" ? console.log : undefined,
});

// Create donations table
db.exec(`
  CREATE TABLE IF NOT EXISTS donations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    amount REAL NOT NULL,
    tip REAL NOT NULL DEFAULT 0,
    comment TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

export default db;
