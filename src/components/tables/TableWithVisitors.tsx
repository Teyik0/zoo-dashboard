'use client';

import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { sessionAtom, userInfoAtom, usersAtom } from '@/context/store';
import { Session, Visitor } from '@/context/interface';
import { getUserInfo } from '@/context/fetch';

const TableWithVisitors = () => {
  const [session] = useAtom(sessionAtom);
  const [visitors, setVisitors] = useState<Visitor[] | null>(null);

  useEffect(() => {
    fetch('http://localhost:3000/visitor').then((res) => {
      res
        .json()
        .then((data) => {
          if (data) setVisitors(data);
        })
        .catch((err) => {
          console.log(err);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }, []);
  return (
    <div className='px-4 py-4'>
      <h1 className='px-4 py-4 font-bold text-2xl border rounded-t-lg'>
        Tous les visiteurs
      </h1>
      <div className='relative overflow-x-auto rounded-b-lg'>
        <table className='w-full text-left text-lg'>
          <tbody>
            <tr className='border'>
              <th className='text-left px-6 py-2'>Nom</th>
              <th className='text-left px-6 py-2'>Email</th>
              <th className='text-left px-6 py-2'>Se situe à</th>
              <th></th>
            </tr>
            {session &&
              visitors?.map((visitor) => (
                <Row
                  key={visitor.id}
                  name={visitor.firstName + ' ' + visitor.lastName}
                  email={visitor?.email || 'N/A'}
                  role={visitor?.isCurrentlyInArea?.name || 'N/A'}
                  session={session}
                />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

interface RowProps {
  name: string;
  email: string;
  role: string;
  session: Session;
}

const Row = ({ name, email, role, session }: RowProps) => {
  const [userInfo, setUserInfo] = useAtom(userInfoAtom);
  useEffect(() => {
    getUserInfo(userInfo, session).then((data) => {
      if (data) setUserInfo(data);
    });
  }, [session, setUserInfo, userInfo]);

  return (
    <tr
      className={`border text-base text-black bg-gray-100 hover:bg-slate-200`}
    >
      <td scope='row' className='px-6 py-4 first-letter:capitalize'>
        {name}
      </td>
      <td scope='row' className='px-6 py-4 first-letter:capitalize'>
        {email}
      </td>
      <td scope='row' className='px-6 py-4 first-letter:capitalize'>
        {role}
      </td>
      {userInfo?.role === 'admin' && (
        <td className='flex justify-end gap-4 py-4 px-6'>
          <button
            type='button'
            className='text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline'
            onClick={() => {}}
          >
            Update
          </button>
          <button
            type='button'
            className='text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline'
            onClick={() => {}}
          >
            Delete
          </button>
        </td>
      )}
    </tr>
  );
};

export default TableWithVisitors;
