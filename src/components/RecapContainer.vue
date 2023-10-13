<template>
  <div class="mr-4">
    <h1>Recaps</h1>
    <div class="rounded-lg p-4 bg-secondary-container h-96 text-on-tertiary-container">
      <div class="flex justify-center" v-if="!issue">
        <h1 class="text-on-secondary-container">No Issue Tracked</h1>
      </div>
      <div class="flex flex-col justify-center align-middle" v-else>
        <h1 class="mt-10 text-6xl self-center text-on-secondary-container">{{ formattedTime }}</h1>
        <button class="p-2 my-6" v-show="issue" @click.prevent="stopTracking">
          <span class="material-icons text-8xl text-on-secondary-container">{{
            trackingStyle
          }}</span>
        </button>
        <div class="flex my-1">
          <span class="material-icons">sell</span>
          <h4 class="mx-2">{{ issue.issueNumber }}</h4>
        </div>
        <div class="flex">
          <span class="material-icons">badge</span>
          <h4 class="mx-2">{{ issue.issueTitle }}</h4>
        </div>
      </div>
    </div>
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
let trackingStyle = computed(() => (currentlyTracking.value ? 'pause_circle' : 'play_circle'))

const stopTracking = () => {
  console.log('Stop tracking issue')
  issueStore.toggleTracking()
}
</script>

<style lang="scss" scoped></style>
