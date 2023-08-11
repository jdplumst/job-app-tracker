import { api } from "@/types/global";
import { useQuery } from "react-query";

export default function useSession() {
  const { data, isLoading } = useQuery("user", async () => {
    const response = await fetch(`${api}/user`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (!response.ok) {
      return null;
    }
    return response.json();
  });
  return { data, isLoading };
}
