import { getCurrentUser, logoutUser } from "@/lib/auth-storage";
import { useNavigate } from "react-router-dom";
import Button from "@/UI/button";

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

const getResultBadgeClass = (tone: "success") => {
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
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
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
      </div>
    </main>
  );
};

export default DashboardPage;
