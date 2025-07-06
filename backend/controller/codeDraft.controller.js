import CodeDraft from "../models/codeDraft.model.js";

export const saveDraft = async (req, res) => {
  const { problemId, language, code } = req.body;
  const userId = req.user.id;

  try {
    const updated = await CodeDraft.findOneAndUpdate(
      { user: userId, problem: problemId, language },
      { code, updatedAt: new Date() },
      { new: true, upsert: true }
    );

    res.status(200).json({ message: "Draft saved", draft: updated });
  } catch (err) {
    console.error("Error saving draft:", err);
    res.status(500).json({ error: "Failed to save draft" });
  }
};

export const getDraft = async (req, res) => {
  const { problemId, language } = req.params;
  const userId = req.user.id;

  try {
    const draft = await CodeDraft.findOne({
      user: userId,
      problem: problemId,
      language,
    });

    if (!draft) return res.status(404).json({ message: "No draft found" });

    res.status(200).json({ draft });
  } catch (err) {
    console.error("Error fetching draft:", err);
    res.status(500).json({ error: "Failed to fetch draft" });
  }
};
