import express from "express"
import { aiAgentController, aiAgentAddTodo } from "../controllers/aiController.js"
import { isAuthenticated } from "../middleware/auth.js"

const router = express.Router()

router.post("/ai-agent", isAuthenticated, aiAgentController)
router.post("api/add-todo", isAuthenticated, aiAgentAddTodo)

export default router