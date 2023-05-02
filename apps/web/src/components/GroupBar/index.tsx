import { Stack, Typography, Button, TextField, darken } from '@mui/material'
import { useShow } from '@/hooks/useShow'
import CreateGroupDialog from '../CreateGroupDialog'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useIsGroupExist } from '@/queries/useGroup'

const GroupBar = () => {
  const router = useRouter()
  const createGroup = useShow()
  const [isGroupExist] = useIsGroupExist()
  const [groupId, setGroupId] = useState<string>()

  const handleJoinGroup = async () => {
    if (groupId && (await isGroupExist(groupId))) {
      router.push(`/chat/group/${groupId}`)
    } else {
      alert('Group not found')
    }
  }

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
      <Button
        variant="contained"
        sx={{
          bgcolor: 'primary.dark',
          color: 'primary.light',
          '&:hover': {
            backgroundColor: (theme) => darken(theme.palette.primary.dark, 0.1),
            color: 'primary.light',
          },
        }}
        onClick={createGroup.onShow}
      >
        <Typography>Create group</Typography>
      </Button>
      {createGroup.show && <CreateGroupDialog show={createGroup.show} onClose={createGroup.onClose} />}

      <TextField
        size="small"
        fullWidth
        placeholder="Fill group ID"
        onChange={(e) => setGroupId(e.target.value)}
        InputProps={{
          sx: {
            bgcolor: 'white',
          },
        }}
      />

      <Button
        variant="contained"
        onClick={handleJoinGroup}
        sx={{
          bgcolor: 'primary.dark',
          color: 'primary.light',
          '&:hover': {
            backgroundColor: (theme) => darken(theme.palette.primary.dark, 0.1),
            color: 'primary.light',
          },
        }}
      >
        <Typography>Join group</Typography>
      </Button>
    </Stack>
  )
}

export default GroupBar
