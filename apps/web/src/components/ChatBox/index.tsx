import { useSession } from '@/contexts/sessionContext'
import { Box, Button, Stack, TextField, Typography, darken } from '@mui/material'

interface Message {
  sender: string
  sendAt: Date
  message: string
}

interface ChatBoxProps {
  color: string
  chat?: Message[]
  sendMsg?: (msg: string) => void
}

const ChatBox = ({ color, chat, sendMsg }: ChatBoxProps) => {
  const { username } = useSession()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const msg = (e.currentTarget[0] as any).value
    if (!msg) return

    sendMsg?.(msg)
    // clear input
    ;(e.currentTarget[0] as any).value = ''
  }

  const handleSayHello = () => {
    sendMsg?.(`Hello from ${username}`)
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
      <Box p={1} bgcolor={color} width="fit-content" borderRadius={'12px'} maxWidth="100%">
        <Typography variant="h5" sx={{ wordBreak: 'break-word' }}>
          {message}
        </Typography>
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
