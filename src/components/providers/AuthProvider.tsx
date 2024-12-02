/* eslint-disable react-refresh/only-export-components */
import { auth } from "@/lib/firebase";
import { User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

type TAuthContext = {
  isAuthLoading: boolean;
  user: User | null;
};

const AuthContext = createContext<TAuthContext>({
  isAuthLoading: false,
  user: null,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      setAuthLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthLoading, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
