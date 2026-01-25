<template>
  <UContainer>
    <UserFilters
      v-model:role="userSelectedRole"
      v-model:search="searchInput"
      v-model:per-page="userPerPage"
      :disabled="pending"
      :user-select-options="userSelectOptions"
      :user-per-page-options="userPerPageOptions"
    />
    <UserTable
      :loading="pending"
      :paginated-users="data?.users || []"
      :sort-by="sortBy"
      :sort-direction="sortDirection"
      @sort-users="sortUsers"
    />
    <UPagination
      v-model:page="userPage"
      :disabled="pending"
      :items-per-page="userPerPage"
      :total="data?.total || 0"
    />
  </UContainer>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import type { Roles, PaginationOptions, UsersResponse } from "~~/types";

const {
  sortUsers,
  userSearchNameOrEmail,
  userSelectedRole,
  userPage,
  userPerPage,
  sortBy,
  sortDirection,
  searchInput,
} = useUsersTable();

const { pending, data } = useFetch<UsersResponse>("/api/users", {
  query: computed(() => ({
    page: userPage.value,
    perPage: userPerPage.value,
    role: userSelectedRole.value,
    search: userSearchNameOrEmail.value || undefined,
  })),
  watch: [userPage, userPerPage, userSelectedRole, userSearchNameOrEmail],
});

const router = useRouter();

const userSelectOptions: [...Roles, "all"] = [
  "admin",
  "manager",
  "user",
  "all",
];

const userPerPageOptions: PaginationOptions = [10, 15, 20];

watch(
  [
    userPage,
    userPerPage,
    userSelectedRole,
    userSearchNameOrEmail,
    sortBy,
    sortDirection,
  ],
  () => {
    router.replace({
      query: {
        page: userPage.value,
        perPage: userPerPage.value,
        role: userSelectedRole.value || undefined,
        search: userSearchNameOrEmail.value || undefined,
        sortBy: sortBy.value || undefined,
        sortDirection: sortDirection.value || undefined,
      },
    });
  },
);
watch([userPerPage, userSelectedRole, userSearchNameOrEmail], () => {
  userPage.value = 1;
});
</script>
