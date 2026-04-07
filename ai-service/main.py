from fastapi import FastAPI
from pydantic import BaseModel, Field
from tools.agents import agent

app = FastAPI()

class UserInput(BaseModel):
    text: str = Field(...)


@app.post("/agent")
async def add_todo(userInput: UserInput):
    print(userInput.text)
    response = agent.invoke({
        "message": [{"role": "user", "content": userInput.text}]
    })
    return {"response": response}

