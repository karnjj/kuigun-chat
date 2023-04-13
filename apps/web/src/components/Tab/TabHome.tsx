import { Box, Stack, Tab, TabProps, Tabs, Typography, withStyles } from '@mui/material'
import { useRouter } from 'next/router'
import { useState } from 'react'
import TabPanel from './TabPanel'
import PageChatRow from '../PageChatRow'
import GroupTab from './GroupTab'

const MyTab = ({ label, sx, ...props }: TabProps) => {
  return (
    <Tab
      label={
        <Typography color="text.primary" variant="h3">
          {label}
        </Typography>
      }
      sx={{
        borderRadius: '8px 8px 0px 0px',
        bgcolor: 'primary.main',
        '&.Mui-selected': {
          bgcolor: 'background.paper',
        },
      }}
      {...props}
    />
  )
}
// { userId }: TabHome
const TabHome = () => {
  const [value, setValue] = useState(0)
  return (
    <Box sx={{ width: '100%', height: '450px' }}>
      <Tabs
        value={value}
        onChange={(_event, newValue) => setValue(newValue)}
        variant="fullWidth"
        TabIndicatorProps={{
          sx: { display: 'none' },
        }}
      >
        <MyTab label="People" value={0} />
        <MyTab label="Group" value={1} />
      </Tabs>
      <TabPanel index={0} value={value}>
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
      </TabPanel>
      <TabPanel index={1} value={value}>
        <Box px={1.5} py={1.5} sx={{ bgcolor: 'background.paper' }}>
          <Stack
            width={'100%'}
            display="flex"
            spacing={2}
            sx={{
              direction: 'column',
            }}
          >
            <PageChatRow name="Group1" isNew={false} isGroup={true} members={7} />
            <PageChatRow name="Group2" isNew={true} isGroup={true} members={3} />
            <PageChatRow name="Group3" isNew={false} isGroup={true} members={1} />
            <GroupTab />
          </Stack>
        </Box>
      </TabPanel>
    </Box>
  )
}

export default TabHome
