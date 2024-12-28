import { cookies } from "next/headers";

export async function checkAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get("Authentication");
  return !!token?.value;
}
