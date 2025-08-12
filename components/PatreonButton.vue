<template>
  <a
    :href="href"
    target="_blank"
    rel="noopener noreferrer"
    :class="[
      'inline-flex items-center gap-3 rounded-xl transition-all duration-300 group relative overflow-hidden',
      buttonBaseClass,
      sizeClasses,
    ]"
  >
    <span class="relative z-10 flex items-center gap-3">
      <!-- Patreon icon (minimal) -->
      <svg
        class="w-5 h-5"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <circle cx="14" cy="8" r="5"></circle>
        <rect x="3" y="4" width="4" height="16" rx="2"></rect>
      </svg>
      <span>{{ label }}</span>
    </span>
    <div
      class="absolute inset-0 bg-gradient-to-r from-success/10 to-warning/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
    ></div>
  </a>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  href?: string;
  label?: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "outline";
}

const { 
  href = "https://www.patreon.com/posts/guide-complet-le-134710204?source=storefront",
  label = "Guide complet du Système Fluide",
  size = "md",
  variant = "outline"
} = defineProps<Props>();

const sizeClasses = computed(() => {
  if (size === "sm") return "px-4 py-2 text-sm";
  if (size === "lg") return "px-12 py-5 text-lg";
  return "px-8 py-4 text-base";
});

const buttonBaseClass = computed(() => {
  return variant === "primary"
    ? "btn btn-primary shadow-2xl"
    : "btn btn-outline";
});
</script>
