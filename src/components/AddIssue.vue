<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 flex items-center justify-center bg-background bg-opacity-70"
  >
    <div
      class="relative bg-secondary-container text-on-secondary-container border-1 border-on-surface p-5 rounded-lg max-w-md w-full"
      @click.stop
    >
      <button
        @click="closeModal"
        class="absolute top-2 right-2 p-1 bg-surface-variant rounded-full hover:bg-gray-300 focus:outline-none"
      >
        X
      </button>
      <p class="text-xl text-white">Add Issue</p>
      <form @submit.prevent="submitForm">
        <input
          v-model="formData.issueNumber"
          placeholder="Issue Number"
          class="rounded my-2 p-2 w-full bg-surface"
        />
        <input
          v-model="formData.issueTitle"
          placeholder="Title"
          class="rounded p-2 w-full bg-surface"
        />
        <input
          v-model="formData.projectNumber"
          placeholder="Project Number"
          class="rounded my-2 p-2 w-full bg-surface"
        />
        <button type="submit" class="mt-3 bg-secondary text-on-primary p-2 rounded">Submit</button>
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

const formData = ref({
  issueNumber: '',
  issueTitle: '',
  projectNumber: '',
  timeSpent: 0,
  timeSpentHumanReadable: null
} as GitlabIssue)

const submitForm = () => {
  if (props.onClose) {
    props.onClose(formData.value)
  }

  formData.value = {
    issueNumber: '',
    issueTitle: '',
    timeSpent: 0,
    projectNumber: '',
    timeSpentHumanReadable: null
  }
}

const closeModal = () => {
  if (props.onClose) {
    props.onClose(null)
  }
}
</script>
