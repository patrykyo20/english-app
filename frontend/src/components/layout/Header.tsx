import Link from "next/link";
import Button from "../ui/Button";
import Image from "next/image";
import { FC } from "react";
import Navigation from "../ui/Navigation";

interface HeaderProps {
  burgerOption?: 'menu' | 'header';
}

const Header: FC<HeaderProps> = ({ burgerOption = 'menu' }) => {
  return (
    <header className="header" id="header">
      <Navigation variant={"dark"} />
      <div className="navigation__login">
        <Link href='/login'>
          <Button title={"Login"} />
        </Link>
        <Link href='/login'>
          <Button title={"Sign Up"} />
        </Link>
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
  )
};

export default Header;