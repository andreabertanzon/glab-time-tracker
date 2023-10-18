import { z } from 'zod'

const GitlabIssueSchema = z.object({
  issueNumber: z.string(),
  issueTitle: z.string(),
  timeSpent: z.number().positive().default(0),
  timeSpentHumanReadable: z.string().nullable().default(null),
  projectNumber: z.string()
})

/**
 * Defines an Issue coming from GitLab
 */
type GitlabIssue = z.infer<typeof GitlabIssueSchema>

export { GitlabIssueSchema, type GitlabIssue }
