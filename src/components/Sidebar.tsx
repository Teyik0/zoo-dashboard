'use client';

import Link from 'next/link';
import { RxSketchLogo, RxDashboard, RxPerson } from 'react-icons/rx';
import { BiLogIn } from 'react-icons/bi';
import { FiSettings } from 'react-icons/fi';
import { sessionAtom } from '@/context/store';
import { useAtom } from 'jotai';

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useAtom(sessionAtom);
  return (
    <div className='flex'>
      <div className='fixed w-20 h-screen p-4 bg-white border-r-[1px] flex flex-col justify-between'>
        <div className='flex flex-col items-center'>
          <Link href='/'>
            <div className='bg-purple-800 text-white p-3 rounded-lg inline-block'>
              <RxSketchLogo size={20} />
            </div>
          </Link>
          <span className='border-b-[1px] border-gray-200 w-full p-2'></span>
          <Link href='/'>
            <div className='bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block'>
              <RxDashboard size={20} />
            </div>
          </Link>
          <Link href='/profile'>
            <div className='bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block'>
              <RxPerson size={20} />
            </div>
          </Link>
          <Link href='/'>
            <div className='bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block'>
              <FiSettings size={20} />
            </div>
          </Link>
          {session !== null && (
            <div
              className='bg-red-600 hover:bg-red-900 cursor-pointer my-4 p-3 rounded-lg inline-block'
              onClick={() => setSession(null)}
            >
              <BiLogIn size={20} color='white' />
            </div>
          )}
        </div>
      </div>
      <main className='ml-20 w-full'>{children}</main>
    </div>
  );
};

export default Sidebar;
