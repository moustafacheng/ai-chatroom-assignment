<template>
  <div
    v-if="isOpen"
    class="tw-fixed tw-bottom-[78px] tw-right-[30px] tw-w-[45vw] tw-h-[70vh] tw-bg-white tw-rounded-lg tw-overflow-hidden tw-shadow-2xl tw-flex tw-flex-col tw-z-50"
  >
    <ChatHeader :is-open="isOpen" @toggle="toggleChat" @close="closeChat" />
    <ChatBody :messages="messages" />
    <ChatInput @send-message="handleSendMessage" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import ChatBody from "./ChatBody.vue";
import ChatHeader from "./ChatHeader.vue";
import ChatInput from "./ChatInput.vue";

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["toggle", "close"]);

const messages = ref([
  {
    id: 1,
    sender: "ai",
    content: "Welcome to Nitra AI!",
    timestamp: new Date(),
  },
]);

const toggleChat = () => {
  emit("toggle");
};

const closeChat = () => {
  emit("close");
};

const handleSendMessage = (message) => {
  // TODO: Implement message sending logic
  console.log("Sending message:", message);
};
</script>
