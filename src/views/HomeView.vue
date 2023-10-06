<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { ref } from 'vue'
import AddIssue from '../components/AddIssue.vue'
import { type GitlabIssue } from '../classes/GitlabIssue'
import { useIssueStore } from '../stores/issueStore'
import IssueCard from '../components/IssueCard.vue'

// DATA
const issueStore = useIssueStore()
const issues = issueStore.getIssues

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
</script>

<template>
  <main>
    <!-- Top section with add command -->
    <div class="grid grid-rows-10 gap-2 h-screen">
      <div class="flex flex-row align-middle self-center row-span-1">
        <div class="border-white border-2 rounded-md p-4" @click.prevent="showModal = true">
          <p>CTRL + A</p>
        </div>
        <AddIssue :isOpen="showModal" :onClose="handleModalClose"></AddIssue>
      </div>
      <!-- List of issues to track -->
      <div class="row-span-6">
        <ul>
          <li
            v-for="issue in issues"
            :key="issue.issueNumber"
            class="border-1 bg-card-dark p-4 rounded-xl m-2"
          >
            <IssueCard :issue="issue" />
          </li>
        </ul>
      </div>
      <div class="border-2 rounded-xl bg-card-yellow row-span-3">
        <h3 class="text-container-dark">Time Tracking Component</h3>
      </div>
    </div>
  </main>
</template>
