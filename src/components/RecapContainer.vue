<template>
  <div>Recap Container</div>
  <div class="border-2 rounded-lg p-4">
    <p>{{ issue?.issueTitle ?? 'No Issue Tracked' }}</p>
    <button
      class="border-2 rounded-lg border-white my-1 p-2"
      v-show="issue"
      @click.prevent="stopTracking"
    >
      {{ currentlyTracking ? 'Stop Tracking' : 'Start Tracking' }}
    </button>
    <p>{{ formattedTime }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useIssueStore } from '../stores/issueStore'

// DATA
const issueStore = useIssueStore()
const issue = computed(() => issueStore.getTrackedIssue)
const formattedTime = computed(() => issueStore.getFormattedTime)

let currentlyTracking = computed(() => issueStore.getCurrentlyTracking)

const stopTracking = () => {
  console.log('Stop tracking issue')
  issueStore.toggleTracking()
}
</script>

<style lang="scss" scoped></style>
