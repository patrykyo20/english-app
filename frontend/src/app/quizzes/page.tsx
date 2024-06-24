'use client';

import { getQuizzes } from "@/api/quizzes";
import QuizCard from "@/components/ui/QuizCard";
import QuizCardSkeleton from "@/components/ui/QuizCardSkeleton";
import { useUserContext } from "@/context/userProvider";
import Quiz from "@/types/quiz";
import debounce from "@/utils/debounce";
import { useCallback, useEffect, useState } from "react";

const Quizzes = () => {
  const [quizzes, setQuizzes] = useState<Quiz[] | null>(null);
  const { user } = useUserContext();

  const setVariant = (level: number) => {
    const userLevel = user.data.quizLevel + 1;

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
    debounce(() => fetchQuizzes(), 1000)();
  }, [fetchQuizzes]);

  return (
    <section className="quizzes">
      {quizzes ? (
        quizzes.map(quiz => (
          <QuizCard quiz={quiz} key={quiz.id} variant={setVariant(quiz.id)} />
        ))
      ) : (
        Array.from({ length: 4 }, (_, index) => (
          <QuizCardSkeleton key={index} />
        ))
      )}
    </section>
  );
};

export default Quizzes;