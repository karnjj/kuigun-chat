import { Box, Stack } from '@mui/material'
import PageChatRow from '../PageChatRow'

const PeopleTab = () => {
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
        <PageChatRow name="Non01" isNew={false} isGroup={false} />
        <PageChatRow name="Non02" isNew={true} isGroup={false} />
        <PageChatRow name="Non03" isNew={false} isGroup={false} />
      </Stack>
    </Box>
  )
}

export default PeopleTab
