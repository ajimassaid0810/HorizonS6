import axios from "axios";

const apiUrl ="http://localhost:3002/api/v1" ;

export async function signIn({ email, password }: { email: string; password: string }) {
   // Ambil URL dari .env
  if (!apiUrl) {
    throw new Error("API URL not defined in .env file");
  }

  const response = await axios.post(`${apiUrl}/auth/login`, {
    email,
    password,
  });

  return response.data;
}
