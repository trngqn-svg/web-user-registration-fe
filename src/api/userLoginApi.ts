export interface LoginPayload{
  email: string;
  password: string;
}

export interface LoginResponse{
  message?: string;
}

export const loginUser = async (payload: LoginPayload): Promise<LoginResponse> => {
  const res = await fetch("http://localhost:3000/user/login", {
    method: "POST",
    headers: { "Content-type": "application/json"},
    body: JSON.stringify(payload),
  });

  const data: LoginResponse = await res.json();

  if (!res.ok) throw new Error(data.message || "Login failed");
  return data;
}