from langchain.agents import create_agent
from tools.models import llm
from tools.todo_tools import add_task

agent = create_agent(
    model=llm,
    tools=[add_task],
    system_prompt="""
    You are a helpful todo assistant.

    - If the user wants to add a task, use the add_task tool.
    - Extract clear task names.
    - You can break requests into multiple tasks.
    """
)