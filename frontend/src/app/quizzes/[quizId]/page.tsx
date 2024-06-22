'use client'

import { getQuiz } from "@/api/quizzes";
import { useCallback, useEffect, useState } from "react";
import Quiz, { Answer } from "@/types/quiz";
import QuizAnswer from "@/components/ui/QuizAnswer";
import Image from "next/image";
import debounce from "@/utils/debounce";
import { useUserContext } from "@/context/userProvider";
import { addLevelToUser } from "@/api/users";

const QuizPage = ({ params }: {params: { quizId: number }}) => {
  const quizId = params.quizId;
  const { user } = useUserContext();

  const [quizData, setQuizData] = useState<Quiz | null>(null);
  const [level, setLevel] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<number | null>(null);
  const [points, setPoints] = useState<number>(0);

  const fetchQuiz = useCallback(async () => {
    const quiz = await getQuiz(quizId);
    setQuizData(quiz);
  }, [quizId]);

  const addQuizToUser = async () => {
    try {
      if (quizId > user.quizLevel) {
        await addLevelToUser(user.id, quizId, points);
      }
    } catch (error) {
      console.log(error);
    };
  };

  useEffect(() => {
    fetchQuiz();
  }, [fetchQuiz, quizId]);

  if (!quizData) {
    return <div>Loading</div>;
  };

  const currentQuestion = quizData.attributes.questions.data[level].attributes;
  const answerOptions = currentQuestion.answers;
  const image = currentQuestion.image.data.attributes.formats.medium.url;

  const questionsLength = quizData.attributes.questions.data.length;
  const questionPoints = quizData.attributes.questions.data[level].attributes.points;

  const checkAnswer = (answer: Answer) => {
    setUserAnswer(answer.id);

    const updateStates = () => {
      if (level + 1 < questionsLength) {
        setLevel(level + 1);
      } else {
        addQuizToUser();
      }
    
      setUserAnswer(null); 
      setPoints(points + questionPoints);
    };
  
    debounce(() => updateStates(), 1500)()
  };

  return (
    <section className="quiz">
      <h1 className="typography__title typography__title--primary typography--center">
        {quizData.attributes.topic}
      </h1>
      <p className="typography__paragraph typography--center quiz__question">
        {currentQuestion.question}
      </p>
      <Image
        src={image}
        alt={currentQuestion.question}
        width={400}
        height={400}
        className="quiz__image quiz__image--margin"
      />
      <div className="quiz__answers quiz__answers--margin">
        {answerOptions.map((answer: Answer) => (
          <QuizAnswer
            key={answer.id}
            answer={answer}
            userAnswer={userAnswer}
            onClick={() => checkAnswer(answer)}
          />
        ))}
      </div>
    </section>
  );
};

export default QuizPage;
