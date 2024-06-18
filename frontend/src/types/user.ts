interface User {
  id: number,
  username: string,
  email: string,
  provider: string,
  confirmed: boolean,
  blocked: boolean,
  createdAt: string,
  updatedAt: string,
  description: string,
  role: {
    id: number,
    name: string,
    description: string,
    type: string,
    createdAt: string,
    updatedAt: string
  },
  quizzes: [
    {
      id: number,
      createdAt: string,
      updatedAt: string,
      publishedAt: string,
      topic: string
    }
  ],
  image: {
    id: number,
    name: string,
    alternativeText: null,
    caption: null,
    width: number,
    height: number,
    hash: string;
    formats: {
      small: {
        url: string,
        width: string,
        height: string,
      };
      medium: {
        url: string,
        width: string,
        height: string,
      };
      thumbnail: {
        url: string,
        width: string,
        height: string,
      };
    };

  };
};

export default User;