<template>
  <div
    v-html="displayedText"
    class="markdown-content tw-leading-[normal] tw-break-words tw-overflow-wrap-anywhere"
  ></div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue";
import { markdownToPlainText, renderMarkdown } from "../../utils/markdown";

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  speed: {
    type: Number,
    default: 30, // milliseconds per character
  },
});

const emit = defineEmits(["complete", "typing"]);

const displayedText = ref("");
const isTyping = ref(false);
let typewriterInterval = null;

const startTypewriter = () => {
  if (typewriterInterval) {
    clearInterval(typewriterInterval);
  }

  displayedText.value = "";
  isTyping.value = true;

  // Convert markdown to HTML first
  const htmlText = renderMarkdown(props.text);

  // Get plain text for character counting
  const plainText = markdownToPlainText(props.text);

  let currentIndex = 0;

  typewriterInterval = setInterval(() => {
    if (currentIndex < plainText.length) {
      // Calculate how much of the original markdown to show
      const progress = (currentIndex + 1) / plainText.length;
      const markdownLength = Math.floor(progress * props.text.length);
      const partialMarkdown = props.text.substring(0, markdownLength);

      // Convert partial markdown to HTML
      displayedText.value = renderMarkdown(partialMarkdown);
      currentIndex++;

      // Emit typing event for scroll management
      emit("typing");
    } else {
      // Typing complete - show full HTML
      displayedText.value = htmlText;
      isTyping.value = false;
      clearInterval(typewriterInterval);
      emit("complete");
    }
  }, props.speed);
};

watch(
  () => props.text,
  () => {
    startTypewriter();
  },
  { immediate: true }
);

onMounted(() => {
  startTypewriter();
});

onUnmounted(() => {
  if (typewriterInterval) {
    clearInterval(typewriterInterval);
  }
});
</script>

<style scoped>
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

.tw-animate-pulse {
  animation: pulse 1s ease-in-out infinite;
}
</style>
