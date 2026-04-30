import { getCurrentUser, logoutUser } from "@/lib/auth-storage";
import { useNavigate } from "react-router-dom";
import Button from "@/UI/button";
import { ClipboardList } from "lucide-react";

const sessions = [
  {
    id: 1,
    name: "Participant #1042",
    completed: "2026-03-22 09:14",
    questions: 10,
    topResultStatus: "Moderate",
  },
  {
    id: 2,
    name: "Participant #1043",
    completed: "2026-03-22 08:41",
    questions: 10,
    topResultStatus: "High Concern",
  },
  {
    id: 3,
    name: "Participant #1044",
    completed: "2026-03-21 17:22",
    questions: 10,
    topResultStatus: "Low Concern",
  },
];

const getTopResultPillClasses = (status: string) => {
  switch (status) {
    case "Low Concern":
      return "bg-[#EAF8EF] text-[#15803D]";

    case "Moderate":
      return "bg-[#FDF4D7] text-[#A16207]";

    case "High Concern":
      return "bg-[#FDE8E8] text-[#DC2626]";

    default:
      return "bg-gray-100 text-gray-700";
  }
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
                  <th className="w-1/4 px-6 py-4 text-sm font-medium text-[hsl(var(--green-1)/0.8)]">
                    User
                  </th>
                  <th className="w-1/4 px-6 py-4 text-sm font-medium text-[hsl(var(--green-1)/0.8)]">
                    Completed
                  </th>
                  <th className="w-1/4 px-6 py-4 text-sm font-medium text-[hsl(var(--green-1)/0.8)]">
                    Questions
                  </th>
                  <th className="w-1/4 px-6 py-4 text-sm font-medium text-[hsl(var(--green-1)/0.8)]">
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
                        </td>

                        <td className="px-6 py-5 text-sm text-[hsl(var(--green-1))]">
                          {session.completed}
                        </td>

                        <td className="px-6 py-5 text-sm text-[hsl(var(--green-1))]">
                          {session.questions}
                        </td>

                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3 text-sm text-[hsl(var(--green-1))]">
                            <span
                              className={`inline-flex rounded-full px-4 py-1.5 text-xs font-medium ${getTopResultPillClasses(
                                session.topResultStatus,
                              )}`}
                            >
                              {session.topResultStatus}
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
