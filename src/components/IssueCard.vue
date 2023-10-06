<template>
  <div>
    <div class="flex flex-row">
      <div class="flex-1">
        <h3>#{{ `${issue.issueNumber}: ${issue.issueTitle}` }}</h3>
      </div>
      <div class="flex-1 grid grid-cols-4">
        <p><i class="fa fa-solid fa-clock text-xl col-span-1"></i> {{ issue.timeSpent }}</p>
        <p><i class="fa fa-solid fa-star text-xl col-span-1"></i> {{ issue.projectNumber }}</p>
        <button @click.prevent="console.log('clicked')">
          <i class="fa fa-solid fa-bookmark text-xl col-span-1 border-2 rounded-xl px-2"> Track </i>
        </button>
        <button @click.prevent="console.log('clicked')">
          <i class="fa fa-solid fa-paper-plane text-xl col-span-1 border-2 rounded-xl pl-2 pr-3">
            Send</i
          >
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type GitlabIssue } from '../classes/GitlabIssue'

const { issue } = defineProps<{ issue: GitlabIssue }>()
</script>

<style scoped></style>
