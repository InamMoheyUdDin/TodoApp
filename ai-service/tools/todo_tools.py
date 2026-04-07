from langchain.agents import create_agent
from langchain_core.tools import tool
import requests

current_user_id = None

@tool
async def add_task(task: str):
    """Add the task given into a todo database"""
    await requests.post(
        "http://localhost:3000/api/add-todo",
        json={
            "input": task,
            "user_id": current_user_id
        }
    )
    return f"Added todo: {task}"