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
        className={`flex min-h-screen flex-col items-center justify-evenly`}></main>
    </>
  );
}
