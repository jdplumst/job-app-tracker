import Head from "next/head";

export default function Applications() {
  return (
    <>
      <Head>
        <title>Job Application Tracker</title>
        <meta name="description" content="Job Application Tracker" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen min-w-full flex-col items-center gap-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-10 text-white">
        <h1 className="text-center text-5xl font-bold">Your Applications</h1>
      </main>
    </>
  );
}