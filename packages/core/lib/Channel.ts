import axios, { Axios } from 'axios'

export { Channel, type ChannelType }

type ChannelType = {
  id: string
  name: string
  channelType: ''
  coverUrl: string
  isFrozen: boolean
}

class Channel {
  instance: Axios

  constructor({ instance }: { instance: Axios; applicationId: string }) {
    this.instance = instance
  }

  async list() {
    try {
      const { data } = await this.instance.get<{ data: ChannelType[] }>('/channels')
      return data
    } catch (err: any) {
      throw new Error(err)
    }
  }

  async create() {}
}
