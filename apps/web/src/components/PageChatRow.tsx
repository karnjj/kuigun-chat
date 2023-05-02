import { useListenGroupOnlineCount } from '@/queries/useGroup'
import CircleIcon from '@mui/icons-material/Circle'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { Box, Stack, Typography } from '@mui/material'

interface PageChatRowProps {
  name: string
  isNew: boolean
  lastActive?: Date
  isGroup: boolean
  groupId?: string
  members?: number
  onClick?: () => void
}

const PageChatRow = ({ name, isNew, isGroup, groupId, members, onClick }: PageChatRowProps) => {
  const num_members = members == undefined ? 0 : members
  return (
    <>
      <Box
        display="flex"
        width={'100%'}
        bgcolor="secondary.dark"
        borderRadius="8px"
        padding="12px"
        onClick={onClick}
        sx={{
          cursor: 'pointer',
        }}
      >
        <Stack spacing={2} direction={'row'} alignItems="center" width="100%">
          <Typography variant="h4" align="center" sx={{ color: 'text.secondary' }}>
            {name}
          </Typography>

          <Box width="100%" />
          {isNew ? <CircleIcon sx={{ color: 'yellow' }} fontSize="small" /> : null}

          {isGroup && groupId ? <OnlineBadge num_members={num_members} groupId={groupId} /> : null}
          <NavigateNextIcon sx={{ color: 'text.secondary' }} />
        </Stack>
      </Box>
    </>
  )
}

export default PageChatRow

interface OnlineBadgeProps {
  num_members: number
  groupId: string
}

const OnlineBadge = ({ num_members, groupId }: OnlineBadgeProps) => {
  const updated_num = useListenGroupOnlineCount(groupId, num_members)
  return (
    <Box display="flex" borderRadius="8px" padding="4px 8px" bgcolor="badge.lime">
      <Typography width="100%" variant="h6" align="center" sx={{ color: 'black' }}>
        Online:{updated_num ?? num_members}
      </Typography>
    </Box>
  )
}
