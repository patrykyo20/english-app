'use client';

import Header from "./Header";
import Link from "next/link";
import Button from "../ui/Button";
import Image from "next/image";
import { useUserContext } from "@/context/userProvider";
import { useState, useEffect } from "react";

const Menu = () => {
  const { user } = useUserContext();
  const [ client, setClient ] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);

  return (
    <div className="menu" id="menu">
      <Header burgerOption="header" />
      <ul className="navigation__mobile">
        <li>
          <Link href="#"  className="typography__navigation">
            About Us
          </Link>
        </li>
        <li>
          <Link href="#" className="typography__navigation">
            Contact
          </Link>
        </li>
      </ul>
      <div className="navigation__mobile--login">
        {client && user ? (
          <Link href={`/user-page/${user.data.id}`}>
            <Image
              src={user.data?.url || '/avatar.svg'}
              alt="avatar"
              height={50}
              width={50}
              className="user--avatar"
            />
          </Link>
        ) : (
          <>
            <Link href='/sign-in'>
              <Button title={"Login"} />
            </Link>
            <Link href='/sign-up'>
              <Button title={"Sign Up"} />
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Menu;