<template>
  <div class="relative max-h-[70vh] overflow-auto">
    <table class="min-w-full border-collapse">
      <thead class="sticky top-0 z-10 bg-default/90 backdrop-blur">
        <tr>
          <th v-for="h in headers" :key="h" class="px-4 py-3 text-left">
            <USkeleton class="h-4 w-20" />
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-default">
        <tr v-for="row in rows" :key="row">
          <td class="px-4 py-3">
            <USkeleton class="h-4 w-6" />
          </td>
          <td class="px-4 py-3">
            <USkeleton class="h-4 w-24" />
          </td>
          <td class="px-4 py-3">
            <USkeleton class="h-4 w-48" />
          </td>
          <td class="px-4 py-3">
            <USkeleton class="h-4 w-10" />
          </td>
          <td class="px-4 py-3">
            <USkeleton class="h-4 w-20" />
          </td>
          <td class="px-4 py-3">
            <USkeleton class="h-4 w-40" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const headers = ["Id", "Name", "Email", "Age", "Role", "CreatedAt"];
const rows = 10;
</script>
