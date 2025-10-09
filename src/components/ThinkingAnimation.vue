<template>
  <div class="tw-flex tw-items-center tw-gap-2">
    <span class="tw-text-gray-500 tw-text-sm">Thinking</span>
    <div class="tw-flex tw-gap-1">
      <div
        v-for="i in 3"
        :key="i"
        class="tw-w-1 tw-h-1 tw-bg-gray-400 tw-rounded-full tw-animate-pulse"
        :style="{ animationDelay: `${(i - 1) * 0.2}s` }"
      ></div>
    </div>
  </div>
</template>

<script setup>
// This component shows a simple thinking animation with dots
</script>

<style scoped>
@keyframes pulse {
  0%,
  100% {
    opacity: 0.4;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}

.tw-animate-pulse {
  animation: pulse 1.5s ease-in-out infinite;
}
</style>
