'use client'

import { getQuiz } from "@/api/quizzes";
import { useCallback, useEffect, useState } from "react";
import Quiz, { Answer } from "@/types/quiz";
import QuizAnswer from "@/components/ui/QuizAnswer";
import Image from "next/image";
import debounce from "@/utils/debounce";
import { useUserContext } from "@/context/userProvider";
import { addLevelToUser } from "@/api/users";
import { useRouter } from "next/navigation";
import Skeleton from "@/components/ui/Skeleton";

const QuizPage = ({ params }: {params: { quizId: number }}) => {
  const quizId = params.quizId;
  const { user } = useUserContext();
  const router = useRouter();

  const [quizData, setQuizData] = useState<Quiz | null>(null);
  const [level, setLevel] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<number | null>(null);
  const [points, setPoints] = useState(0);
  const [endScenario, setEndScenario] = useState<boolean>(false);

  const fetchQuiz = useCallback(async () => {
    const quiz = await getQuiz(quizId);
    debounce(() => setQuizData(quiz), 1000)();
  }, [quizId]);

  const addQuizToUser = async (points: number) => {
    console.log('points', points);
    try {
      if (user.points) {
        if (quizId < user.quizLevel) {
          await addLevelToUser(user.data.id, quizId, user.data.points);
        };

        debounce(() => router.push('/quizzes'), 1500);
      } else {
        await addLevelToUser(user.data.id, quizId, user.data.points + points);
      };
    } catch (error) {
      console.log(error);
    } finally {
      
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, [fetchQuiz, level, quizId]);

  const currentQuestion = quizData?.attributes.questions.data[level].attributes;
  const answerOptions = currentQuestion?.answers;
  const image = currentQuestion?.image.data.attributes.formats.medium.url;

  const questionsLength = quizData?.attributes.questions.data.length;
  const questionPoints = quizData?.attributes.questions.data[level].attributes.points;

  const checkAnswer = (answer: Answer) => {
    setUserAnswer(answer.id);

    if (!questionsLength || !questionPoints) {
      return;
    }
  
    const updateStates = () => {
      if (level + 1 < questionsLength) {
        setLevel(level + 1);
      }
  
      if (answer.isAnswer) {
        setPoints(prevPoints => {
          const newPoints = prevPoints + questionPoints;
          console.log('points', newPoints);
          return newPoints;
        });
      }
  
      if (level + 1 === questionsLength) {
        setEndScenario(true);
        addQuizToUser(points + (answer.isAnswer ? questionPoints : 0));
      }
  
      setUserAnswer(null);
    };
  
    debounce(() => updateStates(), 1500)();
  };

  return (
    <section className="quiz">
      {quizData ? (
        endScenario ? (
          <div className="quiz__end">
            <p className="typography__title typography__title--primary typography--center">
              Congratulations
            </p>
            <Image
              src={'/success.svg'}
              alt="success icon"
              width={300}
              height={300}
              className="quiz__image"
            />
            <p className="typography__paragraph typography--center quiz__question">
              Great, you ended the quiz!
            </p>
            <p className="typography__paragraph typography--center quiz__question">
              Your score is:
              <span className="typography__paragraph typography--center quiz__question">
                {points}
              </span>
            </p>
          </div>
        ) : (
          <>
            <h1 className="typography__title typography__title--primary typography--center">
              {quizData.attributes.topic}
            </h1>
            <p className="typography__paragraph typography--center quiz__question">
              {currentQuestion?.question}
            </p>
            <Image
              src={image || '/desk.svg'}
              alt={currentQuestion?.question || 'test'}
              width={400}
              height={400}
              className="quiz__image quiz__image--margin"
            />
            <div className="quiz__answers quiz__answers--margin">
              {answerOptions?.map((answer: Answer) => (
                <QuizAnswer
                  key={answer.id}
                  answer={answer}
                  userAnswer={userAnswer}
                  onClick={() => checkAnswer(answer)}
                />
              ))}
            </div>
          </>
        )
      ) : (
        <main className="quiz__loading">
          <Skeleton variant="rectangular" width={25} height={5} />
          <Skeleton variant="rectangular" width={25} height={3} />

          <Skeleton variant="rectangular" width={25} height={25} />
          <div className="quiz__answers quiz__answers--margin">
            {Array.from({ length: 4 }, (_, index) => (
              <Skeleton
                key={index}
                variant="rectangular"
                width={25}
                height={25}
              />
            ))}
          </div>
        </main>
      )}
    </section>
  );
};

export default QuizPage;
