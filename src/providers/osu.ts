import axios, { AxiosResponse, AxiosInstance } from 'axios'
import axiosCookieJarSupport from 'axios-cookiejar-support'
import { CookieJar } from 'tough-cookie'
import { stringify } from 'querystring'
import { Readable } from 'stream'
import { BaseProvider } from './base'
import { promisify } from 'util'

export class OsuWebsiteProvider extends BaseProvider {
  public get isLoggedIn (): boolean {
    return this.loggedIn
  }

  private loggedIn: boolean
  private axios: AxiosInstance
  private cookieJar: CookieJar

  constructor () {
    super()
    this.axios = axios.create({
      baseURL: 'https://osu.ppy.sh/',
      withCredentials: true
    })
    axiosCookieJarSupport(this.axios)
    this.axios.defaults.jar = this.cookieJar = new CookieJar(undefined, {
      // allow osu.ppy.sh domain
      rejectPublicSuffixes: false
    })
    this.loggedIn = false
  }

  public async login (username: string, password: string): Promise<boolean> {
    try {
      // Get xsrf token
      const homeResponse = await this.axios.get('/home')
      const cookieName = homeResponse.config.xsrfCookieName
      const allCookies = await promisify(this.cookieJar.getCookies.bind(this.cookieJar))('https://osu.ppy.sh/home')
      const _token = allCookies.find(cookie => cookie.key === cookieName)?.value

      // Log in
      await this.axios.post('/session', stringify({
        _token: _token || '',
        username,
        password
      }), {
        headers: {
          Referer: 'https://osu.ppy.sh/home'
        }
      })

      this.loggedIn = true
      return true
    } catch {
      console.log('osu provider failed')
      return false
    }
  }

  public async logout (): Promise<boolean> {
    try {
      await this.axios.delete('/session')
      this.loggedIn = false
      return true
    } catch {
      return false
    }
  }

  protected implementation (beatmapsetID: number, noVideo: boolean): Promise<AxiosResponse<Readable>> {
    return this.axios.get(`/beatmapsets/${beatmapsetID}/download`, {
      params: {
        noVideo: noVideo ? 1 : 0
      },
      responseType: 'stream',
      headers: {
        Referer: `https://osu.ppy.sh/beatmapsets/${beatmapsetID}`
      }
    })
  }
}
