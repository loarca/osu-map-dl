import { OsuWebsiteProvider, BloodcatProvider } from './providers'

interface OsuBeatmapDlOptions {
  beatmapsetID: number
  noVideo?: boolean
  downloadFolder?: string
  banchoUsername?: string
  banchoPassword?: string
  preference?: 'osu!website' | 'bloodcat'
}

const downloadMap = async (options: OsuBeatmapDlOptions): Promise<void> => {
  // Default options
  const {
    beatmapsetID,
    downloadFolder = '.',
    noVideo = false,
    preference = 'osu!website',
    banchoPassword,
    banchoUsername
  } = options

  // Initialize providers
  const osuWebsite = new OsuWebsiteProvider()
  const bloodcat = new BloodcatProvider()

  // If user and password were provived, initialize osu!website provider
  if (banchoUsername && banchoPassword) {
    await osuWebsite.login(banchoUsername, banchoPassword)
  }

  // If preference is osu!website (and login was successful) use that one,
  // bloodcat otherwise
  const provider = (preference === 'osu!website' && osuWebsite.isLoggedIn) ? osuWebsite : bloodcat
  const providerFallback = (provider === osuWebsite) ? bloodcat : osuWebsite
  let success = true

  try {
    // Download
    await provider.download(beatmapsetID, downloadFolder, noVideo)
  } catch {
    // If desired provider failed, try with the other one
    try {
      await providerFallback.download(beatmapsetID, downloadFolder, noVideo)
    } catch {
      // If download wasn't successful on any provider
      success = false
    }
  }

  // Log out of osu!website if logged in
  osuWebsite.isLoggedIn && await osuWebsite.logout()

  // Throw error if download failed
  if (!success) throw new Error('download failed')
}

// Export for CommonJS
module.exports = exports = downloadMap

// Export for ES Modules
export default downloadMap
