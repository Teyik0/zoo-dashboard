'use client';

import { useEffect, useState } from 'react';
import UserCreationModal, { getAllUsers } from '../modals/UserCreationModal';
import { useAtom } from 'jotai';
import { sessionAtom, userInfoAtom, usersAtom } from '@/context/store';
import { Session, User } from '@/context/interface';
import { getUserInfo } from '@/context/fetch';
import { toast } from 'react-hot-toast';

const deleteUserById = async (id: string, session: Session) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.accessToken}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const TableWithUsers = () => {
  const [session] = useAtom(sessionAtom);
  const [users, setUsers] = useAtom(usersAtom);
  const [userInfo, setUserInfo] = useAtom(userInfoAtom);
  const [userToModify, setUserToModify] = useState<User | false>(false);

  useEffect(() => {
    getUserInfo(userInfo, session).then((data) => {
      if (data) setUserInfo(data);
    });
  }, [session, setUserInfo, userInfo]);

  useEffect(() => {
    if (!session) return;
    getAllUsers(session).then((users) => setUsers(users));
  }, [session, setUsers]);

  return (
    <div className='px-4 py-4'>
      <h1 className='px-4 py-4 font-bold text-2xl border rounded-t-lg'>
        Tous les utilisateurs
      </h1>
      <div className='relative overflow-x-auto rounded-b-lg'>
        <table className='w-full text-left text-lg'>
          <tbody>
            <tr className='border'>
              <th className='text-left px-6 py-2'>Nom</th>
              <th className='text-left px-6 py-2'>Email</th>
              <th className='text-left px-6 py-2'>Rôle</th>
              <th></th>
            </tr>
            {userInfo &&
              session &&
              users?.map((user) => (
                <Row
                  key={user.id}
                  user={user}
                  userInfo={userInfo}
                  setUserToModify={setUserToModify}
                  session={session}
                />
              ))}
            {userToModify && <UserCreationModal user={userToModify} />}
          </tbody>
        </table>
      </div>
    </div>
  );
};

interface RowProps {
  user: User;
  userInfo: User;
  setUserToModify: React.Dispatch<React.SetStateAction<User | false>>;
  session: Session;
}

const Row = ({ user, userInfo, setUserToModify, session }: RowProps) => {
  return (
    <tr
      className={`border text-base text-black bg-gray-100 hover:bg-slate-200`}
    >
      <td scope='row' className='px-6 py-4 first-letter:capitalize'>
        {user.firstName} {user.lastName}
      </td>
      <td scope='row' className='px-6 py-4 first-letter:capitalize'>
        {user.email}
      </td>
      <td scope='row' className='px-6 py-4 first-letter:capitalize'>
        {user.role}
      </td>
      {userInfo?.role === 'admin' && (
        <td className='flex justify-end gap-4 py-4 px-6'>
          <button
            type='button'
            className='text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline'
            onClick={() => {
              setUserToModify(user);
              document &&
                (
                  document.getElementById('my_modal_4') as HTMLFormElement
                ).showModal();
            }}
          >
            Update
          </button>
          <button
            type='button'
            className='text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline'
            onClick={() => {
              deleteUserById(user.id, session)
                .then(() => {
                  toast.success('Utilisateur supprimé avec succès');
                })
                .catch((error) => {
                  toast.error(error);
                });
            }}
          >
            Delete
          </button>
        </td>
      )}
    </tr>
  );
};

export default TableWithUsers;
