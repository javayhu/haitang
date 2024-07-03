import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from '@/database/schema_sqlite';

// This file creates a new SQLite database instance and passes it to Drizzle. 
// We're also passing our schema to Drizzle, so it can create the necessary tables. 
// Finally, we're running the migration to ensure that our database is up-to-date.
const sqlite = new Database('./src/database/poetry.db');

export const localdb = drizzle(sqlite, { schema });
