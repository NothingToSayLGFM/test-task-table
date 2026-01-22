<template>
  <div class="rounded-lg border border-default p-4 w-full flex gap-4 mb-4">
    <USelect v-model="role" :items="userSelectOptions" class="w-full" />
    <USelect v-model="perPage" :items="userPerPageOptions" class="w-full" />
    <UInput
      v-model="search"
      placeholder="Search by name or email"
      class="w-full"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{ userSelectOptions: string[]; userPerPageOptions: number[] }>();

const role = defineModel<string>("role");
const perPage = defineModel<number>("perPage");
const search = defineModel<string>("search");
</script>
