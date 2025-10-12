import { ref } from "vue";

// Global state - persists in memory across component instances
const messages = ref([]);
const messageIdCounter = ref(1);
const isAIResponding = ref(false);

// Initialize with welcome message if no messages exist
if (messages.value.length === 0) {
  messages.value = [
    {
      id: messageIdCounter.value++,
      sender: "ai",
      content: "Welcome to Nitra AI! How can I help you today?",
      timestamp: new Date(),
    },
  ];
}

export function useChatStore() {
  const addMessage = (message) => {
    const newMessage = {
      id: messageIdCounter.value++,
      ...message,
      timestamp: message.timestamp || new Date(),
    };
    messages.value.push(newMessage);
    return newMessage;
  };

  const updateMessage = (messageId, updates) => {
    const index = messages.value.findIndex((msg) => msg.id === messageId);
    if (index !== -1) {
      messages.value[index] = { ...messages.value[index], ...updates };
    }
  };

  const clearChat = () => {
    messages.value = [
      {
        id: messageIdCounter.value++,
        sender: "ai",
        content: "Welcome to Nitra AI! How can I help you today?",
        timestamp: new Date(),
      },
    ];
  };

  const getNextMessageId = () => {
    return messageIdCounter.value++;
  };

  const markTypewriterComplete = (messageId) => {
    const index = messages.value.findIndex((msg) => msg.id === messageId);
    if (index !== -1) {
      // Remove typewriter flags to make it a regular message
      const { useTypewriter, typewriterSpeed, ...messageWithoutTypewriter } =
        messages.value[index];
      messages.value[index] = messageWithoutTypewriter;
    }
  };

  return {
    // State
    messages: messages,
    messageIdCounter: messageIdCounter,
    isAIResponding: isAIResponding,

    // Actions
    addMessage,
    updateMessage,
    clearChat,
    getNextMessageId,
    markTypewriterComplete,
  };
}
