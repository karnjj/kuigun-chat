import CircleIcon from '@mui/icons-material/Circle'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { Box, Stack, Typography } from '@mui/material'

interface PageChatRowProps {
  name: string
  isNew: boolean
  isGroup: boolean
  members?: number
  onClick?: () => void
}

const PageChatRow = ({ name, isNew, isGroup, members }: PageChatRowProps) => {
  const num_members = members == undefined ? 0 : members
  return (
    <>
      <Box
        display="flex"
        width={'100%'}
        bgcolor="secondary.dark"
        borderRadius="8px"
        padding="12px"
        onClick={() => {
          console.log('Go go')
        }}
        sx={{
          cursor: 'pointer',
        }}
      >
        <Stack spacing={2} direction={'row'} alignItems="center" width="100%">
          <Typography variant="h4" align="center" sx={{ color: 'text.light' }}>
            {name}
          </Typography>

          <Box width="100%" />
          {isNew ? <CircleIcon sx={{ color: 'yellow' }} fontSize="small" /> : null}

          {isGroup ? (
            <>
              <Box display="flex" borderRadius="8px" padding="4px 8px" bgcolor="badge.lime">
                <Typography width="100%" variant="h6" align="center" sx={{ color: 'black' }}>
                  Online:{num_members}
                </Typography>
              </Box>
            </>
          ) : null}
          <NavigateNextIcon />
        </Stack>
      </Box>
    </>
  )
}

export default PageChatRow
