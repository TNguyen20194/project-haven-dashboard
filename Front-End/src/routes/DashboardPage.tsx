import { getCurrentUser, logoutUser } from "@/lib/auth-storage";
import { useNavigate } from "react-router-dom";
import Button from "@/UI/button";
import { ClipboardList } from "lucide-react";
import { tr } from "zod/v4/locales";

const sessions = [
  {
    id: 1,
    name: "Emily Carter",
    email: "emily.carter@email.com",
    completed: "2026-03-22 09:14",
    questions: 15,
    duration: "12m 30s",
    status: "Completed",
    topResultLabel: "Anxiety",
    topResultScore: "62/100",
    resultTone: "warning",
  },
  {
    id: 2,
    name: "James Rivera",
    email: "james.r@email.com",
    completed: "2026-03-22 08:41",
    questions: 15,
    duration: "9m 15s",
    status: "Completed",
    topResultLabel: "Burnout Risk",
    topResultScore: "84/100",
    resultTone: "success",
  },
  {
    id: 3,
    name: "Aisha Patel",
    email: "aisha.p@email.com",
    completed: "2026-03-21 17:22",
    questions: 12,
    duration: "14m 05s",
    status: "Partial",
    topResultLabel: "Overall Wellness",
    topResultScore: "88/100",
    resultTone: "success",
  },
  {
    id: 4,
    name: "Marcus Thompson",
    email: "marcus.t@email.com",
    completed: "2026-03-21 14:05",
    questions: 15,
    duration: "11m 48s",
    status: "Completed",
    topResultLabel: "Stress Management",
    topResultScore: "55/100",
    resultTone: "warning",
  },
];

const getStatusClasses = (status: string) => {
  if (status === "Completed") {
    return "bg-blue-600 text-white";
  }

  return "bg-neutral-200 text-neutral-700";
};

const getResultBadgeClasses = (tone: "success" | "warning") => {
  if (tone === "success") {
    return "bg-emerald-50 text-emerald-600 ring-1 ring-inset ring-emerald-200";
  }

  return "bg-amber-50 text-amber-600 ring-1 ring-inset ring-amber-200";
};

const DashboardPage = () => {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  const handleLogout = () => {
    logoutUser();
    navigate("/auth?mode=login");
  };

  return (
    <main className="min-h-screen bg-[hsl(var(--background))] px-6 py-12 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className=" dashboard mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
              Dashboard
            </h1>
            <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">
              Completed questionnaire sessions
            </p>

            <div className="mt-4 text-sm text-[hsl(var(--muted-foreground))]">
              Welcome back
              {currentUser?.fullName ? `, ${currentUser.fullName}` : ""}
            </div>
          </div>
        </div>
        <Button onClick={handleLogout}>Logout</Button>

        {/* CONTENT TABLE */}
        <section className="overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] shadow-sm mt-5">
          <div className="border-b border-[hsl(var(--border))] px-6 py-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="mt-0.5 rounded-lg bg-blue-50 p-2 text-blue-600">
                <ClipboardList className="h-5 w-5" />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-[hsl(var(--green-1))]">
                  Completed Questionnaire Sessions
                </h2>
              </div>
            </div>
            <p className="mt-1 text-sm text-[hsl(var(--green-1))]">
              Therapy questionnaire answers and personalized results from each
              user session
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left table-fixed border-collaspe">
              <thead className="bg-[hsl(var(--card))]">
                <tr className="border-b-[1px] border-[hsl(var(--green-1)/0.25)]">
                  <th className="w-1/4 px-6 py-4 text-sm font-medium text-[hsl(var(--green-1))]">
                    User
                  </th>
                  <th className="w-1/4 px-6 py-4 text-sm font-medium text-[hsl(var(--green-1))]">
                    Completed
                  </th>
                  <th className="w-1/4 px-6 py-4 text-sm font-medium text-[hsl(var(--green-1))]">
                    Questions
                  </th>
                  <th className="w-1/4 px-6 py-4 text-sm font-medium text-[hsl(var(--green-1))]">
                    Top Results
                  </th>
                </tr>
              </thead>
              <tbody>
                {sessions.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-8 text-center text-sm text-[hsl(var(--green-1))]"
                    >
                      No Sessions Foumd.
                    </td>
                  </tr>
                ) : (
                  sessions.map((session) => {
                    return (
                      <tr
                        key={session.id}
                        className="border-b-[1px] border-[hsl(var(--green-1)/0.25)] last:border-b-0 hover:bg-[hsl(var(--muted)/0.35)]"
                      >
                        <td className="px-6 py-5">
                          <div className="font-medium text-[hsl(var(--foreground))]">
                            {session.name}
                          </div>
                          <div className="mt-1 text-sm text-[hsl(var(--green-1))]">
                            {session.email}
                          </div>
                        </td>

                        <td className="px-6 py-5 text-sm text-[hsl(var(--green-1))]">
                          {session.completed}
                        </td>

                        <td className="px-6 py-5 text-sm text-[hsl(var(--green-1))]">
                          {session.questions}
                        </td>

                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2 text-sm text-[hsl(var(--green-1))]">
                            <span>{session.topResultLabel}</span>
                            <span
                              className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getResultBadgeClasses(
                                session.resultTone as "success" | "warning",
                              )}`}
                            >
                              {session.topResultScore}
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
};

export default DashboardPage;

