import axios from 'axios';

const authaticate = (data) => {
  const requestOrder = axios({
    method: 'post',
    url: 'https://myapiapplication-live.premiumasp.net/api/User/token',
    // url: 'https://localhost:44301/api/User/token',
    data, // you are sending body instead
    headers: {
      // 'Authorization': `bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': '*/*'
    },
  });

  return requestOrder;
};

export default authaticate;
