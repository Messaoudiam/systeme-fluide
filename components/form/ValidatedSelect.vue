<template>
  <div class="space-y-2">
    <label 
      v-if="label" 
      :for="selectId"
      class="block text-sm font-medium text-gray-700 dark:text-gray-300"
    >
      {{ label }}
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </label>
    
    <div class="relative">
      <select
        :id="selectId"
        :value="modelValue"
        :disabled="disabled"
        :class="selectClasses"
        @change="handleChange"
        @blur="handleBlur"
        @focus="handleFocus"
      >
        <option v-if="placeholder" value="" disabled>
          {{ placeholder }}
        </option>
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
      
      <!-- Icône d'erreur -->
      <div 
        v-if="hasError" 
        class="absolute inset-y-0 right-8 flex items-center pointer-events-none"
      >
        <ExclamationCircleIcon class="h-5 w-5 text-red-500" />
      </div>
    </div>
    
    <!-- Message d'erreur -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <p 
        v-if="hasError && errorMessage" 
        class="text-sm text-red-600 dark:text-red-400 font-medium"
      >
        {{ errorMessage }}
      </p>
    </Transition>
    
    <!-- Message d'aide -->
    <p 
      v-if="!hasError && helpText" 
      class="text-sm text-gray-500 dark:text-gray-400"
    >
      {{ helpText }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ExclamationCircleIcon } from '@heroicons/vue/24/outline'

export interface SelectOption {
  value: string | number
  label: string
}

export interface ValidatedSelectProps {
  modelValue: string | number
  options: SelectOption[]
  label?: string
  placeholder?: string
  errorMessage?: string
  helpText?: string
  required?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<ValidatedSelectProps>(), {
  label: undefined,
  placeholder: undefined,
  errorMessage: undefined,
  helpText: undefined,
  required: false,
  disabled: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
}>()

const selectId = computed(() => `select-${Math.random().toString(36).substr(2, 9)}`)

const hasError = computed(() => !!props.errorMessage)

const selectClasses = computed(() => [
  'block w-full px-3 py-2 border rounded-md shadow-sm transition-colors duration-200',
  'focus:outline-none focus:ring-2 focus:ring-offset-2',
  'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',
  'dark:bg-gray-700 dark:text-white dark:border-gray-600',
  {
    'border-red-300 focus:border-red-500 focus:ring-red-500 dark:border-red-500': hasError.value,
    'border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:focus:border-blue-400': !hasError.value
  }
])

function handleChange(event: Event) {
  const target = event.target as HTMLSelectElement
  const value = target.value
  emit('update:modelValue', value)
}

function handleBlur(event: FocusEvent) {
  emit('blur', event)
}

function handleFocus(event: FocusEvent) {
  emit('focus', event)
}</script>