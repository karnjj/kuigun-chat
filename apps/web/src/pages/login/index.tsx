import { useSession } from '@/contexts/sessionContext'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/router'
import * as React from 'react'

export default function LogIn() {
  const router = useRouter()
  const { login } = useSession()
  const [nickName, setNickName] = React.useState('')
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickName(event.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!nickName) return
    login(nickName)
    router.push('/home')
  }

  return (
    <>
      <Stack sx={{ flex: 1 }} spacing={2} direction="column" justifyContent="center" alignItems="center">
        <Typography variant="h1">Nickname</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            onChange={handleChange}
            required
            hiddenLabel
            fullWidth
            id="nickname"
            value={nickName}
            variant="outlined"
            autoFocus
            sx={{ background: 'white' }}
            InputLabelProps={{ disableAnimation: true, style: { color: 'gray' }, shrink: false }}
            placeholder="Fill your nickname"
            InputProps={{
              sx: {
                '& input': {
                  textAlign: 'center',
                },
              },
            }}
          />

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, backgroundColor: 'primary.main' }}>
            Join
          </Button>
        </form>
      </Stack>
    </>
  )
}
