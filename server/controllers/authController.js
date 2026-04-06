import { getExistingUser, createUser } from "../services/authService.js"
import bcrypt from "bcrypt"

const saltRounds = 10

export const renderRegister = (req, res) =>{
    res.render("register.ejs")
}

export const renderLogin = (req, res) =>{
    res.render("login.ejs")
}

export const registerUser = async(req, res) =>{
    const {username, password} = req.body

    const existingUser = await getExistingUser(username)
    if(existingUser.length !==0){
        res.redirect("/register")
    }

    const hash = await bcrypt.hash(password, saltRounds)

    const newUser = await createUser(username, hash)

    res.login(newUser, (err)=>{
        if (err){
            res.redirect("/login")
        }
        res.redirect("/todos")
    })

}