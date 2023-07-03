'use client';

import Carousel from './Carousel';
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { currentSpecieAtom } from '@/context/store';
import { Specie } from '@/context/interface';
import { getAllSpecies } from './TopCard';

const SpeciesView = () => {
  const [current] = useAtom(currentSpecieAtom);
  const [species, setSpecies] = useState<Specie[] | null>(null);

  useEffect(() => {
    getAllSpecies().then((species) => setSpecies(species));
  }, []);

  return (
    <div className='px-4 pb-4'>
      <div className='w-full border p-4 rounded-lg'>
        <div className='flex flex-col w-full pb-2'>
          <h1 className='text-2xl font-bold'>Nos différentes espèces</h1>
          <p className='text-gray-600'>{species && species[current].name}</p>
        </div>

        <div className='grid lg:grid-cols-2 gap-4 justify-center mt-2'>
          {species && (
            <Carousel length={species.length} type='specie'>
              {species.map((specie: Specie) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={specie.name}
                  src={specie.imgUrl[0] || '/galerie/plats/1.png'}
                  alt={specie.name}
                  className='rounded-lg'
                />
              ))}
            </Carousel>
          )}

          <div>
            <p className='text-gray-600 sm:text-base text-sm'>
              {species && species[current].description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeciesView;
