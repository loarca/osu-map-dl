import { BloodcatProvider } from './providers'

interface OsuBeatmapDlOptions {
  beatmapsetID: number
  noVideo?: boolean
  downloadFolder?: string
}

const downloadMap = (options: OsuBeatmapDlOptions): Promise<void> => {
  // Default options
  const { beatmapsetID, downloadFolder = '.', noVideo = false } = options

  // Use bloodcat provider
  const bloodcat = new BloodcatProvider()

  // Download
  return bloodcat.download(beatmapsetID, downloadFolder, noVideo)
}

// Export for CommonJS
module.exports = exports = downloadMap

// Export for ES Modules
export default downloadMap
