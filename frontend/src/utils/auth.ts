import { useState } from 'react';
import { signIn, signUp } from '../api/authentication'; 
import { useUserContext } from '@/context/userProvider';
import debounce from './debounce';

interface AuthData {
  username?: string;
  email: string;
  password: string;
}

const useAuth = () => {
  const { setToken, setUser } = useUserContext();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

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
        setError(false);
        setSuccess(true);
        debounce(() => setSuccess(false), 3000)();
      } else {
        setError(true);
        debounce(() => setError(false), 3000)();
      }
    } catch (error) {
      console.error('Error during authentication:', error);
      setError(true);
      debounce(() => setError(false), 3000)();
    }
  };

  return { auth, error, success };
};

export default useAuth;
