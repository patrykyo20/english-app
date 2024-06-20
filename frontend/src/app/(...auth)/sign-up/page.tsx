'use client'

import Button from "@/components/ui/Button";
import FormField from "@/components/ui/FormField";
import Modal from "@/components/ui/Modal";
import { useUserContext } from "@/context/userProvider";
import useAuth from '@/utils/auth'; 
import debounce from "@/utils/debounce";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

const SignUp = () => {
  const { auth, error, success } = useAuth();
  const { user } = useUserContext();
  const router = useRouter();

  const [authData, setAuthData] = useState({
    username: '', 
    email: '',
    password: '',
  });

  const [emptyData, setEmptyData] = useState({
    username: false,
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
      username: authData.email === '',
      email: authData.password === '',
      password: authData.password === '',
    };

    // TODO:
    // should fetch users ane check that user exist

    setEmptyData(errors);

    if (errors.username || errors.email || errors.password) {
      debounce(() => setEmptyData({username: false, email: false, password: false }), 3000)();
    }

    return !errors.username && !errors.email && !errors.password;
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
      {success && <Modal variant={"success"} title={"Successfully sign up"} />}
      {error && <Modal variant={"danger"} title={"Invalid email or password"} />}
      {emptyData.username && <Modal variant={"danger"} title={"Please enter the username"} />}
      {emptyData.email && <Modal variant={"danger"} title={"Please enter the email"} />}
      {emptyData.password && <Modal variant={"danger"} title={"Please enter the password"} />}
    
      <form className="login__form" onSubmit={(e) => handleFormSubmit(e, 'register')}>
        <h1 className="typography__title typography__title--primary">Register</h1>
        <FormField
          title={"Username"}
          type={"text"}
          placeholder={"Username"}
          value={authData.username}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setAuthData({ ...authData, username: e.target.value })}
        />
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
          placeholder={"password"}
          value={authData.password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setAuthData({ ...authData, password: e.target.value })}
        />
        <Button title={"submit"} type={"submit"} />
      </form>
    </main>
  )
}

export default SignUp;