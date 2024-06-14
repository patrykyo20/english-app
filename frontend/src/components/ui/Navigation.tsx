import Link from "next/link"
import navigation from "@/data/navigation";
import { FC } from "react";

interface NavigationProps {
  variant: 'dark' | 'light'
}

const Navigation: FC<NavigationProps> = ({ variant }) => {
  return (
    <nav className="navigation">
      <Link href={"/"}>
        <p className={`typography__paragraph typography__paragraph--logo ${variant === 'light' && 'typography__paragraph--light'}`}>English.io</p>
      </Link>
      <ul className="navigation__list">
        {navigation.map((navigate) => (
          <li key={navigate.link}>
            <Link href={navigate.link} className={`typography__navigation ${variant === 'light' && 'typography__navigation--light'}`}>
              {navigate.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
    )
  }

  export default Navigation;