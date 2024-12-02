import { Redirect } from "wouter";
import { useAuth } from "./AuthProvider";

export function SecureProvider({ children }: { children: React.ReactNode }) {
  const { isAuthLoading, user } = useAuth();
  if (isAuthLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (!user) {
    return <Redirect to="/login" />;
  }

  return <>{children}</>;
}
