import { Box, Stack } from '@mui/material'
import PageChatRow from '../PageChatRow'
import { useNewMessageArrived, useOnlinePeople } from '@/queries/usePeople'
import { useSession } from '@/contexts/sessionContext'
import { useRouter } from 'next/router'
import { ComponentProps, useEffect, useState } from 'react'
import useLocalStorage from '@/hooks/useLocalStorage'

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
            person.username !== username && (
              <PeopleChatRow
                key={idx}
                name={person.username}
                lastActive={person.lastActive}
                isNew={false}
                isGroup={false}
                onClick={() => {
                  router.push(`/chat/with/${person.username}`)
                }}
              />
            )
        )}
      </Stack>
    </Box>
  )
}

export default PeopleTab

const PeopleChatRow = (props: ComponentProps<typeof PageChatRow>) => {
  const newMessage = useNewMessageArrived(props.name)
  const [isNew, setIsNew] = useState(props.isNew || false)
  const [readTime] = useLocalStorage('read-time', {})

  useEffect(() => {
    if (!readTime[props.name] && props.lastActive) {
      setIsNew(true)
    } else if (readTime[props.name] && props.lastActive) {
      setIsNew(readTime[props.name] < props.lastActive)
    }
  }, [props.name, props.lastActive])

  useEffect(() => {
    if (!readTime[props.name] && newMessage) {
      setIsNew(true)
    } else if (readTime[props.name] && newMessage) {
      setIsNew(readTime[props.name] < newMessage.sendAt)
    }
  }, [newMessage])

  return <PageChatRow {...props} isNew={isNew} />
}
