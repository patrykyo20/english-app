interface User {
  id: number;
  username: string;
  email: string;
  password?: string;
  description?: string;
  url?: string;
  role?: {
    id: number;
    name: string;
    description: string;
    type: string;
    createdAt: string;
    updatedAt: string;
  };
  quizzes?: {
    id: number;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    topic: string;
  }[];
  image?: {
    formats: {
      small: {
        url: string;
        width: string;
        height: string;
      };
      medium: {
        url: string;
        width: string;
        height: string;
      };
      thumbnail: {
        url: string;
        width: string;
        height: string;
      };
    };
    hash: string;
    id: number;
    name: string;
    alternativeText: null;
    caption: null;
    width: number;
    height: number;
  };
};

export default User;