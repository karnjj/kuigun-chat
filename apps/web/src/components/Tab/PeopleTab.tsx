import { Box, Stack } from '@mui/material'
import PageChatRow from '../PageChatRow'
import { useOnlinePeople } from '@/queries/usePeople'
import { useSession } from '@/contexts/sessionContext'

const PeopleTab = () => {
  const { username } = useSession()
  const onlinePeople = useOnlinePeople()
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
        {onlinePeople?.map(
          (person, idx) => person !== username && <PageChatRow key={idx} name={person} isNew={false} isGroup={false} />
        )}
      </Stack>
    </Box>
  )
}

export default PeopleTab
