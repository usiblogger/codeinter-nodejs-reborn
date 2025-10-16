import { BaseModel } from "./BaseModel";

// ✅ Define user interface (optional, for type system demo)
export interface User {
  id: number;
  name: string;
  email: string;
  created_at?: string;
}

// ✅ Way 1: BaseModel with types (recommended for TypeScript lovers)
export const userBaseTyped = new BaseModel<User>('users');

// ✅ Way 2: BaseModel with any (recommended for PHP developers)
export const userBase = new BaseModel('users');

// Usage examples:
// 
// With types:
// const users: User[] = userBaseTyped.getAll();
// const user: User | undefined = userBaseTyped.getById(1);
//
// Without types (like PHP):
// const users = userBase.getAll();
// const user = userBase.getById(1);
