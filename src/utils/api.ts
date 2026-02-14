import type { ApiUser } from "../Interfaces/apiUser";

const API_URL = "https://jsonplaceholder.typicode.com/users";

export async function fetchUsers(): Promise<ApiUser[]> {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error(`API Hatası: ${response.status} ${response.statusText}`);
  }
  const data = (await response.json()) as Array<{
    id: number
    name: string
    email: string
    phone?: string
    company?: { name: string }
  }>;
  return data.map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    phone: u.phone,
    company: u.company,
  }));
}
