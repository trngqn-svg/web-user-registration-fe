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
  const API_URL = import.meta.env.VITE_BASE_URL;
  console.log(API_URL);

  const res = await fetch(`${API_URL}/user/register`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data: RegisterResponse = await res.json();

  if (!res.ok) throw new Error(data.message || "Registration failed");
  return data;
}