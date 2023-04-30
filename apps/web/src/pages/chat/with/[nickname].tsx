import ChatBox from '@/components/ChatBox'
import ChatContainer from '@/components/ChatContainer'
import { useSession } from '@/contexts/sessionContext'
import useLocalStorage from '@/hooks/useLocalStorage'
import { usePrivateHistory, useSendPrivateMessage } from '@/queries/usePeople'
import { Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const ChatWith = () => {
  const router = useRouter()
  const chatWith = router.query.nickname as string
  const chatHistory = usePrivateHistory(chatWith)
  const [sendMessage] = useSendPrivateMessage()
  const { username } = useSession()
  const [readTime, setReadTime] = useLocalStorage('read-time', {})

  useEffect(() => {
    if (chatHistory?.length) {
      const lastMsg = chatHistory[0]
      setReadTime({ ...readTime, [chatWith]: lastMsg.sendAt })
    }
  }, [chatHistory?.length, setReadTime])

  const handleSendMsg = (msg: string) => {
    sendMessage({ to: chatWith, message: msg })
  }

  return (
    <ChatContainer>
      <Stack spacing={1}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h5">{`Chat with: ${chatWith}`}</Typography>
          <Typography variant="h5">{`Username: ${username}`}</Typography>
        </Stack>
        <ChatBox color="#ffb5b0" sendMsg={handleSendMsg} chat={chatHistory} />
      </Stack>
    </ChatContainer>
  )
}

export default ChatWith
