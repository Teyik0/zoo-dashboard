'use client';

import { useEffect, useState } from 'react';
import { getAllAnimals } from '../TopCard';
import { Animal, Session, User } from '@/context/interface';
import { useAtom } from 'jotai';
import { sessionAtom, userInfoAtom } from '@/context/store';
import { getUserInfo } from '@/context/fetch';
import AnimalCreationModal from '../modals/AnimalCreationModal';
import { toast } from 'react-hot-toast';

const deleteAnimalById = async (id: string, session: Session) => {
  try {
    const res = await fetch(`${'http://localhost:3000'}/animal/${id}`, {
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

const TableWithAnimals = () => {
  const [session] = useAtom(sessionAtom);
  const [animals, setAnimals] = useState<Animal[] | null>(null);
  const [userInfo, setUserInfo] = useAtom(userInfoAtom);
  const [animalToModify, setAnimalToModify] = useState<Animal | false>(false);

  useEffect(() => {
    getUserInfo(userInfo, session).then((data) => {
      if (data) setUserInfo(data);
    });
  }, [session, setUserInfo, userInfo]);

  useEffect(() => {
    getAllAnimals()
      .then((data) => {
        if (data) setAnimals(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className='px-4 pb-4'>
      <h1 className='px-4 py-4 font-bold text-2xl border rounded-t-lg'>
        Tous les animaux
      </h1>
      <div className='relative overflow-x-auto rounded-b-lg'>
        <table className='w-full text-left text-lg'>
          <tbody>
            <tr className='border'>
              <th className='text-left px-6 py-2'>Name</th>
              <th className='text-left px-6 py-2'>Espèce</th>
              <th className='text-left px-6 py-2'>Espace</th>
              <th></th>
            </tr>
            {session &&
              userInfo &&
              animals?.map((animal) => (
                <Row
                  key={animal.id}
                  animal={animal}
                  session={session}
                  userInfo={userInfo}
                  setAnimalToModify={setAnimalToModify}
                />
              ))}
            {animalToModify && <AnimalCreationModal animal={animalToModify} />}
          </tbody>
        </table>
      </div>
    </div>
  );
};

interface RowProps {
  animal: Animal;
  session: Session;
  userInfo: User;
  setAnimalToModify: React.Dispatch<React.SetStateAction<Animal | false>>;
}

const Row = ({ animal, session, userInfo, setAnimalToModify }: RowProps) => {
  return (
    <tr
      className={`border text-base text-black bg-gray-100 hover:bg-slate-200`}
    >
      <td scope='row' className='px-6 py-4 first-letter:capitalize'>
        {animal.name}
      </td>
      <td scope='row' className='px-6 py-4 first-letter:capitalize'>
        {animal.specie?.name}
      </td>
      <td scope='row' className='px-6 py-4 first-letter:capitalize'>
        {animal.area?.name}
      </td>
      {userInfo?.role === 'admin' && (
        <td className='flex justify-end gap-4 py-4 px-6'>
          <button
            type='button'
            className='text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline'
            onClick={() => {
              setAnimalToModify(animal);
              document &&
                (
                  document.getElementById('my_modal_3') as HTMLFormElement
                ).showModal();
            }}
          >
            Update
          </button>
          <button
            type='button'
            className='text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline'
            onClick={() => {
              deleteAnimalById(animal.id, session)
                .then(() => {
                  toast.success('Animal supprimé avec succès');
                })
                .catch((error) => {
                  console.log(error);
                  toast.error('Une erreur est survenue');
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

export default TableWithAnimals;
