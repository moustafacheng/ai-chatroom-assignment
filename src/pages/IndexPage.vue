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
    <transition
      enter-active-class="tw-transition-all tw-duration-300 tw-ease-out"
      leave-active-class="tw-transition-all tw-duration-200 tw-ease-in"
      enter-from-class="tw-opacity-0 tw-scale-95 tw-translate-y-4"
      enter-to-class="tw-opacity-100 tw-scale-100 tw-translate-y-0"
      leave-from-class="tw-opacity-100 tw-scale-100 tw-translate-y-0"
      leave-to-class="tw-opacity-0 tw-scale-95 tw-translate-y-4"
    >
      <ChatWindow
        v-if="isChatOpen"
        :is-open="isChatOpen"
        @toggle="toggleChat"
        @close="closeChat"
      />
    </transition>
    <FloatingButton @toggle="toggleChat" />
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import ChatWindow from "../components/chat/ChatWindow.vue";
import FloatingButton from "../components/FloatingButton.vue";

const isChatOpen = ref(false);

const toggleChat = () => {
  isChatOpen.value = !isChatOpen.value;
};

const closeChat = () => {
  isChatOpen.value = false;
};
</script>
