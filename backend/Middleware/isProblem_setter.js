export const isProblem_setter = (req, res, next) => {
  if (req.user?.role !== "problem_setter") {
    return res
      .status(403)
      .json({ message: "Access denied: only problem setters allowed" });
  }
  next();
};
