const DASHBOARD_API_URL = "http://localhost:3000";

export type AssessmentSession = {
  id: number;
  participant_name: string;
  question_count: number;
  result_level: "low" | "moderate" | "high";
  score: number;
  completed_at: string;
  created_at: string;
};

export const getAssessmentSession = async () => {
  const response = await fetch(`${DASHBOARD_API_URL}/api/assessment-sessions`);

  if(!response.ok) {
    throw new Error("Unable to load assessment sessions")
  }

  // The response will become an array of AssessmentSession objects.
  return response.json() as Promise<AssessmentSession[]>;
};
