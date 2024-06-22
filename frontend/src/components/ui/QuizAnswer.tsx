import { FC, useCallback, useEffect, useState } from "react";
import { Answer } from "@/types/quiz";

interface QuizAnswerProps {
  answer: Answer;
  onClick: (answer: Answer) => void;
  userAnswer: number | null;
}

const QuizAnswer: FC<QuizAnswerProps> = ({
  answer,
  onClick,
  userAnswer,
}) => {
  const [variant, setVariant] = useState<string>('');

  const checkAnswer = useCallback(() => {
    if (userAnswer === answer.id) {
      if (answer.isAnswer) {
        setVariant('success');
      } else {
        setVariant('danger');
      }
    } else {
      setVariant('');
    };
  }, [answer.id, answer.isAnswer, userAnswer]);

  useEffect(() => {
    checkAnswer()
  }, [userAnswer, answer, checkAnswer]);

  return (
    <article
      className={`quizAnswer quizAnswer--${variant} ${userAnswer && answer.isAnswer ? 'quizAnswer--success' : ''}`}
      onClick={() => onClick(answer)}
    >
      <p className="quizCard__description typography__paragraph">
        {answer.answer}
      </p>
    </article>
  );
};

export default QuizAnswer;
