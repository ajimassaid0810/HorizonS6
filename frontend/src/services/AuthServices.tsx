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

export async function logout() {
    const token = localStorage.getItem("authToken");
  
    await axios.post(`${apiUrl}/auth/logout`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
  }

  
// Register (Sign Up)
export async function signUp({
    nik,
    full_name,
    email,
    password,
    role,
    nip,
    instansi
  }: {
    nik: string;
    full_name: string;
    email: string;
    password: string;
    role?: string;
    nip?: string;
    instansi?: string;
  }) {
    const response = await axios.post(`${apiUrl}/auth/register`, {
      nik,
      full_name,
      email,
      password,
      role,
      nip,
      instansi,
    });
  
    return response.data;
  }