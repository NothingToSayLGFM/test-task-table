<template>
  <ClientOnly v-if="!colorMode?.forced">
    <div class="flex items-center justify-center pt-4">
      <UButton
        color="neutral"
        variant="ghost"
        :aria-label="`Switch to ${isDark ? 'light' : 'dark'} mode`"
        @click="isDark = !isDark"
      >
        <UIcon v-show="!isDark" name="i-lucide-moon" size="24" />
        <UIcon v-show="isDark" name="i-lucide-sun" size="24" />
      </UButton>
    </div>
    <template #fallback>
      <div class="size-8" />
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
const colorMode = useColorMode();

const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set(_isDark) {
    colorMode.preference = _isDark ? "dark" : "light";
  },
});
</script>
