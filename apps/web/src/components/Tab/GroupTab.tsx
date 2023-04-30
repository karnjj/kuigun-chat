import { Box, Stack } from '@mui/material'
import GroupBar from '../GroupBar'
import PageChatRow from '../PageChatRow'
import { useAllGroups, useNewGroupMessageArrived } from '@/queries/useGroup'
import { useRouter } from 'next/router'
import { ComponentProps, useEffect, useState } from 'react'
import useLocalStorage from '@/hooks/useLocalStorage'

const GroupTab = () => {
  const router = useRouter()
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
          <GroupChatRow
            key={idx}
            name={group.name}
            isNew={false}
            lastActive={group.lastActive}
            isGroup={true}
            groupId={group.id}
            members={group.onlineCount}
            onClick={() => router.push(`/chat/group/${group.id}`)}
          />
        ))}
        <GroupBar />
      </Stack>
    </Box>
  )
}

export default GroupTab

const GroupChatRow = (props: ComponentProps<typeof PageChatRow>) => {
  const newMessage = useNewGroupMessageArrived(props.groupId!)
  const [isNew, setIsNew] = useState(props.isNew || false)
  const [readTime] = useLocalStorage('read-time', {})

  useEffect(() => {
    if (!props.groupId) return
    if (!readTime[props.groupId] && props.lastActive) {
      setIsNew(true)
    } else if (readTime[props.groupId] && props.lastActive) {
      setIsNew(readTime[props.groupId] < props.lastActive)
    }
  }, [props.groupId, props.lastActive])

  useEffect(() => {
    if (!props.groupId) return
    if (!readTime[props.groupId] && newMessage) {
      setIsNew(true)
    } else if (readTime[props.groupId] && newMessage) {
      setIsNew(readTime[props.groupId] < newMessage.sendAt)
    }
  }, [newMessage, props.groupId])

  return <PageChatRow {...props} isNew={isNew} />
}
