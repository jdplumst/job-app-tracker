import LoadingSpinner from "@/components/LoadingSpinner";
import useGetApplications from "@/hooks/useGetApplications";
import useSession from "@/hooks/useSession";
import Head from "next/head";
import Router from "next/router";

export default function Applications() {
  const { data: user, isLoading: userLoading } = useSession();
  if (!user && !userLoading) {
    Router.push("/");
  }

  const {
    data: applications,
    isLoading: applicationLoading,
    error,
  } = useGetApplications(user);

  if (!user || userLoading)
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        <LoadingSpinner />
      </div>
    );

  if (!error) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        <div className="font-medium">
          Something went wrong. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Job Application Tracker</title>
        <meta name="description" content="Job Application Tracker" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen min-w-full flex-col items-center gap-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-10 text-white">
        <h1 className="text-center text-5xl font-bold">
          {user.username}&apos;s Applications
        </h1>
      </main>
    </>
  );
}
