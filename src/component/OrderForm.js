import axios from 'axios';

const getRequest = (data, call) => {
  const request = axios({
    method: 'get',
    url: 'https://localhost:44301/api/Order/Add/Order',
    data, // you are sending body instead
    headers: {
      // 'Authorization': `bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  return request;
};

export default getRequest;
