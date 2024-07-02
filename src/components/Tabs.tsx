import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

export interface Tab {
  name: string;
  icon: React.ElementType;
  component: React.ReactElement;
}

interface Props {
  tabs: Tab[];
}

const Tabs = ({ tabs }: Props) => {
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="Marvel Characters List">
            {tabs.map((tab, index) => (
              <Tab
                key={index}
                icon={<tab.icon />}
                label={tab.name}
                value={index.toString()}
                sx={{ minWidth: 120 }}
              />
            ))}
          </TabList>
        </Box>
        {tabs.map((tab, index) => (
          <TabPanel key={index} value={index.toString()}>
            {tab.component}
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
};

export default Tabs;
