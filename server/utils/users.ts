import type { User, Roles } from "~~/types";
import type { H3Event } from "h3";

export const getUsers = defineCachedFunction(
  (_event: H3Event) => {
    const roles: Roles = ["admin", "manager", "user"];
    return Array.from({ length: 50 }, (_, i): User => {
      return {
        id: i + 1,
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        age: 18 + (i % 40),
        role: roles[i % roles.length] || "",
        createdAt: new Date(Date.now() - i * 1000 * 60 * 60 * 24).toISOString(),
      };
    });
  },
  {
    swr: false,
    maxAge: 1000,
  },
);
