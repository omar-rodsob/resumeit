'use server';

const API_URL = process.env.API_URL;
const api_key = process.env.API_KEY;

type guestObj = {
  email: string;
  token: number;
}

export async  function sendEmail(guestObj: guestObj){
  const requestOptions = {
    method: 'POST',
    headers: { 
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(guestObj),
  };

  return fetch(`${API_URL}/email/`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      return !data.error;
    })
    .catch(async (err) => {
      return false;
    });
}