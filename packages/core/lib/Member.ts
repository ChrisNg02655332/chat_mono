import axios, { Axios } from 'axios'

export { Member, type MemberType }

type MemberType = {
  id: string
  name: string
  channelType: ''
  coverUrl: string
  isFrozen: boolean
}

class Member {
  instance: Axios
  private applicationId: string

  constructor({ instance, applicationId }: { instance: Axios; applicationId: string }) {
    this.instance = instance
    this.applicationId = applicationId
  }

  async list() {
    try {
      const { data } = await this.instance.get<{ data: MemberType[] }>('/members')
      return data
    } catch (err: any) {
      throw new Error(err.message)
    }
  }

  async getCurrentMember({ memberId }: { memberId: string }) {
    try {
      const { data } = await this.instance.get<{ data: MemberType }>(`/members/${memberId}`)
      return data
    } catch (err: any) {
      throw new Error(err)
    }
  }

  async createMember({
    memberId,
    nickname,
    plainProfileUrl,
  }: {
    memberId: string
    nickname: string
    plainProfileUrl?: string
  }) {
    try {
      const { data } = await this.instance.post<{ data: MemberType }>('/members', {
        member: {
          member_id: memberId,
          nickname: nickname,
          plain_profile_url: plainProfileUrl,
          applicationId: this.applicationId,
        },
      })
      return data
    } catch (err: any) {
      throw new Error(err)
    }
  }
}
