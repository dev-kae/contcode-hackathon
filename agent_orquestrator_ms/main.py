import json
from concurrent.futures import ThreadPoolExecutor

from fastapi import FastAPI
from pydantic import BaseModel
from starlette.responses import JSONResponse

from ai_agents.agent_model import Agent, call_agent, AgentImageGenerator

app = FastAPI()

class GenericAgentThreadMessage(BaseModel):
    assistant_id: str
    thread_id: str
    message: str

class ImageGeneratorMessage(BaseModel):
    promt: str
    quantity: int

@app.post("/threads/runs")
def call_openai_agent(request: GenericAgentThreadMessage):
    url = f'https://api.openai.com/v1/threads/{request.thread_id}/messages'
    agent = Agent(url=url, assistant_id=request.assistant_id)

    with ThreadPoolExecutor(max_workers=4) as executor:
        future = executor.submit(call_agent, agent, request.message, request.thread_id)

    result = future.result()

    if isinstance(result, str):
        result = json.loads(result)

    return JSONResponse(content=result)

@app.post("/image/logo")
def generate_logo(request: ImageGeneratorMessage):
    result = []
    agent = AgentImageGenerator(request.promt, request.quantity)
    if request.quantity > 3 or request.quantity < 1:
        return "Quantidade inválida. Você deve selecionar um número entre 1 e 3"
    with ThreadPoolExecutor(max_workers=3) as executor:
        futures = [
            executor.submit(agent.call) for _ in range(1, request.quantity + 1)
        ]
        for index, future in enumerate(futures):
            result.append(future.result())

    return result
