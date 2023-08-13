import { Application } from "@/types/api";
import { api } from "@/types/global";
import { useMutation } from "react-query";

export default function useUpdateApp() {
  const { mutate, isLoading, error } = useMutation(async (a: Application) => {
    const response = await fetch(`${api}/application/${a.id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(a),
      credentials: "include",
    });
    if (!response.ok) {
      const error = await response.json();
      throw Error(error.message);
    }
    return;
  });
  return { mutate, isLoading, error };
}
