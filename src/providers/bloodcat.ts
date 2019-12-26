import axios, { AxiosResponse, AxiosInstance } from 'axios'
import { Readable } from 'stream'
import { BaseProvider } from './base'

export class BloodcatProvider extends BaseProvider {
  private axios: AxiosInstance

  constructor () {
    super()
    this.axios = axios.create({
      baseURL: 'https://bloodcat.com/osu/s/',
      withCredentials: false
    })
  }

  protected implementation (beatmapsetID: number): Promise<AxiosResponse<Readable>> {
    return this.axios.get(`/${beatmapsetID}`, {
      responseType: 'stream'
    })
  }
}
