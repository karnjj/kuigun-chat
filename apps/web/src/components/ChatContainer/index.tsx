import { Box, Typography } from '@mui/material'
import { useRouter } from 'next/router'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ChatContainerProps extends React.PropsWithChildren {}

const ChatContainer = ({ children }: ChatContainerProps) => {
  const router = useRouter()
  return (
    <Box width="100%">
      <Box
        bgcolor="background.paper"
        width="fit-content"
        px={4}
        borderRadius="8px 8px 0px 0px"
        onClick={() => router.push('/home')}
        sx={{
          cursor: 'pointer',
        }}
      >
        <Typography variant="h3">{'<'}</Typography>
      </Box>
      <Box p={3.5} bgcolor="background.paper" borderRadius="0px 8px 8px 8px">
        {children}
      </Box>
    </Box>
  )
}

export default ChatContainer
