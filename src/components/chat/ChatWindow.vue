<template>
  <div
    class="tw-fixed tw-bottom-[78px] tw-right-[30px] tw-w-[45vw] tw-h-[70vh] tw-bg-white tw-rounded-lg tw-overflow-hidden tw-shadow-2xl tw-flex tw-flex-col tw-z-50"
  >
    <ChatHeader :is-open="isOpen" @toggle="toggleChat" @close="closeChat" />
    <ChatBody
      :messages="messages"
      @typewriter-complete="onTypewriterComplete"
    />

    <ConversationStarter @starter-clicked="handleStarterClick" />
    <ChatInput @send-message="handleSendMessage" :is-loading="isAIResponding" />
  </div>
</template>

<script setup>
import { useChatStore } from "../../composables/useChatStore.js";
import { MESSAGE_MOCK_MAP } from "../../mock/messages.js";
import {
  handleAIResponse,
  handleGenericAIResponse,
} from "../../utils/aiResponseHandler.js";
import { findBestMatch } from "../../utils/fuzzySearch.js";
import ChatBody from "./ChatBody.vue";
import ChatHeader from "./ChatHeader.vue";
import ChatInput from "./ChatInput.vue";
import ConversationStarter from "./ConversationStarter.vue";

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["toggle", "close"]);

// Use the global chat store
const {
  messages,
  isAIResponding,
  addMessage,
  getNextMessageId,
  markTypewriterComplete,
} = useChatStore();

const toggleChat = () => {
  emit("toggle");
};

const closeChat = () => {
  emit("close");
};

const handleSendMessage = async (message) => {
  // Add user message using the store
  addMessage({
    sender: "user",
    content: message.content,
    timestamp: message.timestamp,
  });

  // Set loading state to true when AI starts responding
  isAIResponding.value = true;

  // Wait 1 second before showing thinking animation
  setTimeout(() => {
    // Try to find a matching response using fuzzy search
    const match = findBestMatch(message.content, MESSAGE_MOCK_MAP);

    if (match) {
      // Handle matched response
      handleAIResponse({
        content: match.message.content,
        messageIdCounter: getNextMessageId(),
        messages: messages.value,
        isMatch: true,
      });
    } else {
      // Handle generic response
      handleGenericAIResponse({
        messageIdCounter: getNextMessageId(),
        messages: messages.value,
      });
    }
  }, 1000); // 1 second delay
};

const onTypewriterComplete = (messageId) => {
  // Mark the message as completed (remove typewriter flags)
  markTypewriterComplete(messageId);

  // Set loading state to false when typewriter completes
  isAIResponding.value = false;
  console.log(`Typewriter completed for message ${messageId}`);
};

const handleStarterClick = (starter) => {
  console.log("Conversation starter clicked:", starter);
};
</script>
