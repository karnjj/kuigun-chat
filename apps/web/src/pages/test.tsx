import { Stack } from '@mui/material'
import ChatRow from './components/ChatRow'

export default function Home() {
  return (
    <>
      <Stack
        width={'500px'}
        display="flex"
        spacing={2}
        sx={{
          direction: 'column',
        }}
      >
        <ChatRow name="haha" isNew={false} isGroup={true} />
        <ChatRow name="Group1" isNew={true} isGroup={false} />
        <ChatRow name="Alaska" isNew={false} isGroup={true} members={1} />
      </Stack>
    </>
  )
}
