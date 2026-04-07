import {runAgent, AgentAddTodo} from "../services/ai-services.js"


export const aiAgentController =async (req, res) => {
    const input = req.body.prompt
    await runAgent(input, req.user.id)
    res.redirect("/todos")
}

export const aiAgentAddTodo = async(req, res) =>{
    const { title, user_id } = req.body;
    await AgentAddTodo(title, "today", user_id)
    res.redirect("/todos")

}