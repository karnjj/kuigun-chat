import ChatBox from '@/components/ChatBox'
import ChatContainer from '@/components/ChatContainer'
import { Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router'

const ChatWith = () => {
  const router = useRouter()
  const chatWith = router.query.nickname as string
  return (
    <ChatContainer>
      <Stack spacing={1}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h5">{`Chat with: ${chatWith}`}</Typography>
          <Typography variant="h5">{`Username: ${'username'}`}</Typography>
        </Stack>
        <ChatBox color="#ffb5b0" />
      </Stack>
    </ChatContainer>
  )
}

export default ChatWith
