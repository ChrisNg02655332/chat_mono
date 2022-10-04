import axios, { Axios } from 'axios'
import { Application } from './Application'
import { Channel } from './Channel'
import { Member, MemberType } from './Member'

export { Chat }

class Chat {
  instance: Axios
  application: Application
  channel?: Channel
  member?: Member
  currentUser?: MemberType

  private constructor({
    instance,
    application,
    applicationId,
    currentUser,
  }: {
    instance: Axios
    applicationId: string
    application: Application
    member: Member
    currentUser: MemberType
  }) {
    this.instance = instance
    this.application = application
    this.channel = new Channel({ instance: this.instance, applicationId })
    this.member = this.member
    this.currentUser = currentUser
  }

  static async init({
    apikey,
    url,
    version = 'v1',
    userId,
    nickname,
    plainProfileUrl,
  }: {
    apikey: string
    url: string
    version?: 'v1'
    userId: string
    nickname: string
    plainProfileUrl?: string
  }) {
    try {
      const api = axios.create({
        baseURL: `${url}/api/${version}`,
        headers: { apikey },
      })

      const newApplication = new Application({ instance: api })
      const application = await newApplication.get()

      if (application?.data) {
        const applicationId = application.data.id
        const newMember = new Member({ instance: api, applicationId })
        const member = await newMember.createMember({
          memberId: userId,
          nickname,
          plainProfileUrl,
        })

        return new Chat({
          instance: api,
          applicationId,
          application: newApplication,
          member: newMember,
          currentUser: member?.data,
        })
      }
    } catch (err: any) {
      throw new Error(err)
    }
  }
}
