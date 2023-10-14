import { defineStore } from 'pinia'
import { type GitlabIssue } from '@/classes/GitlabIssue'

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
      const hours = Math.floor(state.currentIssueSeconds / 3600)
      const minutes = Math.floor((state.currentIssueSeconds % 3600) / 60)
      const seconds = Math.floor((state.currentIssueSeconds % 3600) % 60)
      const secondsString = seconds < 10 ? `0${seconds}` : seconds
      const minutesString = minutes < 10 ? `0${minutes}` : minutes
      return `${hours}:${minutesString}:${secondsString}`
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
      this.currentIssueSeconds = 0
      const issueIndex = this.issues.findIndex((issue) => issue.issueNumber === issueNumber)
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
