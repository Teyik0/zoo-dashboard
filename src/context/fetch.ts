import { Session, User } from './interface';

export const getUserInfo = async (
  userInfo: User | null,
  session: Session | null
): Promise<User | null> => {
  if (userInfo === null) {
    if (session !== null) {
      return fetch(`${'http://localhost:3000'}/user/profile`, {
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
