export interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  role: string;
  createdAt: string;
}

export type SortDirection = "asc" | "desc" | false;
