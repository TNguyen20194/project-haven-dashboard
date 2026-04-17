
import { getCurrentUser, logoutUser } from "@/lib/auth-storage";
import { useNavigate } from "react-router-dom";
import Button from "@/UI/button";
const DashboardPage = () => {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  const handleLogout = () => {
    logoutUser();
    navigate("/auth?mode=login");
  };

  return (
    <main className="min-h-screen bg-[hsl(var(--background))] px-6 py-12">
      <div className="mx-auto max-w-2xl rounded-2xl border bg-[hsl(var(--card))] p-8 shadow-sm">
        <h1 className="mb-4 text-3xl font-semibold text-[hsl(var(--green-1))]">
          Dashboard
        </h1>

        <p className="mb-2 text-[hsl(var(--green-1))]">
          Welcome back{currentUser?.fullName ? `, ${currentUser.fullName}` : ""}
        </p>

        <p className="mb-8 text-sm text-[hsl(var(--muted-foreground))]">
          {currentUser?.email ?? "No user found."}
        </p>

        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </main>
  );
};

export default DashboardPage;
