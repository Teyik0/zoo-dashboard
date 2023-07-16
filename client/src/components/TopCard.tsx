import { getAllAnimals, getAllSpecies, getAllVisitors } from '@/context/fetch';
import { Animal, Specie, Visitor } from '@/context/interface';
import { useEffect, useState } from 'react';

const TopCard = async () => {
  const animals: Animal[] = await getAllAnimals();
  const species: Specie[] = await getAllSpecies();
  const visitors: Visitor[] = await getAllVisitors();

  //const [animals, setAnimals] = useState<Animal[]>([]);
  //const [species, setSpecies] = useState<Specie[]>([]);
  //const [visitors, setVisitors] = useState<Visitor[]>([]);

  /* useEffect(() => {
    getAllAnimals()
      .then((data) => {
        if (data) setAnimals(data);
      })
      .catch((error) => {
        console.log(error);
      });
    getAllSpecies()
      .then((data) => {
        if (data) setSpecies(data);
      })
      .catch((error) => {
        console.log(error);
      });
    getAllVisitors()
      .then((data) => {
        if (data) setVisitors(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []); */

  return (
    <div className='grid lg:grid-cols-3 gap-4 p-4'>
      <div className='col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg'>
        <div className='flex flex-col w-full pb-4'>
          <p className='text-2xl font-bold'>{animals.length}</p>
          <p className='text-gray-600'>Nombre d&apos;animaux dans le zoo</p>
        </div>
        <p className='bg-green-200 flex justify-center items-center p-2 rounded-lg'>
          <span className='text-green-700 text-lg'>+18%</span>
        </p>
      </div>

      <div className='col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg'>
        <div className='flex flex-col w-full pb-4'>
          <p className='text-2xl font-bold'>{species.length}</p>
          <p className='text-gray-600'>Nombre d&apos;espèces dans le zoo</p>
        </div>
        <p className='bg-green-200 flex justify-center items-center p-2 rounded-lg'>
          <span className='text-green-700 text-lg'>+11%</span>
        </p>
      </div>

      <div className='col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg'>
        <div className='flex flex-col w-full pb-4'>
          <p className='text-2xl font-bold'>{visitors.length}</p>
          <p className='text-gray-600'>Nombre de visiteurs dans le zoo</p>
        </div>
        <p className='bg-green-200 flex justify-center items-center p-2 rounded-lg'>
          <span className='text-green-700 text-lg'>+17%</span>
        </p>
      </div>
    </div>
  );
};

export default TopCard;
