<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70"
    @click="closeModal"
  >
    <div
      class="relative bg-container-dark border-2 border-white p-5 rounded-lg max-w-md w-full"
      @click.stop
    >
      <button
        @click="closeModal"
        class="absolute top-2 right-2 p-1 bg-card-dark rounded-full hover:bg-gray-300 focus:outline-none"
      >
        X
      </button>
      <p class="text-xl text-white">Add Issue</p>
      <form @submit.prevent="submitForm">
        <input
          v-model="formData.issueNumber"
          placeholder="Issue Number"
          class="border rounded my-2 p-2 w-full bg-card-dark"
        />
        <input
          v-model="formData.issueTitle"
          placeholder="Title"
          class="border rounded p-2 w-full bg-card-dark"
        />
        <button type="submit" class="mt-3 bg-blue-500 text-white p-2 rounded">Submit</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs } from 'vue'
import { GitlabIssue } from '../classes/GitlabIssue'

//write documentation for the props
const props = defineProps({
  isOpen: Boolean,
  onClose: Function
})

// define isOpen as a reactive property
const { isOpen } = toRefs(props)

const formData = ref({ issueNumber: '', issueTitle: '', timeSpent: 0 } as GitlabIssue)

const submitForm = () => {
  if (props.onClose) {
    props.onClose(formData.value)
  }
}

const closeModal = () => {
  if (props.onClose) {
    props.onClose(null)
  }
}
</script>
