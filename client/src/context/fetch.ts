import { Animal, Session, Specie, User, Visitor } from './interface';

export const getUserInfo = async (
  userInfo: User | null,
  session: Session | null
): Promise<User | null> => {
  if (userInfo === null) {
    if (session !== null) {
      return fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.accessToken}`,
        },
      })
        .then(async (res) => {
          if (res.status === 200) {
            const data: User = await res.json();
            return data;
          }
          return null;
        })
        .catch((err) => {
          console.log(err);
          return null;
        });
    }
    return null;
  }
  return null;
};

export const getAllAnimals = async (): Promise<Animal[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/animal`, {
    method: 'GET',
    next: { revalidate: 60 },
  });
  const data = await res.json();
  return data;
};
export const getAllSpecies = async (): Promise<Specie[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/specie`, {
    method: 'GET',
    next: { revalidate: 60 },
  });
  const data = await res.json();
  return data;
};
export const getAllVisitors = async (): Promise<Visitor[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/visitor`, {
    method: 'GET',
    next: { revalidate: 60 },
  });
  const data = await res.json();
  return data;
};
