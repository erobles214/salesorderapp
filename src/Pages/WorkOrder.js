/* eslint-disable react/no-unescaped-entities */
import React from 'react';

// import Container from '@mui/material/Container';
// // import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import { Paper, Typography } from '@mui/material';
import CrudTable from '../component/CrudTable';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';

function WorkOrder(props) {
  return <CrudTable data={props} />;
}

export default WorkOrder;
