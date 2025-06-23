from agno.agent import Agent, RunResponse
from agno.models.groq import Groq
import os
from dotenv import load_dotenv

load_dotenv()

class BaseAgent:
    def __init__(self, name, description, avatar="default_avatar.png"):
        self.name = name
        self.description = description
        self.avatar = avatar
        self.model = Groq(id="llama-3.3-70b-versatile")
        self.agent = Agent(model=self.model, markdown=True)

    def get_response(self, query, stream=False):
        """Get response content from the agent"""
        run: RunResponse = self.agent.run(query)
        return run.content

    def print_response(self, query, stream=True):
        """Print response directly to terminal"""
        return self.agent.print_response(query) 