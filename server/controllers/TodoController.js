import {
    getTodosByID,
    createNewTodo,
    updateTodo,
    deleteTodoByID
} from "../services/TodoServices.js"

export const renderHome = (req, res) =>{
    res.render("home.ejs")
}

export const renderIndex = async (req, res) => {
    const duration = req.session.duration || "today"

    const todos = await getTodosByID(req.user.id, duration)
    res.render("index.ejs", {
        listTitle: "Todos",
        listItems: todos,
        duration: duration,
    })
}

export const createTodo = async (req, res) => {
    const newItem = req.body.newItem
    const duration = req.session.duration || "today"

    if (!newItem || newItem.trim() === "") {
        return res.redirect("/todos");
    }

    await createNewTodo(newItem, duration, req.user.id)
    res.redirect("/todos")
}

export const editTodo = async (req, res) => {
    const { updatedItemId, updatedItemTitle } = req.body

    await updateTodo(updatedItemId, updatedItemTitle, req.user.id)
    res.redirect("/todos")
}

export const deleteTodo = async (req, res) => {
    const { deleteItemId } = req.body

    await deleteTodoByID(deleteItemId, req.user.id)
    res.redirect("/todos")
}

export const setDuration = (req, res) =>{
    req.session.duration = req.body.duration
    res.redirect("/todos")
}