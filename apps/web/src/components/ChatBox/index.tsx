import { Box, Button, Stack, TextField, Typography, darken } from '@mui/material'

const mockChat = Array.from({ length: 10 }).map((_, index) => {
  return {
    message: `${index}`.repeat(4),
    senderName: `${index}`,
  }
})
const mockUserName = 'username'

interface ChatBoxProps {
  color: string
}

const ChatBox = ({ color }: ChatBoxProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const msg = (e.currentTarget[0] as any).value
    if (!msg) return

    // TODO: send message to server
    console.log(msg)
    mockChat.push({
      message: msg,
      senderName: mockUserName,
    })

    // clear input
    ;(e.currentTarget[0] as any).value = ''
  }

  const handleSayHello = () => {
    //TODO: send hello message to server
    console.log('say hello')
  }

  return (
    <Box>
      <Stack direction="column-reverse" bgcolor="white" height="400px">
        <Stack direction="column-reverse" overflow="auto" p={1} spacing={1}>
          {!mockChat?.length && <SayHello onClick={handleSayHello} />}
          {mockChat.map(({ message, senderName }, idx) => {
            return (
              <ChatMessage
                key={idx}
                message={message}
                senderName={senderName}
                isSender={senderName === mockUserName}
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
