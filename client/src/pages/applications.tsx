import LoadingSpinner from "@/components/LoadingSpinner";
import useSession from "@/hooks/useSession";
import Head from "next/head";
import Router from "next/router";
import moment from "moment";
import useGetApps from "@/hooks/useGetApps";
import useCreateApp from "@/hooks/useCreateApp";
import { useState } from "react";
import Modal from "@/components/Modal";
import { ApiError, Application, Status } from "@/types/api";

const defaultApplication = {
  id: "",
  appliedDate: "",
  title: "",
  board: "",
  postingURL: "",
  company: "",
  companyDescription: "",
  jobDescription: "",
  qualifications: "",
  compensation: undefined,
  location: "",
  notes: undefined,
  status: Status.Saved,
  authorId: "",
};

export default function Applications() {
  const [createModal, setCreateModal] = useState(false);
  const [application, setApplication] =
    useState<Application>(defaultApplication);

  const { data: user, isLoading: userLoading } = useSession();
  if (!user && !userLoading) {
    Router.push("/");
  }

  const {
    data: applications,
    isLoading: applicationLoading,
    error,
  } = useGetApps(user);

  const {
    mutate: createApp,
    isLoading: createLoading,
    error: createError,
  } = useCreateApp();

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
      <main className="flex min-h-screen min-w-full flex-col items-center gap-8 overflow-y-auto bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-10 text-white">
        <h1 className="text-center text-5xl font-bold">
          {user.username}&apos;s Applications
        </h1>
        <div className="grid w-full grid-cols-4">
          <div className="col-span-1 mx-auto">Filters here</div>

          <div className="col-span-3 mx-auto flex min-w-[75%] flex-col gap-5 sm:w-[25%]">
            <button
              disabled={createLoading}
              onClick={() => setCreateModal(true)}
              className="w-40 rounded-full bg-green-500 p-2 font-bold hover:bg-green-600"
            >
              {createLoading ? <LoadingSpinner /> : "Add New Application"}
            </button>
            {applicationLoading && <LoadingSpinner />}
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
                      {moment(a.appliedDate).format("MMMM Do YYYY, h:mm a")}
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
        </div>
        {createModal && (
          <Modal>
            <form>
              <h3 className="pb-5 text-center text-3xl font-bold">
                Add New Job Application
              </h3>
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="title" className="text-xl font-semibold">
                      Job Title:
                    </label>
                    <input
                      id="title"
                      name="title"
                      value={application.title}
                      onChange={(e) =>
                        setApplication({
                          ...application,
                          title: e.target.value,
                        })
                      }
                      className="w-full p-2 text-black outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="location" className="text-xl font-semibold">
                      Job Location:
                    </label>
                    <input
                      id="location"
                      name="location"
                      value={application.location}
                      onChange={(e) =>
                        setApplication({
                          ...application,
                          location: e.target.value,
                        })
                      }
                      className="w-full p-2 text-black outline-none"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="board" className="text-xl font-semibold">
                      Job Board:
                    </label>
                    <input
                      id="board"
                      name="board"
                      value={application.board}
                      onChange={(e) =>
                        setApplication({
                          ...application,
                          board: e.target.value,
                        })
                      }
                      className="w-full p-2 text-black outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="url" className="text-xl font-semibold">
                      Posting URL:
                    </label>
                    <input
                      id="url"
                      name="url"
                      value={application.postingURL}
                      onChange={(e) =>
                        setApplication({
                          ...application,
                          postingURL: e.target.value,
                        })
                      }
                      className="w-full p-2 text-black outline-none"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="company" className="text-xl font-semibold">
                      Company:
                    </label>
                    <input
                      id="company"
                      name="company"
                      value={application.company}
                      onChange={(e) =>
                        setApplication({
                          ...application,
                          company: e.target.value,
                        })
                      }
                      className="w-full p-2 text-black outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="status" className="text-xl font-semibold">
                      Status:
                    </label>
                    <select
                      id="status"
                      name="status"
                      value={application.status}
                      onChange={(e) =>
                        setApplication({
                          ...application,
                          status: e.target.value as Status,
                        })
                      }
                      className="w-full p-2 text-black outline-none"
                    >
                      {Object.values(Status).map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1">
                  <div>
                    <label htmlFor="date" className="text-xl font-semibold">
                      Applied Date:
                    </label>
                    <input
                      id="date"
                      name="date"
                      type="datetime-local"
                      value={application.appliedDate?.toString()}
                      onChange={(e) =>
                        setApplication({
                          ...application,
                          appliedDate: e.target.value,
                        })
                      }
                      className="w-full p-2 text-black outline-none"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="jobDescription"
                      className="text-xl font-semibold"
                    >
                      Job Description:
                    </label>
                    <textarea
                      id="jobDescription"
                      name="jobDescription"
                      value={application.jobDescription}
                      onChange={(e) =>
                        setApplication({
                          ...application,
                          jobDescription: e.target.value,
                        })
                      }
                      className="w-full p-2 text-black outline-none"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="companyDescription"
                      className="text-xl font-semibold"
                    >
                      Company Description:
                    </label>
                    <textarea
                      id="companyDescription"
                      name="companyDescription"
                      value={application.companyDescription}
                      onChange={(e) =>
                        setApplication({
                          ...application,
                          companyDescription: e.target.value,
                        })
                      }
                      className="w-full p-2 text-black outline-none"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="qualifications"
                      className="text-xl font-semibold"
                    >
                      Qualifications:
                    </label>
                    <textarea
                      id="qualifications"
                      name="qualifications"
                      value={application.qualifications}
                      onChange={(e) =>
                        setApplication({
                          ...application,
                          qualifications: e.target.value,
                        })
                      }
                      className="w-full p-2 text-black outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="notes" className="text-xl font-semibold">
                      Notes:
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      value={application.notes}
                      onChange={(e) =>
                        setApplication({
                          ...application,
                          notes: e.target.value,
                        })
                      }
                      className="w-full p-2 text-black outline-none"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-5 pt-2">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setCreateModal(false);
                    setApplication(defaultApplication);
                  }}
                  className="w-40 rounded-lg border-2 border-white bg-black p-2 font-bold hover:bg-slate-900"
                >
                  Cancel
                </button>
                <button
                  disabled={createLoading}
                  onClick={(e) => {
                    e.preventDefault();
                    createApp(
                      {
                        ...application,
                        appliedDate: isNaN(
                          Date.parse(application.appliedDate as string),
                        )
                          ? undefined
                          : moment(
                              new Date(application.appliedDate as string),
                            ).format(),
                      },
                      {
                        onSuccess(data, variables, context) {
                          setCreateModal(false);
                          setApplication(defaultApplication);
                        },
                      },
                    );
                  }}
                  className="w-40 rounded-lg bg-green-500 p-2 font-bold hover:bg-green-600"
                >
                  Add Application
                </button>
              </div>
              {(createError as ApiError) && (
                <div className="text-center text-red-500">
                  {(createError as ApiError).message}
                </div>
              )}
            </form>
          </Modal>
        )}
      </main>
    </>
  );
}
