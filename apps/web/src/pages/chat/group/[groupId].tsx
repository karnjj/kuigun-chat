import ChatBox from '@/components/ChatBox'
import ChatContainer from '@/components/ChatContainer'
import { useSession } from '@/contexts/sessionContext'
import { useGroupColor, useGroupHistory, useSendGroupMessage } from '@/queries/useGroup'
import { Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router'

const ChatGroup = () => {
  const router = useRouter()
  const groupId = router.query.groupId as string
  const [sendMessage] = useSendGroupMessage()
  const { username } = useSession()
  const chatHistory = useGroupHistory(groupId)
  const color = useGroupColor(groupId)

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
