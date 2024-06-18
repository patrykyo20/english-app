'use client'

import { getUser } from "@/api/users";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import User from "@/types/user";

const UserPage = ({ params }: {params: { userId: number }}) => {
  const [userAccount, setUserAccount] = useState<User>();

  const userId = params.userId;
  
  const setUser = useCallback(async () => {
    const response = await getUser(userId)

    setUserAccount(response.data);
  }, [userId]);

  useEffect(() => {
    setUser();
  }, [setUser])

  return (
    <main className="user">
      <Image
        src={userAccount?.image.formats.medium.url || '/avatar.svg'}
        alt={userAccount?.image?.hash || 'user-image'}
        height={400}
        width={400}
        className="user__image"
      />

      <div className="user__info">
        <h1 className="typography__title--primary typography__title">{userAccount?.username}</h1>
        <p className="typography__description typography__paragraph">{userAccount?.description}</p>
      </div>

      <div className="user__gain">
      <p className="typography__description typography__paragraph">Level: 
          <span className="typography__headline"> {userAccount?.quizzes?.length ?? 0}</span>
        </p>
      </div>
    </main>
  );
};

export default UserPage;