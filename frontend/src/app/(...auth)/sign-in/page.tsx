'use client'

import Button from "@/components/ui/Button";
import FormField from "@/components/ui/FormField";
import Modal from "@/components/ui/Modal";
import { useUserContext } from "@/context/userProvider";
import useAuth from '@/utils/auth'; 
import debounce from "@/utils/debounce";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

const SignIn = () => {
  const { user } = useUserContext();
  const { auth, error, success } = useAuth();
  const router = useRouter();

  const [authData, setAuthData] = useState({
    email: '',
    password: '',
  });

  const [emptyData, setEmptyData] = useState({
    email: false,
    password: false,
  });

  useEffect(() => {
    if (user) {
      router.push(`/user-page/${user.data.id}`);
    }
  
    if (success) {
      debounce(() => router.push(`/user-page/${user.data.id}`), 3000)();
    }
  }, [router, success, user]);

  const validateFormData = () => {
    const errors = {
      email: authData.email === '',
      password: authData.password === '',
    };

    setEmptyData(errors);

    if (errors.email || errors.password) {
      debounce(() => setEmptyData({ email: false, password: false }), 3000)();
    }

    return !errors.email && !errors.password;
  };

  const handleFormSubmit = async (
    e: FormEvent<HTMLFormElement>,
    type: 'login' | 'register'
  ) => {
    e.preventDefault();

    if (validateFormData()) {
      await auth(type, authData);
    }
  };

  return (
    <main className="login">
      {success && <Modal variant={"success"} title={"Successfully logged in"} />}
      {error && <Modal variant={"danger"} title={"Invalid email or password"} />}
      {emptyData.email && <Modal variant={"danger"} title={"Please enter the email"} />}
      {emptyData.password && <Modal variant={"danger"} title={"Please enter the password"} />}
  
      <form className="login__form" onSubmit={(e) => handleFormSubmit(e, 'login')}>
        <h1 className="typography__title typography__title--primary">Login</h1>
        <FormField
          title={"Email"}
          type={"email"}
          placeholder={"Email"}
          value={authData.email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setAuthData({ ...authData, email: e.target.value })}
        />
        <FormField
          title={"Password"}
          type={"password"}
          placeholder={"Password"}
          value={authData.password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setAuthData({ ...authData, password: e.target.value })}
        />
        <Button title={"Submit"} type={"submit"} />
      </form>
    </main>
  );
}

export default SignIn;
