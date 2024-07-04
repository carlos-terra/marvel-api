import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import * as React from 'react';
import { useState } from 'react';
import { useSearchStore } from '../../store/useSearchStore';

export interface Tab {
  name: string;
  icon: React.ElementType;
  component: React.ReactElement;
}

interface Props {
  tabs: Tab[];
}

const Tabs = ({ tabs }: Props) => {
  const searchType = useSearchStore(s => s.searchType);

  const [selectedTab, setSelectedTab] = useState(
    searchType === 'characters' ? '0' : '1'
  );

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <TabContext value={selectedTab}>
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
