'use client';

import Carousel from '../Carousel';
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { currentSpecieAtom, sessionAtom, userInfoAtom } from '@/context/store';
import { Specie } from '@/context/interface';
import Image from 'next/image';
import { SpeciesCreationModal } from '..';
import { getUserInfo } from '@/context/fetch';

const getAllSpecies = async (): Promise<Specie[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/specie`, {
    method: 'GET',
    next: { revalidate: 60 },
  });
  const data = await res.json();
  return data;
};

const SpeciesView = () => {
  const [current] = useAtom(currentSpecieAtom);
  const [species, setSpecies] = useState<Specie[] | null>(null);
  const [userInfo, setUserInfo] = useAtom(userInfoAtom);
  const [session] = useAtom(sessionAtom);

  useEffect(() => {
    getAllSpecies().then((species) => setSpecies(species));
    getUserInfo(userInfo, session).then((data) => {
      if (data) setUserInfo(data);
    });
  }, [session, setUserInfo, userInfo]);

  return (
    <div className='px-4'>
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

          <div className='flex flex-col justify-between'>
            <p className='text-gray-600 sm:text-base text-sm'>
              {species && species[current].description}
            </p>
            {userInfo?.role === 'admin' && (
              <>
                <div className='cursor-pointer'>
                  <Image
                    src='/tire.svg'
                    width={25}
                    height={25}
                    alt='tire'
                    onClick={() =>
                      document &&
                      (
                        document.getElementById('my_modal_2') as HTMLFormElement
                      ).showModal()
                    }
                  />
                </div>
                {species && <SpeciesCreationModal specie={species[current]} />}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeciesView;
