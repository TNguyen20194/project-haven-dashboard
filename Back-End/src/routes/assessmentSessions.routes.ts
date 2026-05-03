import { Router } from "express";
import supabase from "../../client/client.js";

const router = Router();

router.post("/", async (req, res) => {
  const { questionCount, resultLevel, score, completedAt } = req.body;

  if (!questionCount || !resultLevel || !score || !completedAt) {
    return res.status(400).json({
      error: "Missing required assessment session fields.",
    });
  }

  const { data, error } = await supabase
    .from("assessment_sessions")
    .insert({
      question_count: questionCount,
      result_level: resultLevel,
      score,
      completed_at: completedAt,
    })
    .select()
    .single();

  if (error) {
    return res.status(500).json({
      error: error.message,
    });
  }

  const participantName = `Participant #${String(data.id).padStart(3, "0")}`;

  const { data: updatedSession, error: updateError } = await supabase
    .from("assessment_sessions")
    .update({
      participant_name: participantName,
    })
    .eq("id", data.id)
    .select()
    .single();

  if (updateError) {
    return res.status(500).json({
      error: updateError.message,
    });
  }

  return res.status(200).json({
    message: updatedSession,
  });
});

router.get("/", async (_req, res) => {
  const { data, error } = await supabase
    .from("assessment_sessions")
    .select("*")
    .order("completed_at", { ascending: false });

  if (error) {
    return res.status(500).json({
      error: error.message,
    });
  }

  return res.status(200).json(data);
});

export default router;
