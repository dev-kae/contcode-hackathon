from decouple import config

from ai_agents.agent_model import GenericAgent

API_KEY = config("API_KEY")

GENERIC_AGENT = GenericAgent(api_key=API_KEY)
