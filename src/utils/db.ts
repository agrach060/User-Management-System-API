import sqlite3 from "sqlite3";
import { open } from "sqlite";

export const db = open({
    filename: "./database.sqlite",
    driver: sqlite3.Database,
});

(async () => {
    const database = await db;
    await database.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `);
})();