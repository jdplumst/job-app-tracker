import useRegister from "@/hooks/useRegister";
import { ApiError } from "@/types/api";
import { Form } from "@/types/global";
import { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

interface IRegisterProps {
  changeForm: (f: Form) => void;
}

export default function Register({ changeForm }: IRegisterProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { mutate, isLoading, error } = useRegister();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(
      { username, password },
      {
        onSuccess(data, variables, context) {
          console.log(data);
        },
      },
    );
  };

  return (
    <div className="flex min-w-[25%] flex-col rounded-lg border-2 p-8">
      <h3 className="pb-5 text-center text-3xl font-semibold">Signup</h3>
      <form onSubmit={handleRegister} className="flex w-full flex-col gap-4">
        <div className="flex flex-col">
          <label htmlFor="username" className="text-xl font-medium">
            Username
          </label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="rounded-lg border-0 p-2 text-black outline-0"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="text-xl font-medium">
            Password
          </label>
          <input
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-lg border-0 p-2 text-black outline-0"
          />
        </div>
        <button
          disabled={isLoading}
          className="rounded-lg bg-white p-4 text-xl font-bold text-purple-500 hover:cursor-pointer hover:bg-slate-200"
        >
          {isLoading ? <LoadingSpinner /> : "Signup"}
        </button>
        {(error as ApiError) && (
          <div className="mx-auto w-full border-2 border-solid border-pink-600 bg-pink-500 p-2 text-center font-bold">
            {(error as ApiError).message}
          </div>
        )}
      </form>
      <button onClick={() => changeForm("login")} className="pt-5 underline">
        Already have an account? Login here.
      </button>
    </div>
  );
}
