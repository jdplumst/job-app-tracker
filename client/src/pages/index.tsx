import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Budget App</title>
        <meta name="description" content="Job Application Tracker" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className={`flex min-h-screen flex-col items-center justify-evenly`}>
        <h1 className="text-8xl font-bold">Job Application Tracker</h1>
        <div className="flex gap-10">
          <button className="h-28 w-60 rounded-lg border-2 border-black bg-purple-500 p-4 text-4xl font-bold text-white hover:cursor-pointer hover:bg-purple-600">
            Log In
          </button>
          <button className="h-28 w-60 rounded-lg border-2 border-black bg-green-500 p-4 text-4xl font-bold text-white hover:cursor-pointer hover:bg-green-600">
            Sign Up
          </button>
          <button className="h-28 w-60 rounded-lg border-2 border-black bg-blue-500 p-4 text-4xl font-bold text-white hover:cursor-pointer hover:bg-blue-600">
            Guest Login
          </button>
        </div>
      </main>
    </>
  );
}
