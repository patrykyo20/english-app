import { useUserContext } from "@/context/userProvider";
import { useState } from "react";
import debounce from './debounce';
import { useRouter } from 'next/navigation';

const useLogout = () => {
  const { setToken, setUser } = useUserContext();
  const [ successLogout, setSuccessLogout ] = useState<boolean>(false);
  const router = useRouter();

  const logout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSuccessLogout(true);

    debounce(() => {
      router.push(`/`);
    }, 2000)();

    debounce(() => {
      setToken(null);
      setUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setSuccessLogout(false);
    }, 3000)();
  };

  return { logout, successLogout };
};

export default useLogout;
