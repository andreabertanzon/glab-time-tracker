<template>
  <div>
    <div class="flex flex-col content-center">
      <div class="flex-1">
        <h3 class="issue-title">#{{ `${issue.issueNumber}: ${issue.issueTitle}` }}</h3>
      </div>
      <div class="flex-1 flex justify-start">
        <button disabled="true" class="m-1">
          <i class="fa fa-solid fa-clock text-xl"></i> {{ issue.timeSpent }}
        </button>
        <button disabled="true" class="m-2">
          <i class="fa fa-solid fa-star text-xl"></i> {{ issue.projectNumber }}
        </button>
        <button @click.prevent="console.log('clicked')" class="m-2">
          <i class="fa fa-solid fa-bookmark text-l"> Track </i>
        </button>
        <button @click.prevent="console.log('clicked')" class="m-2">
          <i class="fa fa-solid fa-paper-plane text-l"> Send</i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type GitlabIssue } from '../classes/GitlabIssue'

const { issue } = defineProps<{ issue: GitlabIssue }>()
</script>

<style scoped>
.issue-title {
  max-width: 100%; /* or any other width you find appropriate */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
