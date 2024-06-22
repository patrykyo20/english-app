'use client';

import { getQuizzes } from "@/api/quizzes";
import QuizCard from "@/components/ui/QuizCard";
import { useUserContext } from "@/context/userProvider";
import Quiz from "@/types/quiz";
import { useCallback, useEffect, useState } from "react";

const Quizzes = () => {
  const [quizzes, setQuizzes] = useState<Quiz[] | null>(null);
  const { user } = useUserContext();

  const setVariant = (level: number) => {
    const userLevel = user.data.quizzes.length + 1

    if (userLevel < level) {
      return 'blocked';
    };
  
    if (userLevel > level) {
      return 'success';
    };
    
    return 'during';
  }

  const fetchQuizzes = useCallback(async () => {
    try {
      const response = await getQuizzes();
      
      setQuizzes(response.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }, []);

  useEffect(() => {
    fetchQuizzes();
  }, [fetchQuizzes]);

  if (!quizzes) {
    return <div>Loading</div>
  }

  return (
    <section className="quizzes">
      {quizzes.map(quiz => (
        <QuizCard quiz={quiz} key={quiz.id} variant={setVariant(quiz.id)} />
      ))}
    </section>
  );
};

export default Quizzes;