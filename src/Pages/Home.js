import { React, useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Paper,
  Box,
  Grid,
  Typography,
  // TextField,
  // Alert,
  // Button,
  // Autocomplete,
} from '@mui/material';
import { BarChart, PieChart } from '@mui/x-charts';

function Home() {
  const [data, setData] = useState([0, 0, 0, 0, 0, 0, 0]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://www.myapiproject.runasp.net/api/Analytic/Get/dailyProjects',
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

  return (
    <Container>
      <Paper>
        <Box px={3} py={2}>
          <Typography variant="h2" align="center" margin="dense">
            Welcome
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12}>
              <Typography variant="h5" align="center" margin="dense">
                Your daily and week statuses are:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" component="h2" align="center">
                Dailey New Projects
              </Typography>
              <BarChart
                xAxis={[
                  {
                    scaleType: 'band',
                    data: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'],
                  },
                ]}
                series={[{ data }]}
                width={500}
                height={300}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <PieChart
                series={[
                  {
                    data: [
                      { id: 0, value: 10, label: 'series A' },
                      { id: 1, value: 15, label: 'series B' },
                      { id: 2, value: 20, label: 'series C' },
                    ],
                  },
                ]}
                width={400}
                height={200}
              />
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}

export default Home;
