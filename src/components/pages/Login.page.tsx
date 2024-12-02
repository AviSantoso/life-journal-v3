import { Button } from "@/components/ui/button";
import { login } from "@/lib/googleAuth";
import { useAuth } from "../providers/AuthProvider";
import { Redirect } from "wouter";

export default function Page() {
  const { user } = useAuth();
  if (user) {
    return <Redirect to="/" />;
  }
  return (
    <div className="flex items-center justify-center min-h-screen w-screen bg-gray-100">
      <div className="p-6 bg-white rounded shadow-md">
        <h2 className="mb-4 text-2xl font-semibold text-center">Login</h2>
        <Button
          variant="default"
          onClick={login}
          className="w-full flex items-center justify-center hover:bg-gray-200"
        >
          <img src="/google.svg" alt="Google" className="w-4 h-4 mr-2" />
          Sign in with Google
        </Button>
      </div>
    </div>
  );
}
