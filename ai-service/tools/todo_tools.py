import httpx
from langchain_core.tools import tool

@tool
async def add_task(task: str, user_id: int):
    """Add a task to the todo database"""

    async with httpx.AsyncClient() as client:
        await client.post(
            "http://localhost:3000/api/add-todo",
            json={
                "title": task,
                "user_id": user_id
            }
        )

    return f"Added todo: {task}"