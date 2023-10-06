<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { ref } from 'vue'
import AddIssue from '../components/AddIssue.vue'
import { type GitlabIssue } from '../classes/GitlabIssue'
import { useIssueStore } from '../stores/issueStore'

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
      <div class="border-2 border-yellow-100 row-span-1">
        <h3>Add Issue</h3>
        <button @click="showModal = true">CTRL+A</button>
        <AddIssue :isOpen="showModal" :onClose="handleModalClose"></AddIssue>
      </div>
      <!-- List of issues to track -->
      <div class="border-2 border-yellow-300 row-span-6">
        <ul>
          <li v-for="issue in issues" :key="issue.issueNumber">
            <div class="flex flex-row">
              <div class="flex-1">
                <h3>{{ issue.issueTitle }}</h3>
              </div>
              <div class="flex-1">
                <p>Time Spent: {{ issue.timeSpent }}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="border-2 border-yellow-600 row-span-3">
        <h3>Time Tracking Component</h3>
      </div>
    </div>
  </main>
</template>
