'use client'

import { getUser, updateUser } from "@/api/users";
import { FormEvent, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import User from "@/types/user";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { upload } from "@/api/upload";
import { useUserContext } from "@/context/userProvider";
import useLogout from "@/utils/logout";
import Modal from "@/components/ui/Modal";
import debounce from "@/utils/debounce";

const UserPage = ({ params }: {params: { userId: number }}) => {
  const userId = params.userId;

  const { user } = useUserContext();

  const { logout, successLogout } = useLogout();

  const [userData, setUserData] = useState<User | null>(null);
  const [successUpdate, setSuccessUpdate] = useState<boolean>(false);

  const [dataChange, setDataChange] = useState({
    username: false, 
    email: false,
    description: false,
    password: false,
  });
  
  const setUser = useCallback(async () => {
    try {
      const response = await getUser(userId);

      setUserData({
        id: response.data.id || 0,
        username: response.data.username || '',
        email: response.data.email || '',
        description: response.data.description || '',
        quizzes: response.data.quizzes || [],
        image: response.data.image || null,
        url: response.data.url || '',
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }, [userId]);

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const response = await upload(file);
        const imageUrl: string = response?.data[0]?.url;

        if (userData) {
          setUserData({ ...userData, url: imageUrl });
        }
    
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const handleUpdateUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      if (userData) {
        await updateUser(userData.id, userData);
      };
      setSuccessUpdate(true);
    } catch (error) {
      console.error('Error updating user:', error);
    } finally {
      debounce(() => setSuccessUpdate(false), 3000)();
    }
  };

  useEffect(() => {
    setUser();
  }, [setUser]);

  if (!userData) {
    return <div>Loading</div>
  };

  return (
    <main className="user">
      {successLogout && <Modal variant={"success"} title={"Successfully logged out"} />}
      {successUpdate && <Modal variant={"success"} title={"Successfully updated data"} />}
      
      <Image
        src={userData.url || '/avatar.svg'}
        alt={userData?.image?.hash || 'user-image'}
        height={400}
        width={400}
        className="user__image"
      />

      <form className="user__info" onSubmit={handleUpdateUser}>
        {user.data.id == userId &&
          <article className="user__field">
            <input type="file" id="fileInput" onChange={handleUploadImage} className="input--file" />
            <label htmlFor="fileInput" className="input__file--custom">
              change image
            </label>
          </article>
        }
        <article className="user__field user__field--margin">
          {!dataChange.email && (
            <label className="typography__description typography__paragraph">{userData?.email}</label>
          )}
        
          {dataChange.email && (
            <Input
              variant="input"
              value={userData?.email || ''}
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            />
          )}

          {user.data.id == userId &&
            <Image
              src={'/pen.svg'}
              alt="pen"
              width={25}
              height={25}
              className="icon--pen"
              onClick={() => setDataChange({ ...dataChange, email: !dataChange.email })}
            />
          }
        </article>
        <article className="user__field user__field--margin">
          {!dataChange.username && (
            <label className="typography__title--primary typography__title">{userData?.username}</label>
          )}
        
          {dataChange.username && (
            <Input
              variant="input"
              value={userData?.username || ''}
              onChange={(e) => setUserData({ ...userData, username: e.target.value })}
            />
          )}

          {user.data.id == userId &&
            <Image
              src={'/pen.svg'}
              alt="pen"
              width={25}
              height={25}
              className="icon--pen"
              onClick={() => setDataChange({ ...dataChange, username: !dataChange.username })}
            />
          }
        </article>
        <article className="user__field user__field--margin">
          {!dataChange.description && (
            <label className="typography__description typography__paragraph">{userData?.description}</label>
          )}

          {dataChange.description && (
            <Input
              variant="textarea"
              value={userData?.description || ''}
              onChange={(e) => setUserData({ ...userData, description: e.target.value })}
            />
          )}

          {user.data.id == userId &&
            <Image
              src={'/pen.svg'}
              alt="pen"
              width={25}
              height={25}
              className="icon--pen"
              onClick={() => setDataChange({ ...dataChange, description: !dataChange.description })}
            />
          }
        </article>
        
        {user.data.id == userId && 
          <>
            <p className="typography__description typography__title typography__paragraph user__field--margin">Password</p>
            <article className="user__field">
              {!dataChange.password && (
                <label className="typography__description typography__paragraph">****************</label>
              )}
            
              {dataChange.password && (
                <Input
                  variant="input"
                  value={userData?.password || ''}
                  type='password'
                  placeholder="password..."
                  onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                />
              )}
              
              {user.data.id == userId &&
                <Image
                  src={'/pen.svg'}
                  alt="pen"
                  width={25}
                  height={25}
                  className="icon--pen"
                  onClick={() => setDataChange({ ...dataChange, password: !dataChange.password })}
                />
              }
            </article> 
          </>
        }
        
        {user.data.id == userId && 
          <div className="user__field user__field--margin">
            <Button title={"Logout"} variant={'danger'} onClick={(e: React.MouseEvent<HTMLButtonElement>) => logout(e)} />
            <Button title={"Apply"} type="submit" />
          </div>
        }
      </form>

      <div className="user__gain">

      </div>
    </main>
  );
};

export default UserPage;
