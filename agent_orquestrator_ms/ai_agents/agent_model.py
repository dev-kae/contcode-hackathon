from dataclasses import dataclass
from types import NoneType
from typing import Optional

from decouple import config
from openai import OpenAI

from utils.logger import logger


def openai_client():
    return OpenAI(api_key=config('API_KEY'))


@dataclass
class GenericAgent:
    role: str = None
    model: str = "gpt-3.5-turbo"

    def call(self, message):
        try:
            chat_completion = openai_client().chat.completions.create(
                messages=[
                    {
                        "role": "system",
                        "content": f"{self.role}"
                    },
                    {
                        "role": "user",
                        "content": f"{message}",
                    }
                ],
                model="gpt-3.5-turbo",
            )
            answer = chat_completion.choices[0].message.content
            print(answer)
            return answer
        except NoneType as error:
            logger.error(f"O agente não pode ser nulo: {error}")
        except Exception as error:
            logger.error(f"Ocorreu um erro inesperado: {error}")


@dataclass
class Agent:
    url: str = Optional[str]
    assistant_id: str = Optional[str]

    def call(self, message: str, thread: str):
        thread_message = openai_client().beta.threads.messages.create(
            f"{thread}",
            role="user",
            content=f"{message}",
        )

        run = openai_client().beta.threads.runs.create(
            thread_id=thread_message.thread_id,
            assistant_id=self.assistant_id
        )

        while run.status != "completed":
            keep_retrieving_run = openai_client().beta.threads.runs.retrieve(
                thread_id=thread,
                run_id=run.id
            )

            if keep_retrieving_run.status == "completed":
                print("\n")
                break

        all_messages = openai_client().beta.threads.messages.list(
            thread_id=thread
        )

        assistant_answer = all_messages.data[0].content[0].text.value

        return assistant_answer


@dataclass
class AgentImageGenerator:
    promt: str = None
    quantity: int = 1

    def call(self):
        response = openai_client().images.generate(
            model="dall-e-3",
            prompt=f"{self.promt}",
            size="1024x1024",
            quality="standard",
            n=1,
        )

        image_url = response.data[0].url

        return image_url


def call_agent(agent: Agent, message: str, thread: str):
    return agent.call(message, thread=thread)
