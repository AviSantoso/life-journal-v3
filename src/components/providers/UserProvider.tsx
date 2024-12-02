/* eslint-disable react-refresh/only-export-components */
import { auth } from "@/lib/firebase";
import { User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext<User | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export function useUser() {
  return useContext(UserContext);
}
