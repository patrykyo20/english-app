'use client';

import Link from "next/link";
import Button from "../ui/Button";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import Navigation from "../ui/Navigation";
import { useUserContext } from "@/context/userProvider";

interface HeaderProps {
  burgerOption?: 'menu' | 'header';
}

const Header: FC<HeaderProps> = ({ burgerOption = 'menu' }) => {
  const { user } = useUserContext();
  const [client, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);

  return (
    <header className="header" id="header">
      <Navigation variant={"dark"} />
      <div className="navigation__login">
        {client && user ? (
          <Link href={`/user-page/${user.data.id}`}>
            <Image
              src={user.data?.image.formats.medium.url || '/avatar.svg'}
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
      <a
        className="navigation__menu"
        href={`#${burgerOption}`}
      >
        <Image
          src={"icon-menu.svg"}
          alt={"menu"}
          width={35}
          height={35}
        />
      </a>
    </header>
  );
};

export default Header;
