import { Stack } from '@mui/material'
import PageChatRow from '@/components/PageChatRow'

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
        <PageChatRow name="haha" isNew={false} isGroup={true} />
        <PageChatRow name="Group1" isNew={true} isGroup={false} />
        <PageChatRow name="Alaska" isNew={false} isGroup={true} members={1} />
      </Stack>
    </>
  )
}
