import { Auth } from "@/types/api";
import { api } from "@/types/global";
import { useMutation } from "react-query";

export default function useRegister() {
  const { mutate, isLoading, error } = useMutation(
    async ({ username, password }: Auth) => {
      const response = await fetch(`${api}/auth/signup`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });
      if (!response.ok) {
        const error = await response.json();
        throw Error(error.message);
      }
      return;
    },
  );
  return { mutate, isLoading, error };
}
