<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50"
  >
    <div class="bg-white p-6 rounded-lg max-w-lg w-full">
      <div class="flex justify-between items-center">
        <h3 class="text-xl font-semibold">
          {{ title }}
        </h3>
        <button
          class="text-gray-500 text-xl"
          @click="close"
        >
          &times;
        </button>
      </div>

      <form
        class="space-y-4 mt-4"
        @submit.prevent="submitForm"
      >
        <slot name="inputs" />

        <div class="mt-4 flex justify-end space-x-2">
          <button
            class="px-4 py-2 bg-gray-300 rounded"
            @click="close"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineEmits } from 'vue'

// Emitting event to parent with form data
const emit = defineEmits<{
  (event: 'submit', formData: { name: string, email: string }): void
}>()

const isOpen = ref(false)
const title = ref('Form Title')
const form = ref({
  name: '',
  email: '',
})

// Function to open the modal
const open = () => {
  isOpen.value = true
}

// Function to close the modal
const close = () => {
  isOpen.value = false
  resetForm() // Optionally reset form when closed
}

// Reset form function (optional)
const resetForm = () => {
  form.value.name = ''
  form.value.email = ''
}

// Emit the form data to the parent when submitted
const submitForm = () => {
  emit('submit', form.value) // Emit event with form data
  close() // Close modal after submission
}

// Expose open and close methods to be used by parent component
defineExpose({
  open,
  close,
})
</script>

<style scoped>
/* Custom styles for the modal */
</style>
