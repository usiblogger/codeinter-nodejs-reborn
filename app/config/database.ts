import Database from "better-sqlite3";
import path from "path";

// Initialize database connection
const db = new Database(path.join(process.cwd(), "app.db"));

// Create users table
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Seed initial data for users
const userCount = db.prepare("SELECT COUNT(*) as count FROM users").get() as { count: number };
if (userCount.count === 0) {
  const insert = db.prepare("INSERT INTO users (name, email) VALUES (?, ?)");
  insert.run("John Doe", "john@example.com");
  insert.run("Jane Smith", "jane@example.com");
  insert.run("Alice Johnson", "alice@example.com");
}

export { db };

