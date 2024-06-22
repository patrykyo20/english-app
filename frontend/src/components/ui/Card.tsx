import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface CardProps {
  variant: 'quiz' | 'sentences' | 'grammar';
  description: string;
  link?: 'quizzes'
}

const Card: FC<CardProps> = ({
  variant,
  description,
  link,
}) => {
  return (
    <article
      className={
        `card card--${variant}
      `}
    >
      <Image
        src={`/${variant}.svg`}
        alt={`${variant}`}
        width={150}
        height={150}
        className="card__image"
      />
      <h3 className="typography__paragraph--button typography__title--card card__title">{variant}</h3>
      <p className="typography__paragraph--card typography--center card__paragraph">
        {description}
      </p>
      <Link
        href={link ? `/${link}` : `/${variant}`}
        className="typography__paragraph--button card__link"
      >
        Learn More &#8594;
      </Link>
    </article>
  );
};

export default Card;