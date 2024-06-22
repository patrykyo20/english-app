import axios from "axios";

const URL = 'http://localhost:1337/api/quizzes';
const TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN;

export const getQuizzes = async () => {
  try {
    const response = await axios.get(URL + '?populate[questions][populate]=*&sort=id:asc', {
      headers: {
        Authorization: `Bearer ${TOKEN}`
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error getting quizzes:', error);
    throw error;
  };
};

export const getQuiz = async (id: number) => {
  try {
    const response = await axios.get(URL + `/${id}` + '?populate[questions][populate]=*&sort=id:asc', {
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    });
    
    return response.data.data;
  } catch (error) {
    console.error('Error getting quiz:', error);
    throw error;
  }
}