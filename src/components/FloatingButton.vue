<template>
  <button
    @click="$emit('toggle')"
    class="tw-fixed tw-bottom-[30px] tw-right-[30px] tw-bg-orange-400 hover:tw-bg-orange-500 tw-text-white tw-px-4 tw-py-2 tw-rounded-full tw-shadow-lg tw-flex tw-items-center tw-gap-2 tw-transition-all tw-duration-200 hover:tw-shadow-xl tw-z-40"
  >
    <i class="fas fa-wand-magic-sparkles tw-text-white tw-text-[16px]"></i>
    <span class="tw-font-medium tw-text-sm">Ask Nitra AI</span>
  </button>
</template>

<script setup>
defineEmits(["toggle"]);
</script>
