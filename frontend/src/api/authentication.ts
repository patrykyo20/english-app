import axios from 'axios';
import { getUser } from './users';

const URL = 'http://localhost:1337/api/auth/';

export const signIn = async (authData: { email: string; password: string; }) => {
  try {
    const response = await axios.post(URL + 'local', {
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
  authData: {
    username?: string,
    email: string;
    password: string;
  }
) => {
  try {
    const response = await axios.post(URL + 'local/register', {
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

export const changePassword = async (
  currentPassword: string,
  newPassword: string,
  token: string
) => {
  try {
    const response = await axios.post(URL + 'local/password-change', {
      currentPassword: currentPassword,
      newPassword: newPassword,
      confirmPassword: newPassword
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    });

    return response.data;
  } catch (error: any) {
    console.error('Error changing password:', error.response ? error.response.data : error.message);
    throw error;
  };
};