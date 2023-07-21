'use client';

import { User, Visitor } from '@/context/interface';
import { sessionAtom } from '@/context/store';
import { Session } from '@/context/interface';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

export const getAllUsers = async (session: Session): Promise<User[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });
  const data = await res.json();
  return data;
};

const VisitorCreationModal = ({
  visitor = false,
}: {
  visitor: Visitor | false;
}) => {
  const [session] = useAtom(sessionAtom);
  const [visitorForm, setVisitorForm] = useState<Visitor>({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
  });

  useEffect(() => {
    if (visitor) {
      setVisitorForm(visitor);
    }
  }, [visitor]);

  const handleClick = async () => {
    if (!visitor) {
      if (
        visitorForm.firstName === '' ||
        visitorForm.lastName === '' ||
        visitorForm.email === ''
      )
        return toast.error('Veuillez remplir tous les champs');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/visitor`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify(visitorForm),
      });
      const notification = toast.loading("Ajout de l'utilisateur en cours...");
      if (res.status === 200) {
        toast.success('Utilisateur ajouté avec succès', { id: notification });
        setVisitorForm({
          id: '',
          firstName: '',
          lastName: '',
          email: '',
        });
      } else {
        toast.error('Une erreur est survenue', { id: notification });
      }
    } else {
      if (
        visitorForm.firstName === '' ||
        visitorForm.lastName === '' ||
        visitorForm.email === ''
      )
        return toast.error('Veuillez remplir tous les champs');
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/${visitor.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.accessToken}`,
          },
          body: JSON.stringify({
            firstName: visitorForm.firstName,
            lastName: visitorForm.lastName,
            email: visitorForm.email,
          }),
        }
      );
      const notification = toast.loading(
        "Modification de l'utilisateur en cours..."
      );
      if (res.status === 200) {
        toast.success('Utilisateur modifié avec succès', { id: notification });
        setVisitorForm({
          id: '',
          firstName: '',
          lastName: '',
          email: '',
        });
      } else {
        toast.error('Une erreur est survenue', { id: notification });
      }
    }
  };

  return (
    <dialog id='my_modal_5' className='modal'>
      <form method='dialog' className='modal-box w-11/12 max-w-5xl'>
        <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
          ✕
        </button>
        <h3 className='font-bold text-xl'>
          {visitor ? "Mise à jour de l'utilisateur" : 'Créer un utilisateur'}
        </h3>

        <form action='#' className='mt-8 grid grid-cols-6 gap-6'>
          <div className='col-span-6 sm:col-span-3'>
            <label
              htmlFor='Name'
              className='block text-sm font-medium text-gray-700'
            >
              Prénom de l&apos;utilisateur
            </label>

            <input
              type='text'
              id='FirstName'
              name='first_name'
              className='mt-1 w-full rounded-md border-gray-200 bg-white text-sm h-8 border px-2 text-gray-700 shadow-sm'
              onChange={(e) => {
                setVisitorForm({ ...visitorForm, firstName: e.target.value });
              }}
              value={visitorForm.firstName}
              placeholder='Ex: Alexis'
            />
          </div>
          <div className='col-span-6 sm:col-span-3'>
            <label
              htmlFor='Name'
              className='block text-sm font-medium text-gray-700'
            >
              Nom de l&apos;utilisateur
            </label>

            <input
              type='text'
              id='LastName'
              name='last_name'
              className='mt-1 w-full rounded-md border-gray-200 bg-white text-sm h-8 border px-2 text-gray-700 shadow-sm'
              onChange={(e) => {
                setVisitorForm({ ...visitorForm, lastName: e.target.value });
              }}
              value={visitorForm.lastName}
              placeholder='Ex: Châtillon'
            />
          </div>
          <div className='col-span-6 sm:col-span-3'>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-gray-700'
            >
              Email de l&apos;utilisateur
            </label>

            <input
              type='text'
              id='email'
              name='email'
              className='mt-1 w-full rounded-md border-gray-200 bg-white text-sm h-8 border px-2 text-gray-700 shadow-sm'
              onChange={(e) => {
                setVisitorForm({ ...visitorForm, email: e.target.value });
              }}
              value={visitorForm.email}
              placeholder='Ex: alexischatillon@gmail.com'
            />
          </div>
        </form>
        {/* <div className='mt-4'>
          <label
            htmlFor='Name'
            className='block text-sm font-medium text-gray-700 mb-2'
          >
            Rôle de l&apos;utilisateur
          </label>

          <select
            className='select select-bordered w-full max-w-xs focus:outline-none'
            defaultValue={user ? user.role : 'undefined'}
            onChange={(e) =>
              setUserForm({
                ...userForm,
                role: e.target.value as User['role'],
              })
            }
          >
            <option value='undefined'>undefined</option>
            <option value='admin'>admin</option>
            <option value='receptioniste'>receptioniste</option>
            <option value='veterinaire'>veterinaire</option>
            <option value='agentEntretien'>agentEntretien</option>
            <option value='vendeur'>vendeur</option>
          </select>
        </div> */}
        <button className='btn btn-success mt-4' onClick={handleClick}>
          Confirmer
        </button>
      </form>
    </dialog>
  );
};

export default VisitorCreationModal;
