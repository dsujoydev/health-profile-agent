from agno.agent import Agent, RunResponse
from agno.models.groq import Groq
import os
from dotenv import load_dotenv
from typing import Dict, Any
from datetime import datetime
import json

load_dotenv()

class BaseAgent:
    def __init__(self, name, description, avatar="default_avatar.png"):
        self.name = name
        self.description = description
        self.avatar = avatar
        self.model = Groq(id="llama-3.3-70b-versatile")
        self.agent = Agent(model=self.model, markdown=True)
        self.context_memory = {}  # Store user context

    def get_response(self, query, stream=False):
        """Get response content from the agent"""
        run: RunResponse = self.agent.run(query)
        return run.content

    def get_contextual_response(self, query: str, context: Dict[str, Any] = None, 
                               user_id: str = None, personalization_level: str = "medium"):
        """Generate context-aware, personalized responses"""
        
        # Build context string
        context_str = self._build_context_string(context, user_id)
        
        # Create personalized prompt
        enhanced_query = f"""
        Context: {context_str}
        
        User Query: {query}
        
        Instructions:
        - Personalize the response based on the provided context
        - Use the user's name if available
        - Reference their goals, preferences, and history when relevant
        - Adjust tone and complexity based on their experience level
        - Include actionable, specific recommendations
        - Make the response feel like it's from a personal coach who knows them well
        
        Personalization Level: {personalization_level}
        """
        
        return self.get_response(enhanced_query)
    
    def _build_context_string(self, context: Dict[str, Any], user_id: str) -> str:
        """Build context string for personalization"""
        if not context:
            context = {}
            
        # Add stored context if user_id exists
        if user_id and user_id in self.context_memory:
            stored_context = self.context_memory[user_id]
            context.update(stored_context)
        
        context_parts = []
        
        # Personal info
        if context.get('name'):
            context_parts.append(f"User name: {context['name']}")
        if context.get('age'):
            context_parts.append(f"Age: {context['age']}")
        if context.get('fitness_level'):
            context_parts.append(f"Fitness level: {context['fitness_level']}")
            
        # Goals and preferences
        if context.get('goals'):
            goals = context['goals'] if isinstance(context['goals'], list) else [context['goals']]
            context_parts.append(f"Goals: {', '.join(goals)}")
        if context.get('preferences'):
            context_parts.append(f"Preferences: {context['preferences']}")
            
        # History and progress
        if context.get('previous_interactions'):
            context_parts.append(f"Previous interactions: {context['previous_interactions']}")
        if context.get('current_progress'):
            context_parts.append(f"Current progress: {context['current_progress']}")
            
        # Constraints and limitations
        if context.get('limitations'):
            context_parts.append(f"Limitations: {context['limitations']}")
        if context.get('available_time'):
            context_parts.append(f"Available time: {context['available_time']}")
        if context.get('equipment'):
            context_parts.append(f"Available equipment: {context['equipment']}")
            
        return "; ".join(context_parts) if context_parts else "No specific context provided"
    
    def store_context(self, user_id: str, context: Dict[str, Any]):
        """Store user context for future personalization"""
        if user_id not in self.context_memory:
            self.context_memory[user_id] = {}
        self.context_memory[user_id].update(context)
        self.context_memory[user_id]['last_updated'] = datetime.now().isoformat()

    def print_response(self, query, stream=True):
        """Print response directly to terminal"""
        return self.agent.print_response(query) 