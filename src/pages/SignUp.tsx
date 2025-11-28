import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { registerUser } from '../api/userRegisterApi.ts';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar.tsx';
import type { SubmitHandler } from "react-hook-form";
import type { RegisterPayload, RegisterForm } from '../api/userRegisterApi.ts';

export default function SignUp(){
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>();

  const mutation = useMutation({
    mutationFn: (data: RegisterPayload) => registerUser(data),
  });

  const handleSignUp: SubmitHandler<RegisterForm> = (formData) => {
    const payload: RegisterPayload = {
      email: formData.email,
      password: formData.password,
    };
    mutation.mutate(payload);
  }

  return (
    <>
      <Navbar />
      <div className="max-w-md mx-auto mt-10 p-6 shadow rounded-xl bg-white">
        <h1 className="text-2xl font-semibold mb-4">Sign up</h1>

        <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
          <div>
            <label>Email</label>
            <input
              placeholder="Enter email"
              className="w-full border p-2 rounded"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                  message: "Invalid email format",
                },
              })}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <label>Password</label>
            <input
              placeholder="Enter password"
              type="password"
              className="w-full border p-2 rounded"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
              })}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <div>
            <label>Repeat Password</label>
            <input
              placeholder="Repeat password"
              type="password"
              className="w-full border p-2 rounded"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value, values) => {
                  return value === values.password || "Password does not match"
                },
              })}
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
          </div>

          <div>
            <div className='flex items-center gap-1'>
              <input 
                type="checkbox"
                {...register("agreed", {
                  required: "You must accept the Terms & Privacy",
                })}
              />
              <p className='text-sm'>I agree with the 
                <a href="" className='text-blue-600 mx-1 text-sm underline'>
                  Terms & Privacy
                </a>
              </p>
            </div>
            {errors.agreed && <p className="text-red-500 text-sm">{errors.agreed.message}</p>}
          </div>

          {mutation.isError && (
            <p className="text-red-600 text-sm">{(mutation.error as Error).message}</p>
          )}

          {mutation.isSuccess && (
            <p className="text-green-600 text-sm">Registered successfully!</p>
          )}

          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
          >
            {mutation.isPending ? "Creating..." : "Sign Up"}
          </button>
        </form>


        <p className="mt-4 text-sm text-center">
          Already have an account? <Link className="underline" to="/login">Login</Link>
        </p>
      </div>
    </>
  );
}