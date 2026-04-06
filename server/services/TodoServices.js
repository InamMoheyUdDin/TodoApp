import db from "../db/db.js"

export const getTodosByID = async (userID, duration) =>{
    const result = await db.query(
        "SELECT * FROM items WHERE user_id = $1 AND duration = $2 ORDER BY ID ASC",
        [userID, duration])

    return result.rows
};

export const createNewTodo = async (todo, duration, user_id) => {
    await db.query(
        "INSERT INTO items(title, duration, user_id) VALUES ($1, $2, $3)", 
        [todo, duration, user_id])
}

export const updateTodo = async(id, title, user_id) =>{
    await db.query(
        "UPDATE items SET title = $1 WHERE id=$2 AND user_id=$3", 
        [title, id, user_id]
    )
}

export const deleteTodoByID = async (id, user_id) =>{
    await db.query(
        "DELETE FROM items WHERE id=$1 AND user_id=$2",
        [id, user_id]
    )
}