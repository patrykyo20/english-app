import Image from "next/image";
import Button from "./Button";
import { FC } from "react";
import Quiz from "@/types/quiz";
import Link from "next/link";

interface QuizCardProps {
  quiz: Quiz;
  variant: 'success' | 'during' | 'blocked';
}

const QuizCard: FC<QuizCardProps> = ({  
  quiz,
  variant
}) => {
  const { url, hash } = quiz.attributes.questions.data[0]?.attributes?.image?.data?.attributes?.formats?.thumbnail

  return (
    <article className={`quizCard quizCard--${variant}`}>
      <div className="quizCard__headline">
        <h3 className="typography__title typography__title--card">{quiz.attributes.topic}</h3>
        <h3 className="typography__title typography__title--card">{quiz.id}</h3>
      </div>
      <Image
        src={url || "/desk.jpeg"}
        alt={hash || "QuizImage"}
        width={200}
        height={200}
        className="quizCard__image"
      />
      <p className="quizCard__description typography__paragraph--light">
        {quiz.attributes.description}
      </p>
      {variant === 'success' || variant === 'during' ?  
        <Link href={`quizzes/${quiz.id}`}>
          <Button variant={'light'} title={"Go to quiz"} className="quizCard__button" />
        </Link>
      :         
        <Button variant={'light'} title={"Quiz is blocked"} className="quizCard__button" disabled />
      }
    </article>
  );
};

export default QuizCard;