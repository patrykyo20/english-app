import axios from "axios";

const URL = 'http://localhost:1337/api/';
const TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN;

export const upload = async (file: File) => {
  const formData = new FormData();
  formData.append('files', file);

  try {
    const response = await axios.post(URL + 'upload', formData, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'multipart/form-data'
      },
    });

    return response;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

