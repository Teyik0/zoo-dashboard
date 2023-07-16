'use client';

import { Area } from '@/context/interface';
import { sessionAtom } from '@/context/store';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

const AreaCreationModal = ({ area = false }: { area: Area | false }) => {
  const [session] = useAtom(sessionAtom);
  const [areaForm, setAreaForm] = useState<Area>({
    id: '',
    name: '',
    capacity: 0,
    visiteDuration: 0,
    description: '',
    schedule: '',
    handicapAccess: false,
    isInMaintenance: false,
    imagesUrl: [''],
  });

  useEffect(() => {
    if (area) {
      setAreaForm(area);
    }
  }, [area]);

  const handleClick = async () => {
    if (!area) {
      if (
        areaForm.name === '' ||
        areaForm.capacity === 0 ||
        areaForm.visiteDuration === 0 ||
        areaForm.description === '' ||
        areaForm.schedule === '' ||
        areaForm.imagesUrl[0] === ''
      )
        return toast.error('Veuillez remplir tous les champs');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/area`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify(areaForm),
      });
      const notification = toast.loading("Création de l'espace en cours...");
      if (res.status === 200) {
        toast.success('Espace créé avec succès', { id: notification });
        setAreaForm({
          id: '',
          name: '',
          capacity: 0,
          visiteDuration: 0,
          description: '',
          schedule: '',
          handicapAccess: false,
          isInMaintenance: false,
          imagesUrl: [''],
        });
      } else {
        toast.error('Une erreur est survenue', { id: notification });
      }
    } else {
      if (
        areaForm.name === '' ||
        areaForm.capacity === 0 ||
        areaForm.visiteDuration === 0 ||
        areaForm.description === '' ||
        areaForm.schedule === '' ||
        areaForm.imagesUrl[0] === ''
      )
        return toast.error('Veuillez remplir tous les champs');
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/area/${area.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.accessToken}`,
          },
          body: JSON.stringify(areaForm),
        }
      );
      const notification = toast.loading("Mise à jour de l'espace en cours...");
      if (res.status === 200) {
        toast.success('Espace mis à jour avec succès', { id: notification });
        setAreaForm({
          id: '',
          name: '',
          capacity: 0,
          visiteDuration: 0,
          description: '',
          schedule: '',
          handicapAccess: false,
          isInMaintenance: false,
          imagesUrl: [''],
        });
      } else {
        toast.error('Une erreur est survenue', { id: notification });
      }
    }
  };

  return (
    <dialog id='my_modal_1' className='modal'>
      <form method='dialog' className='modal-box w-11/12 max-w-5xl'>
        <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
          ✕
        </button>
        <h3 className='font-bold text-xl'>
          {area ? "Mise à jour de l'espace" : 'Créer un espace'}
        </h3>

        <div className='flex flex-wrap gap-2 sm:gap-4 mt-4'>
          <div className='form-control w-52 rounded-lg border'>
            <label className='cursor-pointer label'>
              <span className='label-text'>Accès handicapé</span>
              <input
                type='checkbox'
                className='toggle toggle-secondary'
                checked={areaForm.handicapAccess}
                onChange={(e) =>
                  setAreaForm({
                    ...areaForm,
                    handicapAccess: !areaForm.handicapAccess,
                  })
                }
              />
            </label>
          </div>
          <div className='form-control w-52 rounded-lg border'>
            <label className='cursor-pointer label'>
              <span className='label-text'>En Maintenance</span>
              <input
                type='checkbox'
                className='toggle toggle-primary'
                checked={areaForm.isInMaintenance}
                onChange={(e) =>
                  setAreaForm({
                    ...areaForm,
                    isInMaintenance: !areaForm.isInMaintenance,
                  })
                }
              />
            </label>
          </div>
        </div>

        <form action='#' className='mt-8 grid grid-cols-6 gap-6'>
          <div className='col-span-6 sm:col-span-3'>
            <label
              htmlFor='Name'
              className='block text-sm font-medium text-gray-700'
            >
              Nom de l&apos;espace
            </label>

            <input
              type='text'
              id='FirstName'
              name='first_name'
              className='mt-1 w-full rounded-md border-gray-200 bg-white text-sm h-8 border px-2 text-gray-700 shadow-sm'
              onChange={(e) => {
                setAreaForm({ ...areaForm, name: e.target.value });
              }}
              value={areaForm.name}
              placeholder='Ex: Savane Africaine'
            />
          </div>

          <div className='col-span-6 sm:col-span-3'>
            <label
              htmlFor='Schedule'
              className='block text-sm font-medium text-gray-700'
            >
              Heure d&apos;ouverture
            </label>

            <input
              type='text'
              id='LastName'
              name='last_name'
              className='mt-1 w-full rounded-md border-gray-200 bg-white text-sm h-8 border px-2 text-gray-700 shadow-sm'
              onChange={(e) => {
                setAreaForm({ ...areaForm, schedule: e.target.value });
              }}
              value={areaForm.schedule}
              placeholder='Ex: 9h - 18h'
            />
          </div>
          <div className='col-span-6 sm:col-span-3'>
            <label
              htmlFor='Capacity'
              className='block text-sm font-medium text-gray-700'
            >
              Capacité
            </label>

            <input
              type='number'
              id='capacity'
              name='capacity'
              className='mt-1 w-full rounded-md border-gray-200 bg-white text-sm h-8 border px-2 text-gray-700 shadow-sm'
              onChange={(e) => {
                setAreaForm({ ...areaForm, capacity: Number(e.target.value) });
              }}
              value={areaForm.capacity}
              placeholder='Ex: 100'
            />
          </div>

          <div className='col-span-6 sm:col-span-3'>
            <label
              htmlFor='VisiteDuration'
              className='block text-sm font-medium text-gray-700'
            >
              Durée de visite en minutes
            </label>

            <input
              type='number'
              id='visiteDuration'
              name='visiteDuration'
              className='mt-1 w-full rounded-md border-gray-200 bg-white text-sm h-8 border px-2 text-gray-700 shadow-sm'
              onChange={(e) => {
                setAreaForm({
                  ...areaForm,
                  visiteDuration: Number(e.target.value),
                });
              }}
              value={areaForm.visiteDuration}
              placeholder='Ex: 60'
            />
          </div>

          <div className='col-span-6'>
            <label
              htmlFor='imgUrl'
              className='block text-sm font-medium text-gray-700'
            >
              Url de l&apos;image de l&apos;espace
            </label>

            <input
              type='text'
              id='imgUrl'
              name='imgUrl'
              className='mt-1 w-full rounded-md border-gray-200 bg-white text-sm h-8 border px-2 text-gray-700 shadow-sm'
              onChange={(e) => {
                setAreaForm({
                  ...areaForm,
                  imagesUrl: [e.target.value],
                });
              }}
              value={areaForm.imagesUrl[0]}
              placeholder='Ex: https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
            />
          </div>

          <div className='col-span-6'>
            <label
              htmlFor='description'
              className='block text-sm font-medium text-gray-700'
            >
              Description de l&apos;espace
            </label>
            <textarea
              id='imgUrl'
              name='imgUrl'
              cols={4}
              className='mt-1 w-full rounded-md border-gray-200 bg-white text-sm h-24 border px-2 text-gray-700 shadow-sm p-2'
              onChange={(e) => {
                setAreaForm({ ...areaForm, description: e.target.value });
              }}
              value={areaForm.description}
              placeholder="La savane c'est cool"
            />
          </div>
        </form>
        <button className='btn btn-success mt-4' onClick={handleClick}>
          Confirmer
        </button>
      </form>
    </dialog>
  );
};

export default AreaCreationModal;
