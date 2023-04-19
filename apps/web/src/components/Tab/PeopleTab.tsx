import { Box, Stack } from '@mui/material'
import PageChatRow from '../PageChatRow'
import { useOnlinePeople } from '@/queries/usePeople'
import { useSession } from '@/contexts/sessionContext'
import { useRouter } from 'next/router'

const PeopleTab = () => {
  const router = useRouter()
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
          (person, idx) =>
            person !== username && (
              <PageChatRow
                key={idx}
                name={person}
                isNew={false}
                isGroup={false}
                onClick={() => {
                  router.push(`/chat/with/${person}`)
                }}
              />
            )
        )}
      </Stack>
    </Box>
  )
}

export default PeopleTab
