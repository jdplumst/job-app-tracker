import { User } from "@/types/api";
import { api } from "@/types/global";
import { useQuery } from "react-query";

export default function useGetApplications(user: User) {
  const { data, isLoading, error } = useQuery(
    "applications",
    async (id) => {
      const response = await fetch(`${api}/applications/${user.id}`, {
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
      return;
    },
    { enabled: !!user },
  );
  return { data, isLoading, error };
}
