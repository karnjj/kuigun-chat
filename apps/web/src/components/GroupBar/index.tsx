import { Stack, Typography, Button, TextField, darken } from '@mui/material'
import { useShow } from '@/hooks/useShow'
import CreateGroupDialog from '../CreateGroupDialog'

const GroupBar = () => {
  const createGroup = useShow()

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
      <CreateGroupDialog show={createGroup.show} onClose={createGroup.onClose} />

      <TextField
        size="small"
        fullWidth
        placeholder="Fill room ID"
        InputProps={{
          sx: {
            bgcolor: 'white',
          },
        }}
      />

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
      >
        <Typography>Join group</Typography>
      </Button>
    </Stack>
  )
}

export default GroupBar
