import Header from "./Header";
import Link from "next/link";
import Button from "../ui/Button";

const Menu = () => {
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
        <Link href='/login'>
          <Button title={"Login"} />
        </Link>
        <Link href='/login'>
          <Button title={"Sign Up"} />
        </Link>
      </div>
    </div>
  );
};

export default Menu;