import Image from "./image";

export interface Answer {
  id: number;
  answer: string;
  isAnswer: boolean;
  points: number;
}

interface Quiz {
  id: number;
  attributes: {
    topic: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    description?: string;
    questions: {
      data: Array<{
        id: number;
        attributes: {
          question: string;
          goodAnswer: string;
          createdAt: string;
          updatedAt: string;
          publishedAt: string;
          points: number;
          image: Image;
          answers: Answer[];
        };
      }>;
    };
    image: Image;
  };
}

export default Quiz;