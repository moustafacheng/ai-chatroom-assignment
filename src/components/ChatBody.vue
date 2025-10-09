<template>
  <div class="tw-flex-1 tw-p-4 tw-overflow-y-auto tw-bg-white">
    <div class="tw-space-y-[32px]">
      <MessageBubble
        v-for="message in messages"
        :key="message.id"
        :message="message"
        @typewriter-complete="onTypewriterComplete"
      />
    </div>
  </div>
</template>

<script setup>
import MessageBubble from "./MessageBubble.vue";

const props = defineProps({
  messages: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["typewriter-complete"]);

const onTypewriterComplete = (messageId) => {
  emit("typewriter-complete", messageId);
};
</script>
