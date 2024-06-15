'use client'

import { signIn } from "@/api/authentication";
import Button from "@/components/ui/Button";
import FormField from "@/components/ui/FormField";
import { useUserContext } from "@/context/userProvider";
import { ChangeEvent, useState } from "react";

const SignIn = () => {
  const { setUser, setToken } = useUserContext();

  const [authData, setAuthData] = useState({
    email: '',
    password: '',
  });


  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await signIn(authData);
      if (response.jwt && response.user) {
        setToken(response.jwt);
        setUser(response.user);
      } else {
        throw new Error('Invalid response structure');
      }
    } catch (error) {
      console.error('Error during sign-in:', error);
    }
  };

  return (
    <main className="login">
      <form className="login__form" onSubmit={handleFormSubmit}>
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