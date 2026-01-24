import { ref, computed, shallowRef } from "vue";
import type { User, SortDirection } from "~/types";
import { useRoute } from "vue-router";
import { watchDebounced } from "@vueuse/core";

export function useUsersTable(users: Ref<User[]>) {
  const route = useRoute();

  const userSearchNameOrEmail = shallowRef(
    (route.query.search as string) || "",
  );
  const searchInput = shallowRef((route.query.search as string) || "");

  const userSelectedRole = ref((route.query.role as string) || "all");
  const userPerPage = ref(Number(route.query.perPage) || 10);
  const userPage = ref(Number(route.query.page) || 1);

  const sortBy = ref<keyof User | string>((route.query.sortBy as string) || "");
  const sortDirection = ref<SortDirection>(
    (route.query.sortDirection as "asc" | "desc") || false,
  );

  const filteredUsers = computed(() => {
    return users.value.filter((user) => {
      let matchesRole = true;
      let matchesSearch = true;
      if (userSelectedRole.value && userSelectedRole.value !== "all") {
        matchesRole = user.role === userSelectedRole.value;
      }
      if (userSearchNameOrEmail.value) {
        const search = userSearchNameOrEmail.value.toLowerCase();
        matchesSearch =
          user.name.toLowerCase().includes(search) ||
          user.email.toLowerCase().includes(search);
      }
      return matchesRole && matchesSearch;
    });
  });

  const paginatedUsers = computed(() => {
    const start = (userPage.value - 1) * userPerPage.value;
    const end = start + userPerPage.value;
    return filteredUsers.value.slice(start, end);
  });

  const totalItems = computed(() => {
    return filteredUsers.value.length;
  });

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

  watchDebounced(
    searchInput,
    () => {
      userSearchNameOrEmail.value = searchInput.value;
    },
    { debounce: 400, maxWait: 500 },
  );

  return {
    sortUsers,
    sortBy,
    sortDirection,
    searchInput,
    userSelectedRole,
    userSearchNameOrEmail,
    userPerPage,
    userPage,
    paginatedUsers,
    totalItems,
  };
}
