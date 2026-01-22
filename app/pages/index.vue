<template>
  <UContainer>
    <UserFilters
      v-model:role="userSelectedRole as string"
      v-model:search="searchInput"
      v-model:per-page="userPerPage"
      :user-select-options="userSelectOptions"
      :user-per-page-options="userPerPageOptions"
    />
    <ClientOnly>
      <UTable
        :columns="tableColumns"
        :data="paginatedUsers"
        sticky
        :ui="{
          root: 'overflow-visible',
        }"
        :initial-state="{
          sorting: [
            {
              id: sortBy || 'id',
              desc: sortDirection === 'desc',
            },
          ],
        }"
      />
      <template #fallback>
        <TableSkeleton />
      </template>
    </ClientOnly>
    <UPagination
      v-model:page="userPage"
      :items-per-page="userPerPage"
      :total="totalItems"
    />
  </UContainer>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import type { User } from "~/types";
import { users } from "~/data/users";
import TableSkeleton from "~/components/ui/skeletons/TableSkeleton.vue";

const UButton = resolveComponent("UButton");

const tableColumns = [
  {
    accessorKey: "id",
    color: "neutral",
    variant: "ghost",
    label: "ID",
  },
  {
    accessorKey: "name",
    color: "neutral",
    variant: "ghost",
    label: "Name",
  },
  {
    accessorKey: "email",
    color: "neutral",
    variant: "ghost",
    label: "Email",
  },
  {
    accessorKey: "role",
    color: "neutral",
    variant: "ghost",
    label: "Role",
  },
  {
    accessorKey: "age",

    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      return h(UButton, {
        color: "neutral",
        variant: "ghost",
        label: "Age",
        icon: isSorted
          ? isSorted === "asc"
            ? "i-lucide-arrow-up-narrow-wide"
            : "i-lucide-arrow-down-wide-narrow"
          : "i-lucide-arrow-up-down",
        class: "-mx-2.5",
        onClick: () => sortUsers(column),
      });
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      return h(UButton, {
        color: "neutral",
        variant: "ghost",
        label: "Created At",
        icon: isSorted
          ? isSorted === "asc"
            ? "i-lucide-arrow-up-narrow-wide"
            : "i-lucide-arrow-down-wide-narrow"
          : "i-lucide-arrow-up-down",
        class: "-mx-2.5",
        onClick: () => sortUsers(column),
      });
    },
  },
];

const router = useRouter();

const userSelectOptions = ["admin", "manager", "user", "all"];
const userPerPageOptions = [10, 15, 20];

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
} = useUsersTable(users as User[]);

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
  { deep: true },
);
watch([userPerPage, userSelectedRole, userSearchNameOrEmail], () => {
  userPage.value = 1;
});
</script>
