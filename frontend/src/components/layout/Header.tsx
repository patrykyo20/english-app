import Link from "next/link";
import Button from "../ui/Button";

const Header = () => {
  return (
    <header className="header">
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
      <ul className="navigation__login">
        <Link href='/login'>
          <Button title={"Login"} />
        </Link>
        <Link href='/login'>
          <Button title={"Sign Up"} />
        </Link>
      </ul>
    </header>
  )
};

export default Header;