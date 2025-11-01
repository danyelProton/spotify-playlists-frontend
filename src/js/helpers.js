import { TIMEOUT_SEC } from './config.js';


export const fetchData = async (url, method = 'GET') => {
  try {
  const apiRequest = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const res = await Promise.race([apiRequest, timeout(TIMEOUT_SEC)]);
  // console.log(res);
  if (!res.ok) throw new Error(`${data.message} (${res.status})`);

  const data = await res.json();
  // console.log(data);

  return JSON.parse(data.data);
  } catch(err) {
  throw err;
  }
};




const timeout = sec => {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error(`Request took too long. Timeout afer ${sec} seconds.`)), sec * 1000);
  });
};