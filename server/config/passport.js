import passport from "passport";
import { Strategy } from "passport-local";
import db from "../db/db.js";
import bcrypt from "bcrypt";

passport.use(
    new Strategy(async (username, password, cb) => {
        try {
            const result = await db.query("SELECT * FROM users WHERE email=$1", [username])
            if (result.rows.length === 0) {
                return cb(null, false)
            }
            const user = result.rows[0]
            const verify = bcrypt.compare(password, user.hashed_password)
            if (verify) {
                return cb(null, user)
            } else {
                return cb(null, false)
            }
        } catch (err) {
            return cb(err)
        }
    })
)

passport.serializeUser((user, cb) => {
    return cb(null, user.id)
})

passport.deserializeUser(async (id, cb) => {
    try {
        const result = await db.query("SELECT * FROM users WHERE id=$1", [id])
        if (result.rows.length === 0) {
            return cb(null, false); 
        }
        cb(null, result.rows[0])
    } catch (err) {
        cb(err)
    }
})

export default passport