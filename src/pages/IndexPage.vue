<template>
  <q-page class="tw-bg-gray-50 tw-min-h-screen tw-relative">
    <!-- Main content area -->
    <div
      class="tw-flex tw-items-center tw-justify-center tw-min-h-screen tw-p-8"
    >
      <div class="tw-text-center">
        <h1 class="tw-text-4xl tw-font-bold tw-text-gray-800 tw-mb-4">
          Welcome to Nitra AI
        </h1>
        <p class="tw-text-lg tw-text-gray-600 tw-mb-8">
          Your intelligent assistant is ready to help
        </p>
        <div
          class="tw-bg-white tw-p-6 tw-rounded-lg tw-shadow-md tw-inline-block"
        >
          <p class="tw-text-gray-500">
            Click the "Ask Nitra AI" button to start chatting
          </p>
        </div>
      </div>
    </div>

    <!-- Chat Components -->
    <ChatWindow :is-open="isChatOpen" @toggle="toggleChat" @close="closeChat" />
    <FloatingButton @toggle="toggleChat" />
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import ChatWindow from "../components/ChatWindow.vue";
import FloatingButton from "../components/FloatingButton.vue";

const isChatOpen = ref(false);

const toggleChat = () => {
  isChatOpen.value = !isChatOpen.value;
};

const closeChat = () => {
  isChatOpen.value = false;
};
</script>
