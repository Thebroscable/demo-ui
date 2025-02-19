<template>
  <div class="w-full h-screen px-16 py-8">
    <div
      class="h-full flex flex-col space-y-4"
    >
      <div class="flex flex-row">
        <button
          class="bg-blue-500 px-2 rounded-sm text-white"
          @click="getRequestCount"
        >
          Request Count
        </button>
        <div class="flex items-center border-2 rounded-xl pl-2 w-1/2 mx-auto">
          <i
            class="fas fa-search text-gray-500 text-xl"
          />
          <input
            v-model="search"
            type="text"
            class="w-full outline-none pl-2"
          >
          <button
            class="border-l-2 hover:bg-gray-100 pl-2 pr-3 rounded-r-xl"
            @click="getAllBooks('0')"
          >
            Find
          </button>
        </div>
        <button
          class="bg-blue-500 px-2 rounded-sm text-white"
          @click="onCreateBook"
        >
          Add Book
        </button>
      </div>
      <div class="flex flex-col flex-1 shadow-xl">
        <BaseTable>
          <template
            v-if="!books?.content"
            #caption
          >
            There are no books :V
          </template>
          <template #headerRow>
            <template
              v-for="(detail, index) in bookDetails"
              :key="index"
            >
              <UITableHead
                class="whitespace-nowrap text-center w-[12.5%]"
              >
                {{ detail }}
              </UITableHead>
            </template>
          </template>
          <template #body>
            <template
              v-for="(book, index) in books?.content"
              :key="index"
            >
              <UITableRow class="text-center">
                <UITableCell>{{ book.title }}</UITableCell>
                <UITableCell>{{ book.author }}</UITableCell>
                <UITableCell>{{ book.publisher }}</UITableCell>
                <UITableCell>{{ book.isbn }}</UITableCell>
                <UITableCell>{{ book.pages }}</UITableCell>
                <UITableCell>{{ book.releaseDate ? book.releaseDate : 'N/A' }}</UITableCell>
                <UITableCell>{{ book.language }}</UITableCell>
                <UITableCell>{{ book.description }}</UITableCell>
                <UITableCell>
                  <div class="flex flex-row gap-x-2">
                    <i
                      class="fas fa-trash text-red-500 text-xl cursor-pointer"
                      @click="removeBook(book.id)"
                    />
                    <i
                      class="fas fa-edit text-black text-xl cursor-pointer"
                      @click="onEditBook(book.id)"
                    />
                  </div>
                </UITableCell>
              </UITableRow>
            </template>
          </template>
        </BaseTable>
      </div>
      <div class="flex justify-center mb-0">
        <UIPagination
          v-slot="{ page }"
          :total="books?.totalElements"
          :sibling-count="1"
          :page="currentPage"
          :items-per-page="8"
          show-edges
          @update:page="changePage"
        >
          <UIPaginationList
            v-slot="{ items }"
            class="flex items-center gap-1"
          >
            <UIPaginationFirst />
            <UIPaginationPrev />

            <template v-for="(item, index) in items">
              <UIPaginationListItem
                v-if="item.type === 'page'"
                :key="index"
                :value="item.value"
                as-child
              >
                <UIButton
                  class="w-10 h-10 p-0"
                  :variant="item.value === page ? 'default' : 'outline'"
                >
                  {{ item.value }}
                </UIButton>
              </UIPaginationListItem>
              <UIPaginationEllipsis
                v-else
                :key="item.type"
                :index="index"
              />
            </template>

            <UIPaginationNext />
            <UIPaginationLast />
          </UIPaginationList>
        </UIPagination>
      </div>
    </div>
    <ModalBookCreate
      v-model:open="openBookCreate"
      @created="getAllBooks"
    />
    <ModalBookEdit
      v-model:open="openBookEdit"
      :book-id="editBook"
      @edited="afterEdit"
    />
  </div>
</template>

<script lang="ts" setup>
import Swal from 'sweetalert2'
import * as BookService from '~/services/book'
import * as RequestCountService from '~/services/requestCount'
import type { PagedBooks } from '~/types/book'

const bookDetails = ['Title', 'Author', 'Publisher', 'ISBN', 'Pages', 'Release Date', 'Language', 'Description', 'Action']

const books = ref<PagedBooks>()

const search = ref<string>()
const currentPage = ref(1)
const editBook = ref()

const openBookCreate = ref(false)
const onCreateBook = () => {
  openBookCreate.value = true
}

const openBookEdit = ref(false)
const onEditBook = (bookId: string) => {
  editBook.value = bookId.toString()
  openBookEdit.value = true
}

const getAllBooks = async (page?: string) => {
  const response = await BookService.getPagedBooks(page, search.value)

  if (response.status === 'success') {
    books.value = response.data
  }
}

const changePage = async (page: number) => {
  const response = await BookService.getPagedBooks((page - 1).toString(), search.value)

  currentPage.value = page

  if (response.status === 'success') {
    books.value = response.data
  }
}

const getRequestCount = async () => {
  const response = await RequestCountService.requestCount()

  if (response.status === 'success') {
    alert(`Request count: ${response.data}`)
  }
}

const removeBook = async (bookId: string) => {
  Swal.fire({
    title: 'Are you sure?',
    showCancelButton: true,
    confirmButtonText: 'Delete',
    confirmButtonColor: 'red',
    cancelButtonText: 'Cancel',
  }).then(async (result) => {
    if (result.isConfirmed) {
      await BookService.removeBook(bookId)
      await getAllBooks()
      currentPage.value = 1
    }
  })
}

const afterEdit = async () => {
  await getAllBooks()

  editBook.value = 0
}

onMounted(async () => {
  await getAllBooks()
})
</script>

<style>

</style>
