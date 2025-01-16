const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

const db = open({
    filename: "./database.sqlite",
    driver: sqlite3.Database,
});

(async () => {
    const database = await db;
    await database.exec(`
        CREATE TABLE IF NOT EXIST users(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT FULL UNIQUE,
            password TEXT NOT FULL
        );  
    `);
})();

module.exports = { db };