import { defineStore } from 'pinia'
import { type GitlabIssue } from '@/classes/GitlabIssue'

export const useIssueStore = defineStore({
  id: 'issueStore',
  state: () => ({
    issues: [] as GitlabIssue[],
    currentlyTrackedIssue: null as GitlabIssue | null,
    currentlyTracking: false
  }),
  getters: {
    getTrackedIssue: (state) => state.currentlyTrackedIssue,
    getIssues: (state) => state.issues,
    getCurrentlyTracking: (state) => state.currentlyTracking,
    getIssueById: (state) => (issueNumber: string) =>
      state.issues.find((issue) => issue.issueNumber === issueNumber)
  },
  actions: {
    addIssue(issue: GitlabIssue) {
      this.issues.push(issue)
    },
    addSpentTime(issueNumber: string, time: number) {
      const issueIndex = this.issues.findIndex((issue) => issue.issueNumber === issueNumber)
      this.issues[issueIndex].timeSpent += time
    },
    trackIssue(issueNumber: string) {
      const issueIndex = this.issues.findIndex((issue) => issue.issueNumber === issueNumber)
      this.currentlyTrackedIssue = this.issues[issueIndex]
      this.currentlyTracking = true
    },
    toggleTracking() {
      this.currentlyTracking = !this.currentlyTracking
    }
  }
})
