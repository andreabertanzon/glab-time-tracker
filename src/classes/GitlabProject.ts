import { z } from 'zod'

const GitlabProjectSchema = z.object({
  id: z.number(),
  description: z.string(),
  name: z.string(),
  web_url: z.string()
})

type GitlabProject = z.infer<typeof GitlabProjectSchema>

export {GitlabProjectSchema, type GitlabProject}