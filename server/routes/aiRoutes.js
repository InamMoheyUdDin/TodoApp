import express from "express"
import { aiAgentController, aiAgentAddTodo } from "../controllers/aiController.js"
import { isAuthenticated } from "../middleware/auth.js"

const router = express.Router()

router.post("/ai-agent", isAuthenticated, aiAgentController)

router.post("/api/add-todo", async (req, res) => {
  const { title, user_id } = req.body;

  try {
    await db.query(
      "INSERT INTO items(title, duration, user_id) VALUES($1, $2, $3)",
      [title, "today", user_id]
    );

    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
  }
});

export default router