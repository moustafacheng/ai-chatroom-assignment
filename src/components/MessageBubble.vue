<template>
  <div
    class="tw-flex tw-items-start tw-gap-[10px]"
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
      class="tw-max-w-[80%] tw-px-4 tw-py-[10px] tw-rounded-br-[10px] tw-rounded-bl-[10px] tw-text-[16px] tw-break-words tw-overflow-wrap-anywhere"
      :class="
        message.sender === 'ai'
          ? 'tw-bg-gray-0 tw-text-gray-800 tw-font-[400] tw-rounded-tr-[10px] tw-min-w-[100px] tw-min-h-[46px]' // added min-width and min-height to prevent layout shift when thinking animation is removed
          : 'tw-bg-teal-100 tw-text-black tw-rounded-tl-[10px]'
      "
    >
      <!-- Thinking Animation -->
      <div v-if="message.isThinking" class="tw-flex tw-items-center tw-gap-2">
        <ThinkingAnimation />
      </div>

      <!-- Typewriter Effect for AI messages -->
      <div v-else-if="message.sender === 'ai' && message.useTypewriter">
        <TypewriterText
          :text="message.content"
          :speed="message.typewriterSpeed || 30"
          @complete="onTypewriterComplete"
          @typing="onTypewriterTyping"
        />
      </div>

      <!-- Regular message content -->
      <div v-else class="tw-leading-relaxed" v-html="message.content"></div>
    </div>
  </div>
</template>

<script setup>
import NitraLogo from "./NitraLogo.vue";
import ThinkingAnimation from "./ThinkingAnimation.vue";
import TypewriterText from "./TypewriterText.vue";

const props = defineProps({
  message: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["typewriter-complete", "typewriter-typing"]);

const onTypewriterComplete = () => {
  emit("typewriter-complete", props.message.id);
};

const onTypewriterTyping = () => {
  emit("typewriter-typing", props.message.id);
};
</script>

<style scoped>
/* Ensure proper word breaking for long URLs and text */
.tw-break-words {
  word-break: break-word;
  overflow-wrap: break-word;
}

.tw-overflow-wrap-anywhere {
  overflow-wrap: anywhere;
}

/* Additional styles for links to ensure they break properly */
:deep(a) {
  word-break: break-all;
  overflow-wrap: anywhere;
  hyphens: auto;
}
</style>
