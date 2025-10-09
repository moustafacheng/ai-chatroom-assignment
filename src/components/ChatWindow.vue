<template>
  <div
    class="tw-fixed tw-bottom-[78px] tw-right-[30px] tw-w-[45vw] tw-h-[70vh] tw-bg-white tw-rounded-lg tw-overflow-hidden tw-shadow-2xl tw-flex tw-flex-col tw-z-50"
  >
    <ChatHeader :is-open="isOpen" @toggle="toggleChat" @close="closeChat" />
    <ChatBody
      :messages="messages"
      @typewriter-complete="onTypewriterComplete"
    />
    <ChatInput @send-message="handleSendMessage" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { MESSAGE_MOCK_MAP } from "../mock/messages.js";
import {
  handleAIResponse,
  handleGenericAIResponse,
} from "../utils/aiResponseHandler.js";
import { findBestMatch } from "../utils/fuzzySearch.js";
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

let messageIdCounter = 1;

const messages = ref([
  {
    id: messageIdCounter++,
    sender: "ai",
    content: "Welcome to Nitra AI! How can I help you today?",
    timestamp: new Date(),
  },
]);

const toggleChat = () => {
  emit("toggle");
};

const closeChat = () => {
  emit("close");
};

const handleSendMessage = async (message) => {
  // Add user message
  const userMessage = {
    id: messageIdCounter++,
    sender: "user",
    content: message.content,
    timestamp: message.timestamp,
  };
  messages.value.push(userMessage);

  // Try to find a matching response using fuzzy search
  const match = findBestMatch(message.content, MESSAGE_MOCK_MAP);

  if (match) {
    // Handle matched response
    handleAIResponse({
      content: match.message.content,
      messageIdCounter: messageIdCounter++,
      messages: messages.value,
      isMatch: true,
    });
    messageIdCounter++; // Increment for the AI response
  } else {
    // Handle generic response
    handleGenericAIResponse({
      messageIdCounter: messageIdCounter++,
      messages: messages.value,
    });
    messageIdCounter++; // Increment for the AI response
  }
};

const onTypewriterComplete = (messageId) => {
  // Optional: Handle typewriter completion if needed
  console.log(`Typewriter completed for message ${messageId}`);
};
</script>
