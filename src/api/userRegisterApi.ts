export interface RegisterPayload{
  email: string;
  password: string;
}

export interface RegisterForm{
  email: string;
  password: string;
  confirmPassword: string;
  agreed: boolean;
}

export interface RegisterResponse{
  message?: string;
}

export const registerUser = async (payload: RegisterPayload): Promise<RegisterResponse> => {
  const res = await fetch("http://localhost:3000/user/register", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data: RegisterResponse = await res.json();

  if (!res.ok) throw new Error(data.message || "Registration failed");
  return data;
}