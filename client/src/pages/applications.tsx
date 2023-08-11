import LoadingSpinner from "@/components/LoadingSpinner";
import useSession from "@/hooks/useSession";
import Head from "next/head";
import Router from "next/router";
import moment from "moment";
import useGetApps from "@/hooks/useGetApps";

export default function Applications() {
  const { data: user, isLoading: userLoading } = useSession();
  if (!user && !userLoading) {
    Router.push("/");
  }

  const {
    data: applications,
    isLoading: applicationLoading,
    error,
  } = useGetApps(user);

  if (!user || userLoading)
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        <LoadingSpinner />
      </div>
    );

  if (error) {
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
        <div className="flex min-w-[75%] flex-col gap-5 sm:min-w-[50%]">
          {applications?.map((a) => (
            <div
              key={a.id}
              className="flex flex-col rounded-lg border-2 p-4 sm:text-xl"
            >
              <div className="font-bold">
                {a.title} · {a.company}
              </div>
              <div className="font-bold">
                {a.location} · {a.board}
              </div>
              <div className="underline underline-offset-2">
                <a href={`//${a.postingURL}`}>{a.postingURL}</a>
              </div>
              <div className="pt-5 font-semibold">Application Status:</div>
              <div>{a.status}</div>
              {a.appliedDate && (
                <>
                  <div className="pt-5 font-semibold">Application Date:</div>
                  <div>
                    {moment(a.appliedDate).format("MMMM Do YYYY, h:mm:ss a")}
                  </div>
                </>
              )}
              <div className="pt-5 font-semibold">Job Description:</div>
              <div>{a.jobDescription}</div>
              <div className="pt-5 font-semibold">Qualifications:</div>
              <div>{a.qualifications}</div>
              <div className="pt-5 font-semibold">Company Description:</div>
              <div>{a.companyDescription}</div>
              {a.compensation && (
                <>
                  <div className="pt-5 font-semibold">Compensation:</div>
                  <div>{a.compensation}</div>
                </>
              )}
              {a.notes && (
                <>
                  <div className="pt-5 font-semibold">Notes:</div>
                  <div>{a.notes}</div>
                </>
              )}
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
