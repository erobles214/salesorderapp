// import * as React from 'react';
// import Alert from '@mui/material/Alert';
// import AlertTitle from '@mui/material/AlertTitle';
// import Stack from '@mui/material/Stack';
import axios from 'axios';

const postRequest = (data, call) => {
  // eslint-disable-next-line default-case
  switch (call) {
    case 'PostOrder':
      // eslint-disable-next-line no-case-declarations
      const requestOrder = axios({
        method: 'post',
        url: 'https://myapiapplication-live.premiumasp.net/api/Order/Add/Order',
        // url: 'https://localhost:44301/api/Order/Add/Order',
        data, // you are sending body instead
        headers: {
          // 'Authorization': `bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': '*/*'
        },
      });
      return requestOrder;
    case 'PostMaterial':
      // eslint-disable-next-line no-case-declarations
      const requestMaterial = axios({
        method: 'post',
        url: 'https://myapiapplication-live.premiumasp.net/api/Order/Add/Materials',
        // url: 'https://localhost:44301/api/Order/Add/Materials',
        data, // you are sending body instead
        headers: {
          // 'Authorization': `bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': '*/*'
        },
      });
      return requestMaterial;
    case 'PostLabor':
      // eslint-disable-next-line no-case-declarations
      const requestLabor = axios({
        method: 'post',
        url: 'https://myapiapplication-live.premiumasp.net/api/Order/Add/Labor',
        // url: 'https://localhost:44301/api/Order/Add/Labor',
        data, // you are sending body instead
        headers: {
          // 'Authorization': `bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': '*/*'
        },
      });
        return requestLabor;
      case 'PostUpdtUser':
        const requestUserUpdate = axios({
          method: 'post',
          url: 'https://myapiapplication-live.premiumasp.net/api/User/UpdateUsers',
          data,
          headers: {
            'Content-Type': 'application/json',   
            'Accept': '*/*'
          }, 
        });
        return requestUserUpdate;
      case 'PostUpdtInv':
        const requestInvUpdate = axios({
          method: 'post',
          url: 'https://myapiapplication-live.premiumasp.net/api/Inventory/UpdateInventory',
          data,
          headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*'
          },
        });
        return requestInvUpdate;
      case 'PostUpdtWrkOrd':
        const requestUpdtWrkOrd = axios({
          method: 'post',
          url: 'https://myapiapplication-live.premiumasp.net/api/Order/UpdateWorkOrder',
          data,
          headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*'
          },
        });
        return requestUpdtWrkOrd;

  }
  // if (call === 'PostOrder') {
  //   const request = axios({
  //     method: 'post',
  //     url: 'https://localhost:44301/api/Order/Add/Order',
  //     data, // you are sending body instead
  //     headers: {
  //       // 'Authorization': `bearer ${token}`,
  //       'Content-Type': 'application/json',
  //     },
  //   });

  //   return request;
  // }
};

export default postRequest;
