<template>
  <div class="tw-pb-[21px] tw-px-4">
    <div class="tw-space-y-1">
      <!-- make div act as button -->
      <div
        role="button"
        tabindex="0"
        v-if="randomStarter"
        @click="handleStarterClick(randomStarter)"
        class="tw-flex tw-items-center tw-cursor-pointer tw-rounded"
      >
        <div class="tw-flex-shrink-0 tw-mr-3">
          <q-icon :name="randomStarter.icon" size="18px" color="teal-400" />
        </div>
        <span
          class="tw-text-sm hover:tw-text-gray-500 tw-text-gray-700 tw-transition-colors tw-duration-150 tw-select-none"
          >{{ randomStarter.text }}</span
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const emit = defineEmits(["starter-clicked"]);

// Define conversation starters based on the provided list
const conversationStarters = ref([
  {
    id: 1,
    icon: "description",
    text: "Upload your supplier list",
    action: null,
  },
  {
    id: 2,
    icon: "shopping_cart",
    text: "Check if Avastin is in stock",
    action: null,
  },
  {
    id: 3,
    icon: "local_offer",
    text: "Check if there's a better price for Xeomin",
    action: null,
  },
  {
    id: 4,
    icon: "search",
    text: "What are some generic options for Restylane",
    action: null,
  },
  {
    id: 5,
    icon: "thumb_up",
    text: "What's the best product for Xeomin",
    action: null,
  },
]);

// Randomly selected starter
const randomStarter = ref(null);

// Function to select a random starter
const selectRandomStarter = () => {
  const randomIndex = Math.floor(
    Math.random() * conversationStarters.value.length
  );
  randomStarter.value = conversationStarters.value[randomIndex];
};

// Select random starter on component mount
onMounted(() => {
  selectRandomStarter();
});

const handleStarterClick = (starter) => {
  emit("starter-clicked", starter);
  // Select a new random starter after clicking
  selectRandomStarter();
};
</script>
