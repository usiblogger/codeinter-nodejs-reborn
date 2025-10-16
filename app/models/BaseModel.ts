import { db } from "~/config/database";

export class BaseModel<T = any> {
  protected tableName: string;
  
  constructor(tableName: string) {
    this.tableName = tableName;
  }
  
  // Get all records
  getAll(): T[] {
    return db.prepare(`SELECT * FROM ${this.tableName} ORDER BY id DESC`).all() as T[];
  }
  
  // Get single record by ID
  getById(id: any): T | undefined {
    return db.prepare(`SELECT * FROM ${this.tableName} WHERE id = ?`).get(id) as T | undefined;
  }
  
  // Find multiple records by column
  findBy(column: string, value: any): T[] {
    return db.prepare(`SELECT * FROM ${this.tableName} WHERE ${column} = ?`).all(value) as T[];
  }
  
  // Find single record by column
  findOneBy(column: string, value: any): T | undefined {
    return db.prepare(`SELECT * FROM ${this.tableName} WHERE ${column} = ?`).get(value) as T | undefined;
  }
  
  // Delete record
  delete(id: any): boolean {
    const result = db.prepare(`DELETE FROM ${this.tableName} WHERE id = ?`).run(id);
    return result.changes > 0;
  }
  
  // Count records
  count(): number {
    const result: any = db.prepare(`SELECT COUNT(*) as count FROM ${this.tableName}`).get();
    return result.count;
  }
  
  // Check if record exists
  exists(id: any): boolean {
    return !!this.getById(id);
  }
  
  // ✅ Generic create method (dynamically generates SQL based on passed object)
  create(data: any): T | undefined {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const placeholders = keys.map(() => '?').join(', ');
    const columns = keys.join(', ');
    
    const result = db.prepare(
      `INSERT INTO ${this.tableName} (${columns}) VALUES (${placeholders})`
    ).run(...values);
    
    return this.getById(result.lastInsertRowid);
  }
  
  // ✅ Generic update method (dynamically generates SQL based on passed object)
  update(id: any, data: any): T | undefined {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const setClause = keys.map(key => `${key} = ?`).join(', ');
    
    db.prepare(
      `UPDATE ${this.tableName} SET ${setClause} WHERE id = ?`
    ).run(...values, id);
    
    return this.getById(id);
  }
  
  // Custom query
  query(sql: string, params: any[] = []): T[] {
    return db.prepare(sql).all(...params) as T[];
  }
  
  // Custom single record query
  queryOne(sql: string, params: any[] = []): T | undefined {
    return db.prepare(sql).get(...params) as T | undefined;
  }
}
