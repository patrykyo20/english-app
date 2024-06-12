import Link from "next/link";

const Header = () => {
  return (
    <header className="header">
      <nav className="navigation">
        <ul className="navigation__list">
          <li className="typography__paragraph typography__paragraph--logo">English.io</li>
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
      <button></button>
    </header>
  )
};

export default Header;