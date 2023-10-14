import { defineStore } from 'pinia'
import { type GitlabIssue } from '@/classes/GitlabIssue'
import { formatTime } from '@/helpers/timeFormatter'

export const useIssueStore = defineStore({
  id: 'issueStore',
  state: () => ({
    issues: [] as GitlabIssue[],
    currentlyTrackedIssue: null as GitlabIssue | null,
    currentlyTracking: false,
    currentIssueSeconds: 0,
    currentIssueIntervalId: null as NodeJS.Timeout | null
  }),
  getters: {
    getTrackedIssue: (state) => state.currentlyTrackedIssue,
    getIssues: (state) => state.issues,
    getCurrentlyTracking: (state) => state.currentlyTracking,
    getIssueById: (state) => (issueNumber: string) =>
      state.issues.find((issue) => issue.issueNumber === issueNumber),
    getFormattedTime: (state) => {
      return formatTime(state.currentIssueSeconds)
    }
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
      if (this.currentlyTrackedIssue !== null) {
        const oldIssueIndex = this.issues.findIndex(
          (issues) => issues.issueNumber === this.currentlyTrackedIssue?.issueNumber
        )
        const timeSpent = this.currentIssueSeconds - this.issues[oldIssueIndex].timeSpent
        this.issues[oldIssueIndex].timeSpent += timeSpent
      }
      this.currentIssueSeconds = this.issues[issueIndex].timeSpent
      this.currentlyTrackedIssue = this.issues[issueIndex]
      // this.currentlyTracking = true
    },
    toggleTracking() {
      this.currentlyTracking = !this.currentlyTracking
      if (this.currentlyTracking) {
        this.currentIssueIntervalId = setInterval(() => {
          this.currentIssueSeconds++
        }, 1000)
      } else {
        clearInterval(this.currentIssueIntervalId!)
        this.currentIssueIntervalId = null
      }
    }
  }
})
