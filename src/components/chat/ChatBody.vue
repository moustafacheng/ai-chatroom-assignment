<template>
  <div
    ref="chatContainer"
    class="tw-flex-1 tw-p-4 tw-overflow-y-auto tw-bg-white"
    @scroll="handleScroll"
  >
    <transition-group
      name="message"
      tag="div"
      class="tw-space-y-[32px]"
      enter-active-class="tw-transition-all tw-duration-150 tw-ease-in-out"
      leave-active-class="tw-transition-all tw-duration-150 tw-ease-in-out"
      enter-from-class="tw-opacity-0 tw-translate-y-4"
      enter-to-class="tw-opacity-100 tw-translate-y-0"
      leave-from-class="tw-opacity-100 tw-translate-y-0"
      leave-to-class="tw-opacity-0 tw-translate-y-4"
    >
      <MessageBubble
        v-for="message in messages"
        :key="message.id"
        :message="message"
        @typewriter-complete="onTypewriterComplete"
        @typewriter-typing="onTypewriterTyping"
      />
    </transition-group>
  </div>
</template>

<script setup>
import { nextTick, onMounted, ref, watch } from "vue";
import MessageBubble from "./MessageBubble.vue";

const props = defineProps({
  messages: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["typewriter-complete"]);

const chatContainer = ref(null);
const isAutoScrollEnabled = ref(true);
const isUserScrolling = ref(false);
let scrollTimeout = null;

// Check if user is at the bottom of the chat
const isAtBottom = () => {
  if (!chatContainer.value) return false;

  const { scrollTop, scrollHeight, clientHeight } = chatContainer.value;
  const threshold = 50; // Allow 50px threshold for "at bottom"

  return scrollHeight - scrollTop - clientHeight < threshold;
};

// Scroll to bottom smoothly
const scrollToBottom = () => {
  if (!chatContainer.value) return;

  chatContainer.value.scrollTo({
    top: chatContainer.value.scrollHeight,
    behavior: "smooth",
  });
};

// Handle user scroll events
const handleScroll = () => {
  // Clear existing timeout
  if (scrollTimeout) {
    clearTimeout(scrollTimeout);
  }

  // Set user scrolling flag
  isUserScrolling.value = true;

  // Check if user is at bottom
  if (isAtBottom()) {
    // User scrolled back to bottom, re-enable auto-scroll
    isAutoScrollEnabled.value = true;
  } else {
    // User scrolled up, disable auto-scroll
    isAutoScrollEnabled.value = false;
  }

  // Reset user scrolling flag after a delay
  scrollTimeout = setTimeout(() => {
    isUserScrolling.value = false;
  }, 150);
};

// Auto-scroll when new messages are added (if auto-scroll is enabled)
const handleNewMessage = async () => {
  if (isAutoScrollEnabled.value && !isUserScrolling.value) {
    await nextTick();
    scrollToBottom();
  }
};

// Watch for new messages
watch(
  () => props.messages.length,
  () => {
    handleNewMessage();
  }
);

// Watch for message content changes (for typewriter effect)
watch(
  () => props.messages,
  () => {
    if (isAutoScrollEnabled.value && !isUserScrolling.value) {
      nextTick(() => {
        scrollToBottom();
      });
    }
  },
  { deep: true }
);

const onTypewriterComplete = (messageId) => {
  emit("typewriter-complete", messageId);

  // Ensure we're at bottom when typewriter completes
  if (isAutoScrollEnabled.value) {
    nextTick(() => {
      scrollToBottom();
    });
  }
};

const onTypewriterTyping = (messageId) => {
  // Auto-scroll during typing if enabled
  if (isAutoScrollEnabled.value && !isUserScrolling.value) {
    nextTick(() => {
      scrollToBottom();
    });
  }
};

// Initial scroll to bottom
onMounted(() => {
  nextTick(() => {
    scrollToBottom();
  });
});
</script>
