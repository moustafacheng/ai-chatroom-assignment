<template>
  <div
    class="tw-flex tw-items-start tw-gap-[10px]"
    :class="message.sender === 'ai' ? 'tw-justify-start' : 'tw-justify-end'"
  >
    <!-- AI Avatar -->
    <div
      v-if="message.sender === 'ai'"
      v-once
      class="tw-w-[24px] tw-h-[24px] tw-bg-teal-700 tw-rounded-full tw-flex tw-items-center tw-justify-center"
    >
      <NitraLogo width="16px" />
    </div>

    <!-- Message Bubble -->
    <div
      class="tw-max-w-[80%] tw-px-4 tw-py-[10px] tw-rounded-br-[10px] tw-rounded-bl-[10px] tw-text-[16px] tw-break-words tw-overflow-wrap-anywhere"
      :class="
        message.sender === 'ai'
          ? 'tw-bg-gray-0 tw-text-gray-800 tw-font-[400] tw-rounded-tr-[10px] tw-min-w-[100px] tw-min-h-[39px]' // added min-width and min-height to prevent layout shift when thinking animation is removed
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
      <div 
        v-else 
        class="tw-leading-[normal] tw-break-words tw-overflow-wrap-anywhere"
        :class="message.sender === 'ai' ? 'markdown-content' : ''"
        v-html="message.sender === 'ai' ? renderMarkdown(message.content) : message.content"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { marked } from "marked";
import NitraLogo from "../NitraLogo.vue";
import ThinkingAnimation from "./ThinkingAnimation.vue";
import TypewriterText from "./TypewriterText.vue";

const props = defineProps({
  message: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["typewriter-complete", "typewriter-typing"]);

// Configure marked with the same settings as TypewriterText.vue
const renderer = new marked.Renderer();

// Override only the link renderer to add custom styling
renderer.link = function (token) {
  const safeHref = String(token.href || "");
  const safeText = String(token.text || "");
  const titleAttr = token.title ? ` title="${token.title}"` : "";

  return `<a href="${safeHref}"${titleAttr} class="tw-break-all tw-text-orange-400 hover:tw-text-orange-800 tw-transition-colors tw-duration-200 tw-underline tw-font-medium" target="_blank" rel="noopener noreferrer">${safeText}</a>`;
};

marked.use({
  breaks: true,
  gfm: true,
  renderer: renderer,
});

// Function to render markdown content
const renderMarkdown = (content) => {
  if (!content) return "";
  return marked.parse(content, { async: false });
};

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

/* Markdown content styles - same as TypewriterText.vue */
.markdown-content :deep(ol > li) {
  margin-top: 16px;
  margin-bottom: 16px;
}

/* Base list styles */
.markdown-content :deep(ul) {
  list-style: none;
  margin-left: 1.25rem;
}

/* Dash bullets for unordered lists */
.markdown-content :deep(ul li)::marker {
  content: "- ";
}

/* Keep numbers for ordered lists */
.markdown-content :deep(ol) {
  list-style-type: decimal;
  margin-left: 1.25rem;
}

/* Remove nested UL defaults that would override our dash marker */
.markdown-content :deep(ul ul),
.markdown-content :deep(ul ul ul) {
  list-style: none;
}

/* Nested list styles */
.markdown-content :deep(ol ol) {
  list-style-type: lower-alpha;
}

.markdown-content :deep(ol ol ol) {
  list-style-type: lower-roman;
}

.markdown-content :deep(ul ul) {
  list-style-type: circle;
}

.markdown-content :deep(ul ul ul) {
  list-style-type: square;
}
</style>
