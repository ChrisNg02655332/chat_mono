import axios, { Axios } from 'axios'

export { Application }

type ApplicationType = {
  id: string
}

class Application {
  instance: Axios
  constructor({ instance }: { instance: Axios }) {
    this.instance = instance
  }

  async get() {
    try {
      const { data } = await this.instance.get<{ data: ApplicationType }>('/applications/apikey')
      return data
    } catch (err: any) {
      throw new Error(err)
    }
  }
}
