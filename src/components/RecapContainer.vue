<template>
  <div>Recap Container</div>
  <p>{{ issue ?? 'No Issue Tracked' }}</p>
  <button v-show="currentlyTracking" @click.prevent="stopTracking">Stop Tracking</button>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useIssueStore } from '../stores/issueStore'

// DATA
const issueStore = useIssueStore()
const issue = computed(() => issueStore.getTrackedIssue)

let currentlyTracking = computed(() => issueStore.getCurrentlyTracking)

const stopTracking = () => {
  console.log('Stop tracking issue')
  issueStore.toggleTracking()
}
</script>

<style lang="scss" scoped></style>
