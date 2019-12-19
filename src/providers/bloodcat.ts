import axios, { AxiosResponse } from 'axios'
import { Readable } from 'stream'
import { BaseProvider } from './base'

export class BloodcatProvider extends BaseProvider {
  protected implementation (beatmapsetID: number): Promise<AxiosResponse<Readable>> {
    return axios.get(`https://bloodcat.com/osu/s/${beatmapsetID}`, {
      responseType: 'stream'
    })
  }
}
