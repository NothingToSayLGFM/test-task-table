import { ref } from "vue";
import type { User, SortDirection } from "~~/types";
import { useRoute } from "vue-router";
import { refDebounced } from "@vueuse/core";

export function useUsersTable() {
  const route = useRoute();

  const searchInput = ref((route.query.search as string) || "");

  const userSearchNameOrEmail = refDebounced(searchInput, 500);

  const userSelectedRole = ref((route.query.role as string) || "all");
  const userPerPage = ref(Number(route.query.perPage) || 10);
  const userPage = ref(Number(route.query.page) || 1);

  const sortBy = ref<keyof User | string>((route.query.sortBy as string) || "");
  const sortDirection = ref<SortDirection>(
    (route.query.sortDirection as "asc" | "desc") || false,
  );

  const sortUsers = (column) => {
    const current = column.getIsSorted();
    if (!current || current === "desc") {
      sortBy.value = column.id;
      sortDirection.value = "asc";
    } else if (current === "asc") {
      sortBy.value = column.id;
      sortDirection.value = "desc";
    }
    column.toggleSorting(column.getIsSorted() === "asc");
  };

  return {
    sortUsers,
    sortBy,
    sortDirection,
    searchInput,
    userSelectedRole,
    userSearchNameOrEmail,
    userPerPage,
    userPage,
  };
}
