import React from 'react'
import { Chat } from '@chat/core'

export { App }

type AppProps = {}

const instance = await Chat.init({
  apikey: '48a56366-3e38-495f-8443-877a67435029',
  url: 'http://localhost:4000',
  userId: 'user_1',
  nickname: 'chris',
})

function App({}: AppProps) {
  React.useEffect(() => {
    console.log(instance?.currentUser)
  }, [])

  return <div>App</div>
}
