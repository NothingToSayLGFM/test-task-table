<template>
  <UContainer>
    <UserFilters
      v-model:role="userSelectedRole"
      v-model:search="searchInput"
      v-model:per-page="userPerPage"
      :user-select-options="userSelectOptions"
      :user-per-page-options="userPerPageOptions"
    />
    <TableSkeleton v-if="status === 'pending'" />
    <UserTable
      v-else
      :paginated-users="paginatedUsers"
      :sort-by="sortBy"
      :sort-direction="sortDirection"
      @sort-users="sortUsers"
    />
    <UPagination
      v-model:page="userPage"
      :items-per-page="userPerPage"
      :total="totalItems"
    />
  </UContainer>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import TableSkeleton from "~/components/ui/skeletons/TableSkeleton.vue";
import type { Roles, User, PaginationOptions } from "~/types";

const { status, data: users } = await useFetch<User[]>("/api/users");

const router = useRouter();

const userSelectOptions: [...Roles, "all"] = [
  "admin",
  "manager",
  "user",
  "all",
];

const userPerPageOptions: PaginationOptions = [10, 15, 20];

const {
  sortUsers,
  totalItems,
  paginatedUsers,
  userSearchNameOrEmail,
  userSelectedRole,
  userPage,
  userPerPage,
  sortBy,
  sortDirection,
  searchInput,
} = useUsersTable(users as Ref<User[]>);

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
