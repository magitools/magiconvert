import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export interface Blurs {
  b_64: string;
  created_at: string;
  id: number;
  updated_at: string;
  user_id: number;
  value: string;
}

export interface Images {
  converted_path: string | null;
  created_at: string;
  id: number;
  original_path: string | null;
  updated_at: string;
  user_id: number;
}

export interface Transactions {
  amount: Generated<number>;
  created_at: string;
  id: number;
  quantity: Generated<number>;
  updated_at: string;
  user_id: number;
}

export interface Users {
  created_at: string;
  credits: Generated<number | null>;
  email: string;
  github_id: string | null;
  google_id: string | null;
  id: number;
  updated_at: string;
  username: string;
}

export interface DB {
  blurs: Blurs;
  images: Images;
  transactions: Transactions;
  users: Users;
}
