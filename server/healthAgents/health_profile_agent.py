from .base_agent import BaseAgent
from typing import Dict, Any, List
import json


class HealthProfileAgent(BaseAgent):
    def __init__(self):
        super().__init__(
            name="HealthProfiler",
            description="I'm your personal health profile assistant. I analyze your unique situation and provide tailored wellness guidance.",
            avatar="health_avatar.png"
        )
        
        # Ensure context_memory is available
        if not hasattr(self, 'context_memory'):
            self.context_memory = {}
    
    def store_context(self, user_id: str, context: Dict[str, Any]):
        """Store user context for future personalization (fallback implementation)"""
        if not hasattr(self, 'context_memory'):
            self.context_memory = {}
        
        if user_id not in self.context_memory:
            self.context_memory[user_id] = {}
        
        self.context_memory[user_id].update(context)
        from datetime import datetime
        self.context_memory[user_id]['last_updated'] = datetime.now().isoformat()
    
    def get_contextual_response(self, query: str, context: Dict[str, Any] = None, 
                               user_id: str = None, personalization_level: str = "medium"):
        """Generate context-aware, personalized responses (fallback implementation)"""
        
        # Simple fallback - just use the regular response with some context
        if context:
            context_str = ", ".join([f"{k}: {v}" for k, v in context.items() if v])
            enhanced_query = f"""
            User Context: {context_str}
            
            Query: {query}
            
            Please provide a personalized response considering the user's context.
            """
            return self.get_response(enhanced_query)
        else:
            return self.get_response(query)
        
        self.health_goals = [
            "Weight management", "Muscle building", "Cardiovascular health",
            "Stress reduction", "Better sleep", "Improved nutrition"
        ]
        
        self.user_types = {
            "new_user": "Someone just starting their health journey",
            "returning_user": "Someone who has been working on their health",
            "fitness_focused": "Someone primarily interested in fitness",
            "health_focused": "Someone dealing with health concerns",
            "busy_professional": "Someone with limited time but high motivation"
        }

    def dynamic_greeting(self, user_context: Dict[str, Any]) -> str:
        """Generate dynamic, personalized greeting based on comprehensive user context"""
        
        # Analyze user context to determine greeting style
        user_type = self._analyze_user_type(user_context)
        time_of_day = user_context.get('time_of_day', 'day')
        
        context_prompt = f"""
        Generate a personalized greeting for this user:
        
        User Type: {user_type}
        Time of Day: {time_of_day}
        Name: {user_context.get('name', 'there')}
        Goals: {user_context.get('goals', 'general wellness')}
        Previous Visits: {user_context.get('visit_count', 0)}
        Last Activity: {user_context.get('last_activity', 'None')}
        Current Mood/Energy: {user_context.get('mood', 'neutral')}
        
        Make the greeting feel:
        - Personal and warm
        - Relevant to their current situation
        - Motivating based on their goals
        - Appropriate for the time of day
        - Acknowledging their journey so far
        
        Keep it concise but meaningful (2-3 sentences).
        """
        
        return self.get_response(context_prompt)

    def intelligent_assessment(self, user_data: Dict[str, Any]) -> Dict[str, Any]:
        """Create an intelligent, multi-dimensional health assessment"""
        
        assessment_prompt = f"""
        Based on this comprehensive user data, create a detailed health assessment:
        
        PERSONAL DATA:
        Age: {user_data.get('age', 'Not provided')}
        Height: {user_data.get('height', 'Not provided')}
        Weight: {user_data.get('weight', 'Not provided')}
        Gender: {user_data.get('gender', 'Not provided')}
        
        LIFESTYLE:
        Activity Level: {user_data.get('activity_level', 'Not provided')}
        Sleep Quality: {user_data.get('sleep_quality', 'Not provided')}
        Stress Level: {user_data.get('stress_level', 'Not provided')}
        Work Type: {user_data.get('work_type', 'Not provided')}
        
        HEALTH STATUS:
        Medical Conditions: {user_data.get('medical_conditions', 'None mentioned')}
        Medications: {user_data.get('medications', 'None mentioned')}
        Injuries: {user_data.get('injuries', 'None mentioned')}
        Energy Levels: {user_data.get('energy_levels', 'Not provided')}
        
        GOALS & PREFERENCES:
        Primary Goals: {user_data.get('goals', 'Not specified')}
        Secondary Goals: {user_data.get('secondary_goals', 'Not specified')}
        Preferred Activities: {user_data.get('preferred_activities', 'Not specified')}
        Dietary Preferences: {user_data.get('dietary_preferences', 'Not specified')}
        Time Availability: {user_data.get('time_availability', 'Not specified')}
        
        Provide a comprehensive assessment with:
        1. Health Status Summary (current state analysis)
        2. Risk Assessment (potential concerns to address)
        3. Opportunity Areas (strengths to build upon)
        4. Personalized Recommendations (specific to their situation)
        5. Priority Action Items (top 3 immediate steps)
        6. Success Metrics (what to track for progress)
        7. Motivation Strategy (how to keep them engaged)
        
        Format as JSON with clear sections and actionable insights.
        """
        
        response = self.get_response(assessment_prompt)
        
        # Store context for future personalization
        user_id = user_data.get('user_id')
        if user_id:
            self.store_context(user_id, {
                'assessment_date': user_data.get('assessment_date'),
                'health_status': user_data.get('health_status'),
                'goals': user_data.get('goals'),
                'preferences': user_data.get('preferences')
            })
        
        return {"assessment": response, "user_id": user_id}

    def adaptive_program_suggestion(self, user_context: Dict[str, Any]) -> str:
        """Suggest programs that adapt to user's changing needs"""
        
        suggestion_prompt = f"""
        Based on this user's comprehensive profile, suggest the most suitable wellness programs:
        
        USER PROFILE:
        Current Health Status: {user_context.get('health_status', 'Unknown')}
        Fitness Level: {user_context.get('fitness_level', 'Unknown')}
        Available Time: {user_context.get('available_time', 'Unknown')}
        Equipment Access: {user_context.get('equipment', 'Unknown')}
        Budget Constraints: {user_context.get('budget', 'Unknown')}
        
        GOALS & MOTIVATION:
        Primary Goal: {user_context.get('primary_goal', 'Unknown')}
        Motivation Level: {user_context.get('motivation_level', 'Unknown')}
        Preferred Learning Style: {user_context.get('learning_style', 'Unknown')}
        
        CONSTRAINTS:
        Physical Limitations: {user_context.get('limitations', 'None')}
        Schedule Constraints: {user_context.get('schedule', 'Flexible')}
        Social Preferences: {user_context.get('social_preference', 'Unknown')}
        
        Recommend programs from: Workout Plans, Nutrition Guidance, Stress Management, 
        Sleep Improvement, Health Tracking, Habit Building, Mindfulness, Community Support
        
        For each recommendation, provide:
        1. Why it's perfect for them specifically
        2. How it addresses their unique situation
        3. Expected timeline for results
        4. Integration with their lifestyle
        5. Success probability based on their profile
        
        Prioritize recommendations and explain the reasoning.
        """
        
        return self.get_response(suggestion_prompt)

    def progress_aware_guidance(self, user_id: str, current_query: str) -> str:
        """Provide guidance that's aware of user's progress and history"""
        
        # Get stored context
        stored_context = self.context_memory.get(user_id, {})
        
        guidance_prompt = f"""
        Provide personalized guidance considering this user's history:
        
        CURRENT QUERY: {current_query}
        
        USER HISTORY:
        {json.dumps(stored_context, indent=2)}
        
        Consider:
        - Their progress since last interaction
        - Patterns in their behavior/questions
        - Evolution of their goals
        - Previous challenges they've faced
        - What has worked well for them
        
        Provide guidance that:
        1. Acknowledges their journey
        2. Builds on previous conversations
        3. Adapts to their current needs
        4. Maintains continuity with past advice
        5. Celebrates progress made
        """
        
        return self.get_contextual_response(guidance_prompt, stored_context, user_id)

    def _analyze_user_type(self, context: Dict[str, Any]) -> str:
        """Analyze user context to determine their type"""
        visit_count = context.get('visit_count', 0)
        goals = context.get('goals', [])
        
        if visit_count == 0:
            return "new_user"
        elif visit_count > 10:
            return "returning_user"
        elif any(goal in str(goals).lower() for goal in ['fitness', 'workout', 'exercise']):
            return "fitness_focused"
        elif context.get('work_type') == 'professional':
            return "busy_professional"
        else:
            return "health_focused" 