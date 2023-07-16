'use client';

import { Specie } from '@/context/interface';
import { sessionAtom } from '@/context/store';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

const SpecieCreationModal = ({
  specie = false,
}: {
  specie: Specie | false;
}) => {
  const [session] = useAtom(sessionAtom);
  const [specieForm, setSpecieForm] = useState<Specie>({
    id: '',
    name: '',
    description: '',
    imgUrl: [''],
  });

  useEffect(() => {
    if (specie) {
      setSpecieForm(specie);
    }
  }, [specie]);

  const handleClick = async () => {
    if (!specie) {
      if (
        specieForm.name === '' ||
        specieForm.description === '' ||
        specieForm.imgUrl[0] === ''
      )
        return toast.error('Veuillez remplir tous les champs');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/specie`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify(specieForm),
      });
      const notification = toast.loading(
        'Création de la nouvelle espèce en cours...'
      );
      if (res.status === 200) {
        toast.success('Espèce créé avec succès', { id: notification });
        setSpecieForm({
          id: '',
          name: '',
          description: '',
          imgUrl: [''],
        });
      } else {
        toast.error('Une erreur est survenue', { id: notification });
      }
    } else {
      if (
        specieForm.name === '' ||
        specieForm.description === '' ||
        specieForm.imgUrl[0] === ''
      )
        return toast.error('Veuillez remplir tous les champs');
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/specie/${specie.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.accessToken}`,
          },
          body: JSON.stringify(specieForm),
        }
      );
      const notification = toast.loading(
        'Mise à jour de la nouvelle espèce en cours...'
      );
      if (res.status === 200) {
        toast.success('Espèce mise à jour avec succès', { id: notification });
        setSpecieForm({
          id: '',
          name: '',
          description: '',
          imgUrl: [''],
        });
      } else {
        toast.error('Une erreur est survenue', { id: notification });
      }
    }
  };

  return (
    <dialog id='my_modal_2' className='modal'>
      <form method='dialog' className='modal-box w-11/12 max-w-5xl'>
        <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
          ✕
        </button>
        <h3 className='font-bold text-xl'>
          {specie ? "Mise à jour d'une espèce" : 'Créer une espèce'}
        </h3>

        <form action='#' className='mt-8 grid grid-cols-6 gap-6'>
          <div className='col-span-6 sm:col-span-3'>
            <label
              htmlFor='Name'
              className='block text-sm font-medium text-gray-700'
            >
              Nom de l&apos;espèce
            </label>

            <input
              type='text'
              id='FirstName'
              name='first_name'
              className='mt-1 w-full rounded-md border-gray-200 bg-white text-sm h-8 border px-2 text-gray-700 shadow-sm'
              onChange={(e) => {
                setSpecieForm({ ...specieForm, name: e.target.value });
              }}
              value={specieForm.name}
              placeholder='Ex: Lion'
            />
          </div>

          <div className='col-span-6'>
            <label
              htmlFor='imgUrl'
              className='block text-sm font-medium text-gray-700'
            >
              Url de l&apos;image de l&apos;espèce
            </label>

            <input
              type='text'
              id='imgUrl'
              name='imgUrl'
              className='mt-1 w-full rounded-md border-gray-200 bg-white text-sm h-8 border px-2 text-gray-700 shadow-sm'
              onChange={(e) => {
                setSpecieForm({
                  ...specieForm,
                  imgUrl: [e.target.value],
                });
              }}
              value={specieForm.imgUrl[0]}
              placeholder='Ex: https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
            />
          </div>

          <div className='col-span-6'>
            <label
              htmlFor='description'
              className='block text-sm font-medium text-gray-700'
            >
              Description de l&apos;espèce
            </label>
            <textarea
              id='imgUrl'
              name='imgUrl'
              cols={4}
              className='mt-1 w-full rounded-md border-gray-200 bg-white text-sm h-24 border px-2 text-gray-700 shadow-sm p-2'
              onChange={(e) => {
                setSpecieForm({ ...specieForm, description: e.target.value });
              }}
              value={specieForm.description}
              placeholder='Le lion est sauvage'
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

export default SpecieCreationModal;
