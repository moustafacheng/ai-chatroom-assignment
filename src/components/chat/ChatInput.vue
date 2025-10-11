<template>
  <div class="tw-bg-white tw-border-gray-100 tw-border-t-[1px]">
    <!-- Input area -->
    <div class="tw-flex tw-items-center tw-gap-2">
      <input
        v-model="messageText"
        @keyup.enter="sendMessage"
        type="text"
        placeholder="Say something..."
        class="tw-flex-1 tw-px-[20px] tw-py-[22px] tw-pr-0 tw-text-sm focus:tw-outline-none tw-text-gray-500"
      />

      <div class="tw-flex tw-items-center tw-gap-[20px] tw-pr-[20px]">
        <!-- File attachment button -->
        <button
          @click="handleFileUpload"
          class="tw-text-gray-500 hover:tw-text-teal-500 tw-transition-colors"
        >
          <i class="fas fa-paperclip tw-text-sm"></i>
        </button>

        <!-- Send button -->
        <button
          @click="sendMessage"
          :disabled="!messageText.trim() || isLoading"
          class="tw-w-8 tw-h-8 tw-bg-teal-500 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-text-white hover:tw-bg-teal-600 disabled:tw-bg-gray-300 disabled:tw-cursor-not-allowed tw-transition-colors"
        >
          <i v-if="!isLoading" class="fas fa-chevron-right tw-text-xs"></i>
          <q-spinner v-else size="16px" color="white" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  isLoading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["send-message"]);

const messageText = ref("");

const sendMessage = () => {
  if (messageText.value.trim()) {
    emit("send-message", {
      content: messageText.value.trim(),
      timestamp: new Date(),
    });
    messageText.value = "";
  }
};

const handleFileUpload = () => {
  console.log("File upload clicked");
};
</script>
