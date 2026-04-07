import db from "../db/db.js"

export const runAgent = async (input, id) => {
    await fetch(
        "http://localhost:8000/agent", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            text: input,
            user_id: id
        })
    })
}

export const AgentAddTodo = async (title, duration, user_id) => {
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
}