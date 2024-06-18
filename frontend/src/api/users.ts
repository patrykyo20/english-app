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
