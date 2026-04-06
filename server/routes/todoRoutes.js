import {
    renderHome,
    renderIndex,
    createTodo,
    editTodo,
    deleteTodo,
    setDuration
} from "../controllers/TodoController.js"
import { isAuthenticated } from "../middleware/auth.js"
import express from "express"

const router = express.Router()

router.get("/", renderHome);
router.get("/todos", isAuthenticated, renderIndex)
router.post("/add", isAuthenticated, createTodo);
router.post("/edit", isAuthenticated, editTodo);
router.post("/delete", isAuthenticated, deleteTodo);
router.post("/duration", isAuthenticated, setDuration);

export default router;
