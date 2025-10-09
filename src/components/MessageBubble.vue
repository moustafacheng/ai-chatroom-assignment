<template>
  <div
    class="tw-flex tw-mb-3 tw-items-start tw-gap-[10px]"
    :class="message.sender === 'ai' ? 'tw-justify-start' : 'tw-justify-end'"
  >
    <!-- AI Avatar -->
    <div
      v-if="message.sender === 'ai'"
      class="tw-w-[24px] tw-h-[24px] tw-bg-teal-700 tw-rounded-full tw-flex tw-items-center tw-justify-center"
    >
      <NitraLogo width="16px" />
    </div>

    <!-- Message Bubble -->
    <div
      class="tw-max-w-[80%] tw-px-4 tw-py-[10px] tw-rounded-br-[10px] tw-rounded-bl-[10px]"
      :class="
        message.sender === 'ai'
          ? 'tw-bg-gray-0 tw-text-gray-800 tw-font-[400] tw-text-[16px] tw-rounded-tr-[10px]'
          : 'tw-bg-teal-500 tw-text-white tw-rounded-tl-[10px]'
      "
    >
      <p class="tw-leading-relaxed">{{ message.content }}</p>
    </div>
  </div>
</template>

<script setup>
import NitraLogo from "./NitraLogo.vue";

const props = defineProps({
  message: {
    type: Object,
    required: true,
  },
});
</script>
