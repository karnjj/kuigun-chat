import { Box, Tab, TabProps, Tabs, Typography } from '@mui/material'
import { useState } from 'react'
import GroupTab from './GroupTab'
import PeopleTab from './PeopleTab'
import TabPanel from './TabPanel'

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
        <PeopleTab />
      </TabPanel>
      <TabPanel index={1} value={value}>
        <GroupTab />
      </TabPanel>
    </Box>
  )
}

export default TabHome

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
