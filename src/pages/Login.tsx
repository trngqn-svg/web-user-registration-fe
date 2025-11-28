import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../api/userLoginApi';
import Navbar from '../components/Navbar/Navbar';
import type { ChangeEvent } from 'react';
import type { LoginPayload } from '../api/userLoginApi';

export default function Login(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const mutation = useMutation({
    mutationFn: (data: LoginPayload) => loginUser(data),
    onSuccess: (data) => {
      setEmail("");
      setPassword("");
      alert(data.message || "Login successful");
    },
  });

  const handleLogin = () => {
    const data: LoginPayload = {
      email: email,
      password: password,
    }
    mutation.mutate(data);
  };

  return (
    <>
      <Navbar />
      <div className="max-w-md mx-auto mt-10 p-6 shadow rounded-xl bg-white">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>

        <div className="space-y-4">
          <label>Email</label>
          <input
            placeholder="Enter email"
            className="w-full border p-2 rounded"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            className="w-full border p-2 rounded"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          />

          <button
            className="w-full bg-indigo-600 text-white py-2 rounded cursor-pointer hover:bg-indigo-700"
            onClick={handleLogin}
          >
            {mutation.isPending ? "Logging in..." : "Login"}
          </button>

          {mutation.isError && (
            <p className="text-red-600 text-sm">{(mutation.error as Error).message}</p>
          )}

          <p className="mt-4 text-sm text-center">
            Don't have an account? <Link className="underline" to="/register">Sign Up</Link>
          </p>
        </div>
      </div>
    </>
  );
}