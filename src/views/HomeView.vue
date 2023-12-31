<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import { ref } from 'vue'
import AddIssue from '../components/AddIssue.vue'
import { type GitlabIssue } from '../classes/GitlabIssue'
import { useIssueStore } from '../stores/issueStore'
import IssueCard from '../components/IssueCard.vue'

// DATA
const issueStore = useIssueStore()
const issues = computed(() => issueStore.getIssues)

// listen for when a user presses CTRL+A
const ctrlAEventListen = (e: KeyboardEvent): void => {
  if (e.ctrlKey && e.key === 'a') {
    e.preventDefault()
    console.log('CTRL+A was pressed')
    showModal.value = true
  }
}

onMounted(() => {
  window.addEventListener('keydown', ctrlAEventListen)
})

//remove the event listener when the component is unmounted
onUnmounted(() => {
  window.removeEventListener('keydown', ctrlAEventListen)
})

// MODAL FORM SECTION
const showModal = ref(false)
const handleModalClose = (data: GitlabIssue | null) => {
  showModal.value = false

  if (data) {
    console.log('Received form data:', data)
    issueStore.addIssue(data)
  }
}

// ISSUES
const trackIssue = (issue: GitlabIssue) => {
  console.log('Tracking issue', issue)
  issueStore.trackIssue(issue.issueNumber)
}
</script>

<template>
  <main>
    <!-- Top section with add command -->
    <div class="flex flex-col h-screen justify-start">
      <div class="flex flex-row align-middle self-center w-full my-4 mx-4">
        <div class="border-white border-2 rounded-md p-4" @click.prevent="showModal = true">
          <p>CTRL + A</p>
        </div>
        <div class="ml-2 border-white border-2 rounded-md p-4" @click.prevent="showModal = true">
          <p>CTRL + I</p>
        </div>
        <div class="ml-2 border-white border-2 rounded-md p-4" @click.prevent="showModal = true">
          <p>CTRL + K</p>
        </div>
        <AddIssue :isOpen="showModal" :onClose="handleModalClose"></AddIssue>
      </div>
      <!-- List of issues to track -->
      <div class="overflow-auto w-full">
        <ul class="flex flex-row flex-wrap">
          <li
            v-for="issue in issues"
            :key="issue.issueNumber"
            class="border-1 bg-tertiary-container text-on-tertiary-container p-4 rounded-xl my-2 mr-4"
          >
            <IssueCard :issue="issue" :track="trackIssue" />
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>
