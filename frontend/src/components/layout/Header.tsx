import Link from "next/link";
import Button from "../ui/Button";
import Image from "next/image";
import { FC } from "react";

interface HeaderProps {
  burgerOption?: 'menu' | 'header';
}

const Header: FC<HeaderProps> = ({ burgerOption = 'menu' }) => {
  return (
    <header className="header" id="header">
      <nav className="navigation">
        <p className="typography__paragraph typography__paragraph--logo">English.io</p>
        <ul className="navigation__list">
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
      </nav>
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