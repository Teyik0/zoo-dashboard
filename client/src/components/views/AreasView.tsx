'use client';

import Carousel from '../Carousel';
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import {
  currentAreaAtom,
  sessionAtom,
  areasAtom,
  userInfoAtom,
} from '@/context/store';
import { Area } from '@/context/interface';
import { toast } from 'react-hot-toast';
import { getUserInfo } from '@/context/fetch';
import Image from 'next/image';
import AreaCreationModal from '../modals/AreaCreationModal';

export const getAllAreas = async (): Promise<Area[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/area`, {
    method: 'GET',
    next: { revalidate: 60 },
  });
  const data = await res.json();
  return data;
};

const AreasView = () => {
  const [current] = useAtom(currentAreaAtom);
  const [areas, setAreas] = useAtom(areasAtom);
  const [session] = useAtom(sessionAtom);
  const [userInfo, setUserInfo] = useAtom(userInfoAtom);

  useEffect(() => {
    getAllAreas().then((areas) => setAreas(areas));
    getUserInfo(userInfo, session).then((data) => {
      if (data) setUserInfo(data);
    });
    //console.log('host', process.env.NEXT_PUBLIC_API_URL);
  }, [session, userInfo, setUserInfo, setAreas]);

  return (
    <div className='px-4 pb-4'>
      <div className='w-full border p-4 rounded-lg'>
        <div className='flex flex-col w-full pb-2'>
          <h1 className='text-2xl font-bold'>Nos différents espaces</h1>
          <p className='text-gray-600'>{areas && areas[current].name}</p>
        </div>

        <div className='grid lg:grid-cols-2 gap-4 justify-center mt-2'>
          {areas && (
            <Carousel length={areas.length} type='area'>
              {areas.map((area: Area) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={area.name}
                  src={area.imagesUrl[0]}
                  alt={area.name}
                  className='rounded-lg'
                />
              ))}
            </Carousel>
          )}

          <div>
            <p className='text-gray-600 sm:text-base text-sm'>
              {areas && areas[current].description}
            </p>
          </div>
        </div>

        <div className='flex justify-between items-center mt-4'>
          <div className='flex flex-row flex-wrap gap-2 sm:gap-4'>
            <div className='form-control w-52 rounded-lg border'>
              <label className='cursor-pointer label'>
                <span className='label-text'>En Maintenance</span>
                <input
                  type='checkbox'
                  className='toggle toggle-primary'
                  checked={areas ? areas[current].isInMaintenance : false}
                  onChange={() => {
                    if (areas)
                      fetch(
                        `${process.env.NEXT_PUBLIC_API_URL}/area/${areas[current].id}`,
                        {
                          method: 'PUT',
                          headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${session?.accessToken}`,
                          },
                          body: JSON.stringify({
                            isInMaintenance: !areas[current].isInMaintenance,
                            imagesUrl: areas[current].imagesUrl,
                          }),
                        }
                      ).then(() => {
                        toast.success('Espace mis à jour avec succès');
                        getAllAreas().then((areas) => setAreas(areas));
                      });
                  }}
                />
              </label>
            </div>
            <div className='form-control w-52 rounded-lg border'>
              <label className='cursor-pointer label'>
                <span className='label-text'>Accès handicapé</span>
                <input
                  type='checkbox'
                  className='toggle toggle-secondary'
                  checked={areas ? areas[current].handicapAccess : false}
                  onChange={() => {
                    if (areas)
                      fetch(
                        `${process.env.NEXT_PUBLIC_API_URL}/area/${areas[current].id}`,
                        {
                          method: 'PUT',
                          headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${session?.accessToken}`,
                          },
                          body: JSON.stringify({
                            handicapAccess: !areas[current].handicapAccess,
                            imagesUrl: areas[current].imagesUrl,
                          }),
                        }
                      ).then(() => {
                        toast.success('Espace mis à jour avec succès');
                        getAllAreas().then((areas) => setAreas(areas));
                      });
                  }}
                />
              </label>
            </div>
          </div>
          {userInfo?.role === 'admin' && (
            <>
              <div className='hover:bg-slate-200 p-2 rounded-lg cursor-pointer'>
                <Image
                  src='/tire.svg'
                  width={25}
                  height={25}
                  alt='tire'
                  onClick={() =>
                    document &&
                    (
                      document.getElementById('my_modal_1') as HTMLFormElement
                    ).showModal()
                  }
                />
              </div>
              {areas && <AreaCreationModal area={areas[current]} />}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AreasView;
