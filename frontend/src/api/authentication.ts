import axios from 'axios';

const config = {
  headers: {
    'Authorization': 'Bearer 3950a7f9fa2615a23ecf25387f31482554966248ecada56d301b72e8da058ae358a6b824b67f740d6b9c8d1b87b82197d71db3fcf0f8b7e0f32fa7ba230e49ef51a633bfdba5df353478b91d1799899737edc964c4fb11c9a1756b94036ad93c159a4ea6ce55f5733b6f6b8c05346a83c90b7ba619741fa96b5d336870b72fcc'
  }
}

const URL = 'http://localhost:1337/api/';

export const signIn = async (authData: { email: string; password: string; }) => {
  try {
    const response = await axios.post(URL + 'auth/local', {
      identifier: authData.email,
      password: authData.password,
    })

    console.log(response)

    return response.data;
  } catch (error) {
    console.log(error);
    throw error; 
  }
}

