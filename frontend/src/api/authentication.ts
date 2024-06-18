import axios from 'axios';
import { getUser } from './users';
const URL = 'http://localhost:1337/api/';

export const signIn = async (authData: { email: string; password: string; }) => {
  try {
    const response = await axios.post(URL + 'auth/local', {
      identifier: authData.email,
      password: authData.password,
    })

    const userToken = response.data.jwt;

    const userId = response.data.user.id

    const user = await getUser(userId);

    return [user, userToken];
  } catch (error) {
    console.log(error);
    throw error; 
  };
};

export const signUp = async  (
  authData:
  {
    username?: string,
    email: string;
    password: string;
  }
) => {
  try {
    const response = await axios.post(URL + 'auth/local/register', {
      username: authData.username,
      email: authData.email,
      password: authData.password,
    })

    const userToken = response.data.jwt;

    const userId = response.data.user.id

    const user = await getUser(userId);

    return [user, userToken];
  } catch (error) {
    console.log(error);
    throw error; 
  };
};
