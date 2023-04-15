import { Box, Stack } from '@mui/material'
import GroupBar from '../GroupBar'
import PageChatRow from '../PageChatRow'

const GroupTab = () => {
  return (
    <Box px={1.5} py={1.5} sx={{ bgcolor: 'background.paper' }}>
      <Stack
        width={'100%'}
        display="flex"
        spacing={2}
        sx={{
          direction: 'column',
        }}
      >
        <PageChatRow name="Group1" isNew={false} isGroup={true} members={7} />
        <PageChatRow name="Group2" isNew={true} isGroup={true} members={3} />
        <PageChatRow name="Group3" isNew={false} isGroup={true} members={1} />
        <GroupBar />
      </Stack>
    </Box>
  )
}

export default GroupTab
