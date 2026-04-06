import db from "../db/db.js"

export const getExistingUser = async(email) =>{
    const result = await db.query("SELECT * FROM user WHERE email = $1", [email])
    return result.rows[0]
}

export const createUser = async (email, hashed_password) =>{
    const result = db.query("INSERT INTO users(email, hased_password) VALUES", 
        [email, hashed_password])
    return result.rows[0]
}