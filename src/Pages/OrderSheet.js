import { React, useState, useEffect } from 'react';
import Container from '@mui/material/Container';
// import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import Tabs from '@mui/joy/Tabs';
import TabPanel from '@mui/joy/TabPanel';
import Orders from './Orders';
import WorkOrder from './WorkOrder';
import Material from './Material';
import Labor from './Labor';
import Box from '@mui/material/Box';
import { Paper, Typography, Button } from '@mui/material';
import axios from 'axios';

function MaterialDetailsForm() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [data, setData] = useState();
  const [enabledTab, setEnabledTab] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://localhost:44301/api/Order/Get/WorkOrder',
        ); // Replace with your API endpoint
        setData(response.data);
        sessionStorage.setItem('myData', JSON.stringify(response.data));
      } catch (error) {
        // setError(error);
      } finally {
        // setLoading(false);
      }
    };
    fetchData();
  }, []);


  const handleChange = (event, newValue = 1) => {
      setSelectedTab(newValue);
  };

  const handleBack = (event, newValue = 0) => {
    setSelectedTab(newValue);
  };

  const addMaterial = (event, newValue = 2) => {
    setSelectedTab(newValue);
  };

  const addLabor = (event, newValue = 3) => {
    setSelectedTab(newValue);
  };
  // const fetchData = async () => {
  //   axios
  //     .get('https://localhost:44301/api/Order/Get/WorkOrder')
  //     .then((response) => setData([response.data]))
  //     .catch((error) => console.log(error));

  //   // setData([data]);
  //   // Save the data to session storage
  //   sessionStorage.setItem('myData', JSON.stringify(data));
  // };
  return (
    <Container>
      <Tabs
        aria-label="Basic tabs"
        value={selectedTab}
        onChange={(event, newValue) => setSelectedTab(newValue)}
        sx={{ borderRadius: 'lg' }}
      >
        <TabList>
        <Tab value={enabledTab} disabled={enabledTab === null}>Work Order List</Tab>
          <Tab disabled={enabledTab !== 0}>Work Order</Tab>
          <Tab disabled={enabledTab !== 1}>Material</Tab>
          <Tab disabled={enabledTab !== 2}>Labor</Tab>
        </TabList>        
        <TabPanel value={0} sx={{ p: 2 }}>       
           <Paper>
              <Box px={3} py={2}>
                <Typography variant="h6" align="center" margin="dense">
                  Eneter Work Order
                </Typography>{' '}
                <Button onClick={handleChange}>Start Order</Button>
                <WorkOrder data={data} />
              </Box>
            </Paper>
        </TabPanel>
        <TabPanel value={1} sx={{ p: 2 }}>
          <Container>
            <Paper>
              <Box px={3} py={2}>
                <Typography variant="h6" align="center" margin="dense">
                  Eneter Order
                </Typography>
                <Button onClick={handleBack}>Back</Button>
                <Button onClick={addMaterial}>Add New Material</Button>
                <Button onClick={addLabor}>Add New Labor</Button>
                <Orders data={data} />
              </Box>
            </Paper>
          </Container>
        </TabPanel>
        <TabPanel value={2} sx={{ p: 2 }}>
          <Material />
        </TabPanel>
        <TabPanel value={3} sx={{ p: 2 }}>
          <Labor />
        </TabPanel>
        </Tabs>
    </Container>
  );
}
export default MaterialDetailsForm;
