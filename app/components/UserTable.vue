<template>
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
</template>

<script setup lang="ts">
import type { User } from "~/types";
const UButton = resolveComponent("UButton");

defineProps<{
  paginatedUsers: User[];
  sortBy: string;
  sortDirection: string | boolean;
}>();

const emit = defineEmits<{
  (e: "sortUsers", column: any): void;
}>();

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
        onClick: () => emit("sortUsers", column),
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
        onClick: () => emit("sortUsers", column),
      });
    },
  },
];
</script>
