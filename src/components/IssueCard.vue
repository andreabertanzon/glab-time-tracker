<template>
  <div class="issue-card">
    <div class="flex flex-col content-center h-full">
      <div class="flex-1">
        <h3 class="issue-title truncate" :title="`${issue.issueNumber}: ${issue.issueTitle}`">
          #{{ `${issue.issueNumber}: ${issue.issueTitle}` }}
        </h3>
      </div>
      <div class="flex-1 flex justify-center">
        <button disabled="true" class="m-4">
          <i class="fa fa-solid fa-clock text-xl"></i> {{ issue.timeSpent }}
        </button>
        <button disabled="true" class="m-4">
          <i class="fa fa-solid fa-star text-xl"></i> {{ issue.projectNumber }}
        </button>
        <button @click.prevent="trackIssue" class="m-4">
          <i class="fa fa-solid fa-bookmark text-l"> Track </i>
        </button>
        <button @click.prevent="console.log('clicked')" class="m-4">
          <i class="fa fa-solid fa-paper-plane text-l"> Send</i>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.issue-card {
  width: 380px; /* adjust as needed */
  height: 100px; /* adjust as needed */
  overflow: hidden;
}
.issue-title {
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
<script setup lang="ts">
import { type GitlabIssue } from '../classes/GitlabIssue'

const { issue, track } = defineProps<{ issue: GitlabIssue; track: Function }>()

const trackIssue = () => {
  console.log('Tracking issue', issue.issueNumber)
  track(issue)
}
</script>
