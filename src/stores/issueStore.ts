import { defineStore } from 'pinia'
import { type GitlabIssue } from '@/classes/GitlabIssue'

export const useIssueStore = defineStore({
  id: 'issueStore',
  state: () => ({
    issues: [] as GitlabIssue[]
  }),
  getters: {
    getIssues: (state) => state.issues,
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
    }
  }
})
