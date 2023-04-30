import ChatBox from '@/components/ChatBox'
import ChatContainer from '@/components/ChatContainer'
import { useSession } from '@/contexts/sessionContext'
import useLocalStorage from '@/hooks/useLocalStorage'
import { useGroupColor, useGroupHistory, useSendGroupMessage } from '@/queries/useGroup'
import { Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const ChatGroup = () => {
  const router = useRouter()
  const groupId = router.query.groupId as string
  const [sendMessage] = useSendGroupMessage()
  const { username } = useSession()
  const chatHistory = useGroupHistory(groupId)
  const color = useGroupColor(groupId)

  const [readTime, setReadTime] = useLocalStorage('read-time', {})

  useEffect(() => {
    if (chatHistory?.length) {
      const lastMsg = chatHistory[0]
      setReadTime({ ...readTime, [groupId]: lastMsg.sendAt })
    }
  }, [chatHistory?.length, setReadTime])

  const handleSendMsg = (msg: string) => {
    sendMessage({ groupId, message: msg })
  }

  return (
    <ChatContainer>
      <Stack spacing={1}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h5">{`GROUP ID: ${groupId}`}</Typography>
          <Typography variant="h5">{`Username: ${username}`}</Typography>
        </Stack>
        {!!color && <ChatBox color={color} chat={chatHistory} sendMsg={handleSendMsg} />}
      </Stack>
    </ChatContainer>
  )
}

export default ChatGroup
