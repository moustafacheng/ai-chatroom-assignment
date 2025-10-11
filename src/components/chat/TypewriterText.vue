<template>
  <div
    v-html="displayedText"
    class="tw-leading-[normal] tw-break-words tw-overflow-wrap-anywhere"
  ></div>
</template>

<script setup lang="ts">
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

const emit = defineEmits(["complete", "typing"]);

const displayedText = ref("");
const isTyping = ref(false);
let typewriterInterval = null;

// Configure marked with selective renderer overrides using marked.use()
const renderer = new marked.Renderer();

// Override only the link renderer to add custom styling
renderer.link = function (token) {
  const safeHref = String(token.href || "");
  const safeText = String(token.text || "");
  const titleAttr = token.title ? ` title="${token.title}"` : "";

  return `<a href="${safeHref}"${titleAttr} class="tw-break-all tw-text-orange-400 hover:tw-text-orange-800 tw-transition-colors tw-duration-200 tw-underline tw-font-medium" target="_blank" rel="noopener noreferrer">${safeText}</a>`;
};

// Do not override list/listitem; rely on CSS for styling and keep default semantics

marked.use({
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
  const htmlText = marked.parse(props.text, { async: false });

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
      displayedText.value = marked.parse(partialMarkdown, { async: false });
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

:deep(ol > li) {
  margin-top: 16px;
  margin-bottom: 16px;
}

/* Base list styles */
:deep(ul) {
  list-style: none;
  margin-left: 1.25rem;
}

/* Dash bullets for unordered lists */
:deep(ul li)::marker {
  content: "- ";
}

/* Keep numbers for ordered lists */
:deep(ol) {
  list-style-type: decimal;
  margin-left: 1.25rem;
}

/* Remove nested UL defaults that would override our dash marker */
:deep(ul ul),
:deep(ul ul ul) {
  list-style: none;
}

/* Nested list styles */
:deep(ol ol) {
  list-style-type: lower-alpha;
}

:deep(ol ol ol) {
  list-style-type: lower-roman;
}

:deep(ul ul) {
  list-style-type: circle;
}

:deep(ul ul ul) {
  list-style-type: square;
}
</style>
