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
    /**
     * Represents all those issues that can be saved or sent to gitlab since
     * they have a timeSpentHumanReadable value and hence a spent time value.
     * @param state internal state of the store
     * @returns filtered issues that are ready to be sent to the backend
     */
    getReadyToSendIssues: (state) =>
      state.issues.filter((issue) => issue.timeSpentHumanReadable !== null),
    getCurrentlyTracking: (state) => state.currentlyTracking,
    getIssueById: (state) => (issueNumber: string) =>
      state.issues.find((issue) => issue.issueNumber === issueNumber),
    getFormattedTime: (state) => {
      return formatTime(state.currentIssueSeconds)
    }
  },
  actions: {
    /**
     * GitLab issues are stored in an array, this method adds an issue to the store
     * @param issue the issue to add to the store (issue array)
     */
    addIssue(issue: GitlabIssue) {
      this.issues.push(issue)
    },
    /**
     * this method adds time to an issue
     * @param issueNumber number of the issue to add time to
     * @param time time spent to add to the issue
     */
    addSpentTime(issueNumber: string, time: number) {
      const issueIndex = this.issues.findIndex((issue) => issue.issueNumber === issueNumber)
      this.issues[issueIndex].timeSpent += time
    },
    /**
     * Sets the currently tracked issue
     * @param issueNumber the issue number to track
     */
    trackIssue(issueNumber: string) {
      const issueIndex = this.issues.findIndex((issue) => issue.issueNumber === issueNumber)
      // if (this.currentlyTrackedIssue !== null) {
      //   const oldIssueIndex = this.issues.findIndex(
      //     (issues) => issues.issueNumber === this.currentlyTrackedIssue?.issueNumber
      //   )
      //   const timeSpent = this.currentIssueSeconds - this.issues[oldIssueIndex].timeSpent
      //   this.issues[oldIssueIndex].timeSpent += timeSpent
      //   this.issues[oldIssueIndex].timeSpentHumanReadable = formatTime(
      //     this.issues[oldIssueIndex].timeSpent
      //   )
      // }
      this.currentIssueSeconds = this.issues[issueIndex].timeSpent
      this.currentlyTrackedIssue = this.issues[issueIndex]
      // this.currentlyTracking = true
    },
    /**
     * Starts or stops the tracking of the current issue
     */
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
      if (this.currentlyTrackedIssue !== null) {
        const oldIssueIndex = this.issues.findIndex(
          (issues) => issues.issueNumber === this.currentlyTrackedIssue?.issueNumber
        )
        const timeSpent = this.currentIssueSeconds - this.issues[oldIssueIndex].timeSpent
        this.issues[oldIssueIndex].timeSpent += timeSpent
        this.issues[oldIssueIndex].timeSpentHumanReadable = formatTime(
          this.issues[oldIssueIndex].timeSpent
        )
      }
    },
    /**
     * This method orchestrate the call to the backend and to Gitlab
     *
     * @param issue the GitlabIssue to send both to Gitlab and to the backend
     */
    sendIssuesToBackend() {
      console.log('Sending issue to backend')
    }
  }
})
