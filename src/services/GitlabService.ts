import { OperationResult } from '@/classes/OperationResult'
import { Unit } from '@/classes/Unit'
import axios from 'axios'
import { type GitlabProject, GitlabProjectSchema } from '@/classes/GitlabProject'
import { convertTimeToDecimalHours } from '@/helpers/timeFormatter'

export class GitlabService {
  constructor() {}

  GITLAB_API_URL = process.env.GITLAB_API_URL
  //PROJECT_ID = 18 //'your_project_id'; 18 is okv
  ISSUE_IID = 1152 //'your_issue_iid';
  PRIVATE_TOKEN = process.env.PRIVATE_TOKEN

  public async getProjectInfo(projId: number): Promise<OperationResult<GitlabProject>> {
    try {
      const result = await axios.get(`${this.GITLAB_API_URL}/projects/${projId}`, {
        headers: {
          'PRIVATE-TOKEN': this.PRIVATE_TOKEN
        }
      })

      const gitlabProject = GitlabProjectSchema.parse(result.data)

      return OperationResult.Success(gitlabProject)
    } catch (err: any) {
      return OperationResult.Error(err)
    }
  }

  public async updateIssueTimeTracking(
    projId: number,
    duration: string,
    originalDate: Date
  ): Promise<OperationResult<Unit>> {
    try {
      // create a variable that holds the current date (only date, not time)
      const dateString = originalDate.toISOString().split('T')[0]
      const decimalDuration = convertTimeToDecimalHours(duration)
      const durationString = `${decimalDuration}h`

      // Update the issue with the new time tracking data
      await axios.post(
        `${this.GITLAB_API_URL}/projects/${projId}/issues/${this.ISSUE_IID}/notes?body=%2Fspend%20${durationString}%20${dateString}`,
        null,
        {
          headers: {
            'PRIVATE-TOKEN': this.PRIVATE_TOKEN
          }
        }
      )

      return OperationResult.Success(Unit.of())
    } catch (error: any) {
      return OperationResult.Error(error, Unit.of())
    }
  }
}
