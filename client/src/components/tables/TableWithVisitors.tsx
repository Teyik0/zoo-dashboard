'use client';

import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { sessionAtom, userInfoAtom, usersAtom } from '@/context/store';
import { Session, User, Visitor } from '@/context/interface';
import { getUserInfo } from '@/context/fetch';

const TableWithVisitors = () => {
  const [session] = useAtom(sessionAtom);
  const [visitors, setVisitors] = useState<Visitor[] | null>(null);
  const [userInfo, setUserInfo] = useAtom(userInfoAtom);
  const [visitorToModify, setVisitorToModify] = useState<Visitor | null>(null);

  useEffect(() => {
    getUserInfo(userInfo, session).then((data) => {
      if (data) setUserInfo(data);
    });
  }, [session, setUserInfo, userInfo]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/visitor`).then((res) => {
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
              userInfo &&
              visitors?.map((visitor) => (
                <Row
                  key={visitor.id}
                  visitor={visitor}
                  session={session}
                  userInfo={userInfo}
                  setVisitorToModify={setVisitorToModify}
                />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

interface RowProps {
  visitor: Visitor;
  session: Session;
  userInfo: User;
  setVisitorToModify: React.Dispatch<React.SetStateAction<Visitor | null>>;
}

const Row = ({ visitor, session, userInfo, setVisitorToModify }: RowProps) => {
  return (
    <tr
      className={`border text-base text-black bg-gray-100 hover:bg-slate-200`}
    >
      <td scope='row' className='px-6 py-4 first-letter:capitalize'>
        {visitor.firstName + ' ' + visitor.lastName}
      </td>
      <td scope='row' className='px-6 py-4 first-letter:capitalize'>
        {visitor?.email || 'N/A'}
      </td>
      <td scope='row' className='px-6 py-4 first-letter:capitalize'>
        {visitor?.isCurrentlyInArea?.name || 'N/A'}
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
