import { FormEvent } from 'react';
import { signIn, signUp } from '../api/authentication'; 
import { useUserContext } from '@/context/userProvider';

interface AuthData {
  username?: string;
  email: string;
  password: string;
}

const useAuth = () => {
  const { setToken, setUser } = useUserContext();

  const auth = async (
    type: 'login' | 'register', 
    authData: AuthData
  ): Promise<void> => {
    try {
      let response;

      if (type === 'login') {
        response = await signIn(authData);
      } else {
        response = await signUp(authData); 
      }

      if (response[0] && response[1]) {
        setToken(response[1]);
        setUser(response[0]);
      } else {
        throw new Error('Invalid response structure');
      }
    } catch (error) {
      console.error('Error during authentication:', error);
    }
  };

  return { auth };
};

export default useAuth;
