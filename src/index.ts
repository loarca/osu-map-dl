import { BloodcatProvider } from './providers'

interface OsuBeatmapDlOptions {
  beatmapsetID: number
  noVideo?: boolean
  downloadFolder?: string
}

export default (options: OsuBeatmapDlOptions): Promise<void> => {
  // Default options
  const { beatmapsetID, downloadFolder = '', noVideo = false } = options

  // Use bloodcat provider
  const bloodcat = new BloodcatProvider()

  // Download
  return bloodcat.download(beatmapsetID, downloadFolder, noVideo)
}
