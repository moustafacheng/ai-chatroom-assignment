<template>
  <div
    class="tw-bg-teal-700 tw-px-5 tw-py-[18px] tw-rounded-t-lg tw-flex tw-items-start tw-justify-between"
  >
    <!-- Left side: Logo and title -->
    <div class="tw-flex tw-items-center tw-gap-3">
      <div class="tw-flex tw-flex-col tw-gap-1">
        <div class="tw-flex tw-items-center tw-gap-4 tw-min-h-[38px]">
          <!-- Nitra AI Logo -->
          <NitraLogo width="46px" />

          <div
            class="tw-text-white tw-font-bold tw-text-[30px] tw-leading-[30px]"
          >
            Nitra AI
          </div>
          <i
            class="fas fa-wand-magic-sparkles tw-text-white tw-text-[24px]"
          ></i>
        </div>
        <p
          class="tw-text-teal-100 tw-text-[16px] tw-min-h[28px] tw-flex tw-items-center tw-justify-start"
        >
          Hi there, How can we help?
        </p>
      </div>
    </div>

    <!-- Right side: Close button -->
    <button
      @click="$emit('close')"
      class="tw-rounded-full tw-flex tw-items-center tw-justify-center"
    >
      <i
        class="fas fa-times tw-text-md tw-text-white tw-w-4 tw-h-4 hover:tw-text-gray-300 tw-transition-colors"
      ></i>
    </button>
  </div>
</template>

<script setup>
import NitraLogo from "./NitraLogo.vue";

defineEmits(["close"]);
</script>
