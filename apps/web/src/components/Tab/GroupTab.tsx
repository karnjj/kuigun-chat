import { Box, Stack } from '@mui/material'
import GroupBar from '../GroupBar'
import PageChatRow from '../PageChatRow'
import { useAllGroups } from '@/queries/useGroup'

const GroupTab = () => {
  const allGroups = useAllGroups()
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
        {allGroups?.map((group, idx) => (
          <PageChatRow key={idx} name={group.name} isNew={false} isGroup={true} members={group.onlineCount} />
        ))}
        <GroupBar />
      </Stack>
    </Box>
  )
}

export default GroupTab
