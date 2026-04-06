import express from "express"
import passport from "passport"
import { renderRegister, renderLogin, registerUser } from "../controllers/authController.js"

const router = express.Router()

router.get("/register", renderRegister)
router.get("/login", renderLogin)
router.post("/register", registerUser)

router.post("/login",
    passport.authenticate("local",{
        successRedirect: "/todos",
        failureRedirect: "/login"
    })
)

export default router