<template>
  <div class="space-y-2">
    <label 
      v-if="label" 
      :for="inputId"
      class="block text-sm font-medium text-gray-700 dark:text-gray-300"
    >
      {{ label }}
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </label>
    
    <div class="relative">
      <input
        :id="inputId"
        :type="type"
        :placeholder="placeholder"
        :value="modelValue"
        :disabled="disabled"
        :readonly="readonly"
        :min="min"
        :max="max"
        :step="step"
        :class="inputClasses"
        @input="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
      >
      
      <!-- Icône d'erreur -->
      <div 
        v-if="hasError" 
        class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
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

export interface ValidatedInputProps {
  modelValue: string | number
  type?: 'text' | 'email' | 'password' | 'number' | 'date' | 'tel'
  label?: string
  placeholder?: string
  errorMessage?: string
  helpText?: string
  required?: boolean
  disabled?: boolean
  readonly?: boolean
  min?: string | number
  max?: string | number
  step?: string | number
}

const props = withDefaults(defineProps<ValidatedInputProps>(), {
  type: 'text',
  label: undefined,
  placeholder: undefined,
  errorMessage: undefined,
  helpText: undefined,
  required: false,
  disabled: false,
  readonly: false,
  min: undefined,
  max: undefined,
  step: undefined
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
}>()

const inputId = computed(() => `input-${Math.random().toString(36).substr(2, 9)}`)

const hasError = computed(() => !!props.errorMessage)

const inputClasses = computed(() => [
  'block w-full px-3 py-2 border rounded-md shadow-sm transition-colors duration-200',
  'placeholder-gray-400 dark:placeholder-gray-500',
  'focus:outline-none focus:ring-2 focus:ring-offset-2',
  'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',
  'dark:bg-gray-700 dark:text-white dark:border-gray-600',
  {
    'border-red-300 focus:border-red-500 focus:ring-red-500 dark:border-red-500': hasError.value,
    'border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:focus:border-blue-400': !hasError.value
  }
])

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement
  let value: string | number = target.value
  
  if (props.type === 'number' && value !== '') {
    value = parseFloat(value)
    if (isNaN(value)) {
      value = target.value // Garder la valeur string si non convertible
    }
  }
  
  emit('update:modelValue', value)
}

function handleBlur(event: FocusEvent) {
  emit('blur', event)
}

function handleFocus(event: FocusEvent) {
  emit('focus', event)
}</script>