<template>
  <div class="tw-flex tw-items-center tw-justify-center">
    <img
      src="../assets/nitra-logo.png"
      alt="Nitra AI Logo"
      class="tw-object-contain tw-filter tw-invert tw-brightness-0"
      :style="{ width: width, height: width }"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  width: {
    type: String,
    default: "32px",
  },
});
</script>
