<template>
  <div
    v-html="displayedText"
    class="tw-leading-relaxed tw-break-words tw-overflow-wrap-anywhere"
  ></div>
</template>

<script setup>
import { marked } from "marked";
import { onMounted, onUnmounted, ref, watch } from "vue";

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

const emit = defineEmits(["complete"]);

const displayedText = ref("");
const isTyping = ref(false);
let typewriterInterval = null;

// Configure marked for safe HTML rendering with custom renderer for URLs
const renderer = new marked.Renderer();

// Custom link renderer to add word-break classes
renderer.link = function (data) {
  const safeHref = String(data.href || "");
  const safeText = String(data.text || "");
  const titleAttr = data.title ? ` title="${data.title}"` : "";

  return `<a href="${safeHref}"${titleAttr} class="tw-break-all tw-text-orange-400 hover:tw-text-orange-800 tw-transition-colors tw-duration-200 tw-underline tw-font-medium" target="_blank" rel="noopener noreferrer">${safeText}</a>`;
};

marked.setOptions({
  breaks: true,
  gfm: true,
  renderer: renderer,
});

const startTypewriter = () => {
  if (typewriterInterval) {
    clearInterval(typewriterInterval);
  }

  displayedText.value = "";
  isTyping.value = true;

  // Convert markdown to HTML first
  const htmlText = marked(props.text);

  // Get plain text for character counting
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlText;
  const plainText = tempDiv.textContent || tempDiv.innerText || "";

  let currentIndex = 0;

  typewriterInterval = setInterval(() => {
    if (currentIndex < plainText.length) {
      // Calculate how much of the original markdown to show
      const progress = (currentIndex + 1) / plainText.length;
      const markdownLength = Math.floor(progress * props.text.length);
      const partialMarkdown = props.text.substring(0, markdownLength);

      // Convert partial markdown to HTML
      displayedText.value = marked(partialMarkdown);
      currentIndex++;
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
