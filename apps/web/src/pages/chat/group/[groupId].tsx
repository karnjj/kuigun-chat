import ChatBox from '@/components/ChatBox'
import ChatContainer from '@/components/ChatContainer'
import { useSession } from '@/contexts/sessionContext'
import { useGroupHistory } from '@/queries/useGroup'
import { Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router'

const ChatGroup = () => {
  const router = useRouter()
  const groupId = router.query.groupId as string
  const { username } = useSession()
  const chatHistory = useGroupHistory(groupId)

  return (
    <ChatContainer>
      <Stack spacing={1}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h5">{`GROUP ID: ${groupId}`}</Typography>
          <Typography variant="h5">{`Username: ${username}`}</Typography>
        </Stack>
        <ChatBox color="#ffb5b0" groupId={groupId} chat={chatHistory} />
      </Stack>
    </ChatContainer>
  )
}

export default ChatGroup
