import { Application, User } from "@/types/api";
import { api } from "@/types/global";
import { useQuery } from "react-query";

export default function useGetApplications(user: User | undefined) {
  const { data, isLoading, error } = useQuery<Application[]>(
    "applications",
    async () => {
      const response = await fetch(`${api}/application`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        const error = await response.json();
        throw Error(error.message);
      }
      return response.json();
    },
    { enabled: !!user },
  );
  return { data, isLoading, error };
}
