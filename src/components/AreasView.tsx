'use client';

import Carousel from './Carousel';
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { currentAreaAtom, sessionAtom, areasAtom } from '@/context/store';
import { Area } from '@/context/interface';
import { toast } from 'react-hot-toast';

export const getAllAreas = async (): Promise<Area[]> => {
  const res = await fetch(`${'http://localhost:3000'}/area`, {
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

  useEffect(() => {
    getAllAreas().then((areas) => setAreas(areas));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

        <div className='flex flex-row flex-wrap gap-2 sm:gap-4 mt-4'>
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
                      `${'http://localhost:3000'}/area/${areas[current].id}`,
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
                      `${'http://localhost:3000'}/area/${areas[current].id}`,
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
      </div>
    </div>
  );
};

export default AreasView;
