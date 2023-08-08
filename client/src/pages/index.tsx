import Login from "@/components/Login";
import Register from "@/components/Register";
import { Form } from "@/types/global";
import Head from "next/head";
import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState<Form>("login");

  const changeForm = (f: Form) => {
    setForm(f);
    return;
  };

  return (
    <>
      <Head>
        <title>Budget App</title>
        <meta name="description" content="Job Application Tracker" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen min-w-full flex-col items-center gap-10 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-10 text-white">
        <h1 className="text-center text-5xl font-bold">
          Job Application Tracker
        </h1>
        <h2 className="text-center text-3xl font-semibold">
          Keep track of all your job applications
        </h2>
        {form === "login" && <Login changeForm={changeForm} />}
        {form === "register" && <Register changeForm={changeForm} />}
      </main>
    </>
  );
}
