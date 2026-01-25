import { getUsers } from "~~/server/utils/users";

export default defineEventHandler(async (event) => {
  const users = await getUsers(event);
  const { page = 1, perPage = 10, role, search } = getQuery(event);

  let filtered = [...users];
  if (role && role !== "all") {
    filtered = filtered.filter((u) => u.role === role);
  }

  if (search) {
    const s = String(search).toLowerCase();
    filtered = filtered.filter(
      (u) =>
        u.name.toLowerCase().includes(s) || u.email.toLowerCase().includes(s),
    );
  }

  const p = Number(page);
  const pp = Number(perPage);
  const start = (p - 1) * pp;

  return {
    users: filtered.slice(start, start + pp),
    total: filtered.length,
    page: p,
    perPage: pp,
  };
});
