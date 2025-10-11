<template>
  <div class="thinking-container">
    <span class="thinking-text tw-leading-[normal] tw-text-[16px]"
      >Thinking...</span
    >
  </div>
</template>

<script setup>
// This component shows a simple thinking animation with dots
</script>

<style scoped>
.thinking-container {
  display: flex;
  align-items: center;
}

.thinking-text {
  color: #6b7280;
  background: linear-gradient(
    90deg,
    #6b7280 0%,
    #6b7280 40%,
    #ffffff 50%,
    #6b7280 60%,
    #6b7280 100%
  );
  background-size: 200% 200%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: wave 2.5s ease-in-out infinite;
}

@keyframes wave {
  0% {
    background-position: 100% 0;
  }
  100% {
    background-position: -100% 0;
  }
}
</style>
