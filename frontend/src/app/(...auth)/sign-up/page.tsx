'use client'

import Button from "@/components/ui/Button";
import FormField from "@/components/ui/FormField";
import useAuth from '@/utils/auth'; 
import { ChangeEvent, FormEvent, useState } from "react";

const SignIn = () => {
  const { auth } = useAuth();

  const [authData, setAuthData] = useState({
    username: '', 
    email: '',
    password: '',
  });


  const handleFormSubmit = async (
    e: FormEvent<HTMLFormElement>,
    type: 'login' | 'register'
  ) => {
    e.preventDefault();
    auth(type, authData);
  };

  return (
    <main className="login">
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
        <Button title={"submit"} />
      </form>
    </main>
  )
}

export default SignIn;