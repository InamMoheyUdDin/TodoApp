from fastapi import FastAPI
from pydantic import BaseModel, Field
from tools.agents import agent

app = FastAPI()

class UserInput(BaseModel):
    text: str = Field(...)
    user_id = int = Field(...)


@app.post("/agent")
def add_todo(userInput: UserInput):
    print(userInput.text)
    response = agent.invoke({
        "messages": [{"role": "user", "content": userInput.text}]
    })
    return {"response": response}

