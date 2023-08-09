import { Form } from "@/types/global";
import { useState } from "react";

interface IRegisterProps {
  changeForm: (f: Form) => void;
}

export default function Register({ changeForm }: IRegisterProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(false);

  return (
    <div className="flex min-w-[25%] flex-col rounded-lg border-2 p-8">
      <h3 className="pb-5 text-center text-3xl font-semibold">Signup</h3>
      <form className="flex w-full flex-col gap-5 pb-5">
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
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-lg border-0 p-2 text-black outline-0"
          />
        </div>
        <button
          disabled={disabled}
          className="rounded-lg bg-white p-4 text-xl font-bold text-purple-500 hover:cursor-pointer hover:bg-slate-200"
        >
          Signup
        </button>
      </form>
      <button onClick={() => changeForm("login")} className="pt-5 underline">
        Already have an account? Login here.
      </button>
    </div>
  );
}
