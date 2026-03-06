import { useState } from 'react';
import { UserContext } from './useGlobalContext';
import type { User } from '../../types/UserType';

const defaultUser: User = {
  id: 0,
  email: '',
  firstName: '',
  lastName: '',
};

export default function GlobalContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider
      value={{
        user: user || defaultUser,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
