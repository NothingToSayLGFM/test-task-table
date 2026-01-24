import { getUsers } from "~~/server/utils/users";

export default defineEventHandler((event) => {
  const users = getUsers(event);
  return users;
});
