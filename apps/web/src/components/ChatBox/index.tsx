import { useSession } from '@/contexts/sessionContext'
import { useSendGroupMessage } from '@/queries/useGroup'
import { Box, Button, Stack, TextField, Typography, darken } from '@mui/material'

interface Message {
  sender: string
  sendAt: Date
  message: string
}

interface ChatBoxProps {
  color: string
  groupId: string
  chat?: Message[]
}

const ChatBox = ({ color, chat, groupId }: ChatBoxProps) => {
  const { username } = useSession()
  const [sendMessage] = useSendGroupMessage()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const msg = (e.currentTarget[0] as any).value
    if (!msg) return

    sendMessage({ groupId, message: msg })
    // clear input
    ;(e.currentTarget[0] as any).value = ''
  }

  const handleSayHello = () => {
    sendMessage({ groupId, message: `Hello from ${username}` })
  }

  return (
    <Box>
      <Stack direction="column-reverse" bgcolor="white" height="400px">
        <Stack direction="column-reverse" overflow="auto" p={1} spacing={1}>
          {!chat?.length && <SayHello onClick={handleSayHello} />}
          {chat?.map(({ message, sender }, idx) => {
            return (
              <ChatMessage
                key={idx}
                message={message}
                senderName={sender}
                isSender={sender === username}
                color={color}
              />
            )
          })}
        </Stack>
      </Stack>
      <form onSubmit={handleSubmit}>
        <Stack direction="row" spacing={1} p={1} bgcolor="#f0f0f0">
          <TextField
            size="small"
            fullWidth
            InputProps={{
              sx: {
                bgcolor: 'white',
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            size="small"
            sx={{
              bgcolor: color,
              '&:hover': {
                bgcolor: darken(color, 0.1),
              },
            }}
          >
            <Typography
              variant="h5"
              sx={{
                textTransform: 'none',
              }}
            >
              Send
            </Typography>
          </Button>
        </Stack>
      </form>
    </Box>
  )
}

interface ChatMessageProps {
  message: string
  isSender: boolean
  senderName: string
  color?: string
}

const ChatMessage = ({ message, senderName, isSender, color }: ChatMessageProps) => {
  return (
    <Stack spacing={0.5} alignItems={isSender ? 'end' : 'start'}>
      <Box p={1} bgcolor={color} width="fit-content" borderRadius={'12px'}>
        <Typography variant="h5">{message}</Typography>
      </Box>
      <Typography variant="caption">{`Send by ${senderName}`}</Typography>
    </Stack>
  )
}

interface SayHelloProps {
  onClick?: () => void
}

const SayHello = ({ onClick }: SayHelloProps) => {
  return (
    <Stack alignItems="center">
      <Box
        p={1}
        bgcolor="yellow"
        sx={{
          cursor: 'pointer',
        }}
        onClick={onClick}
      >
        <Typography variant="h5">{'Say Hello!!'}</Typography>
      </Box>
    </Stack>
  )
}

export default ChatBox
