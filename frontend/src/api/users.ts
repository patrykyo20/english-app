import User from "@/types/user";
import axios from "axios";

const URL = 'http://localhost:1337/api/';
const TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN

export const getUser = async (id: number) => {
  try {
    const response = await axios.get(URL + 'users/' + id + '?populate=*',  {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
  
    return response;
  } catch (error) {
    console.log(error);
    throw error; 
  };
};

export const updateUser = async (id: number, userData: User) => {
  console.log(userData)
  try {
    const response = await axios.put(URL + 'users/' + id, {
      username: userData.username,
      email: userData.email,
      description: userData.description,
      url: userData.url,
    }, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};