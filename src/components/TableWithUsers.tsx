'use client';

import { useEffect } from 'react';
import UserCreationModal, { getAllUsers } from './modals/UserCreationModal';
import { useAtom } from 'jotai';
import { sessionAtom, usersAtom } from '@/context/store';
import { User } from '@/context/interface';

const Row = ({ user }: { user: User }) => {
  const [session] = useAtom(sessionAtom);
  return (
    <tr className='border-b hover:bg-slate-200 bg-gray-100'>
      <td className='p-3 px-5'>
        <span className='capitalize'>
          {user.firstName} {user.lastName}
        </span>
      </td>
      <td className='p-3 px-5'>
        <span>{user.email}</span>
      </td>
      <td className='p-3 px-5'>
        <span>{user.role}</span>
      </td>
      <td className='p-3 px-5 flex justify-end gap-4'>
        {session && (
          <>
            {' '}
            <button
              type='button'
              className='text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline'
              onClick={() =>
                document &&
                (
                  document.getElementById('my_modal_4') as HTMLFormElement
                ).showModal()
              }
            >
              Update
            </button>
            <UserCreationModal user={user} />
            <button
              type='button'
              className='text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline'
              onClick={() => {
                if (confirm('Are you sure you want to delete this user?')) {
                  fetch(`http://localhost:3000/user/${user.id}`, {
                    method: 'DELETE',
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${session?.accessToken}`,
                    },
                  }).then(() => {
                    window.location.reload();
                  });
                }
              }}
            >
              Delete
            </button>
          </>
        )}
      </td>
    </tr>
  );
};

const TableWithUsers = () => {
  const [session] = useAtom(sessionAtom);
  const [users, setUsers] = useAtom(usersAtom);

  useEffect(() => {
    if (!session) return;
    getAllUsers(session).then((users) => setUsers(users));
  }, [session, setUsers]);

  return (
    <div className='text-gray-900 p-4'>
      <div className='border rounded-lg overflow-hidden'>
        <h1 className='px-4 py-4 font-bold text-2xl'>Tous les utilisateurs</h1>
        <div className='border w-full' />
        <div className='flex justify-center'>
          <table className='w-full text-md bg-white shadow-md mb-4'>
            <tbody>
              <tr className='border-b'>
                <th className='text-left p-3 px-5'>Name</th>
                <th className='text-left p-3 px-5'>Email</th>
                <th className='text-left p-3 px-5'>Role</th>
                <th></th>
              </tr>
              {users?.map((user) => (
                <Row key={user.id} user={user} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TableWithUsers;
