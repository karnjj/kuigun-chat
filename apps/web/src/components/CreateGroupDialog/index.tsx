import { Dialog, Stack, Typography, Button, TextField, Box, darken } from '@mui/material'
import { useState } from 'react'

interface CreateGroupDialogProps {
  show: boolean
  onClose?: () => void
}

const CreateGroupDialog = ({ show, onClose }: CreateGroupDialogProps) => {
  const colors = ['#FCDDEC', '#B6FFD3', '#ADDEFA']
  const [selectedColor, setSelectedColor] = useState<string>()
  return (
    <Dialog
      open={show}
      onClose={onClose}
      maxWidth="xs"
      PaperProps={{
        sx: {
          bgcolor: 'secondary.main',
          borderRadius: '24px',
          width: '100%',
        },
      }}
      // color='secondary.main'
    >
      <Stack direction="column" justifyContent="space-between" alignItems="center" spacing={2} sx={{ p: 2 }}>
        <Typography>{"Room's Name"}</Typography>
        <TextField
          size="small"
          fullWidth
          placeholder="Fill room ID"
          InputProps={{
            sx: {
              bgcolor: 'white',
            },
          }}
        />{' '}
        <Stack direction="row" justifyContent="space-around" alignItems="center" spacing={1}>
          <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
            {colors.map((color) => (
              <ColorDot
                key={color}
                color={color}
                selected={selectedColor === color}
                onClick={() => setSelectedColor(color)}
              />
            ))}
          </Stack>
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
            <Typography>Create</Typography>
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  )
}

export default CreateGroupDialog

interface ColorDotProps {
  color: string
  selected?: boolean
  onClick?: () => void
}

const ColorDot = ({ color, selected, onClick }: ColorDotProps) => {
  return (
    <Box
      sx={{ cursor: 'pointer' }}
      width="24px"
      height="24px"
      onClick={onClick}
      bgcolor={color}
      borderRadius="50%"
      border={selected ? '2px solid #000' : 'none'}
    />
  )
}
