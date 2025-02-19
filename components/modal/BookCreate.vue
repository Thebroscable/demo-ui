<template>
  <BaseDialog v-model:open="open">
    <div class="bg-white p-6 rounded-lg max-w-lg w-full">
      <div class="flex justify-between items-center">
        <h3 class="text-xl font-semibold">
          Create Book
        </h3>
      </div>

      <form
        class="space-y-4 mt-4"
      >
        <label
          for="title"
          class="block text-sm font-medium"
        >Title</label>
        <input
          id="title"
          v-model="book.title"
          type="text"
          class="mt-1 p-2 border rounded w-full"
          placeholder="Enter book title"
          required
        />
        <div>
          <label
            for="author"
            class="block text-sm font-medium"
          >Author</label>
          <input
            id="author"
            v-model="book.author"
            type="text"
            class="mt-1 p-2 border rounded w-full"
            placeholder="Enter author name"
            required
          />
        </div>

        <div>
          <label
            for="publisher"
            class="block text-sm font-medium"
          >Publisher</label>
          <input
            id="publisher"
            v-model="book.publisher"
            type="text"
            class="mt-1 p-2 border rounded w-full"
            placeholder="Enter publisher"
            required
          />
        </div>

        <div>
          <label
            for="isbn"
            class="block text-sm font-medium"
          >ISBN</label>
          <input
            id="isbn"
            v-model="book.isbn"
            type="text"
            class="mt-1 p-2 border rounded w-full"
            placeholder="Enter ISBN number"
            required
          />
        </div>

        <div>
          <label
            for="pages"
            class="block text-sm font-medium"
          >Pages</label>
          <input
            id="pages"
            v-model="book.pages"
            type="number"
            class="mt-1 p-2 border rounded w-full"
            placeholder="Enter number of pages"
            required
          />
        </div>

        <div>
          <label
            for="releaseDate"
            class="block text-sm font-medium"
          >Release Date</label>
          <input
            id="releaseDate"
            v-model="book.releaseDate"
            type="date"
            class="mt-1 p-2 border rounded w-full"
            required
          />
        </div>

        <div>
          <label
            for="language"
            class="block text-sm font-medium"
          >Language</label>
          <input
            id="language"
            v-model="book.language"
            type="text"
            class="mt-1 p-2 border rounded w-full"
            placeholder="Enter language"
            required
          />
        </div>
        <div class="text-red-500">
          {{ error }}
        </div>

        <div>
          <label
            for="description"
            class="block text-sm font-medium"
          >Description</label>
          <textarea
            id="description"
            v-model="book.description"
            class="mt-1 p-2 border rounded w-full resize-none"
            placeholder="Enter book description"
            required
          ></textarea>
        </div>
      </form>

      <div class="mt-4 flex justify-end space-x-2">
        <button
          type="submit"
          class="px-4 py-2 bg-blue-500 text-white rounded"
          @click="onSubmit"
        >
          Submit
        </button>
      </div>
    </div>
  </BaseDialog>
</template>

<script lang="ts" setup>
import Swal from 'sweetalert2'
import * as BookService from '~/services/book'
import type { Book } from '~/types/book'

const emit = defineEmits<{
  (e: 'created'): void
}>()

const open = defineModel<boolean>('open')

const error = ref()

const book = ref<Book>({
  id: '',
  title: '',
  author: '',
  publisher: '',
  isbn: undefined,
  pages: undefined,
  releaseDate: undefined,
  language: undefined,
  description: undefined,
})

const onSubmit = async () => {
  const response = await BookService.addBook(book.value)

  if (response.status === 'error' && response.error) {
    error.value = response.error.message
  }

  if (response.status === 'success') {
    open.value = false
    Swal.fire({
      title: 'Done',
      text: 'Book added',
      icon: 'success',
      confirmButtonText: 'OK',
    })

    book.value = {
      id: '',
      title: '',
      author: '',
      publisher: '',
      isbn: undefined,
      pages: undefined,
      releaseDate: undefined,
      language: undefined,
      description: undefined,
    }

    emit('created')
  }
}
</script>

<style scoped>
</style>
