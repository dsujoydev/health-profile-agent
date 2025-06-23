from .base_agent import BaseAgent


class HealthProfileAgent(BaseAgent):
    def __init__(self):
        super().__init__(
            name="HealthProfiler",
            description="I'm your health profile assistant. I can help set up your wellness profile, understand your goals, and guide you to the right resources.",
            avatar="health_avatar.png"
        )
        
        # Sample health goals that could be stored in a database later
        self.health_goals = [
            "Weight management",
            "Muscle building",
            "Cardiovascular health",
            "Stress reduction",
            "Better sleep",
            "Improved nutrition"
        ]

    def greet(self, user_type=None):
        if user_type == "new_user":
            return self.get_response(
                "Generate a friendly, encouraging greeting for someone new to health and wellness coaching. "
                "Mention that we'll start by creating a health profile and understanding their goals."
            )
        elif user_type == "returning_user":
            return self.get_response(
                "Generate a warm welcome back message for a returning wellness client. "
                "Ask how they've been progressing with their goals and if they need any adjustments to their plan."
            )
        elif user_type == "fitness_focused":
            return self.get_response(
                "Generate an energetic greeting for someone primarily interested in fitness. "
                "Mention that they can check out the Workout Plans section and Nutrition guides."
            )
        else:
            return self.get_response(
                "Generate a friendly, general greeting for someone interested in health and wellness coaching. "
                "Ask about their primary health goals to provide more tailored guidance."
            )

    def suggest_program(self, health_interest):
        prompt = f"Based on a user expressing interest in '{health_interest}', suggest which wellness program would be most beneficial. Options include: Workout Plans, Nutrition Guidance, Stress Management, Sleep Improvement, Health Tracking. Explain why in 1-2 sentences."
        return self.get_response(prompt)
        
    def create_initial_assessment(self, user_info):
        """
        Create an initial health assessment based on user information
        
        user_info should be a dictionary with keys like:
        - age
        - height
        - weight
        - activity_level
        - health_concerns
        - goals
        """
        prompt = f"""
        Create an initial health assessment based on the following user information:
        
        Age: {user_info.get('age', 'Not provided')}
        Height: {user_info.get('height', 'Not provided')}
        Weight: {user_info.get('weight', 'Not provided')}
        Activity Level: {user_info.get('activity_level', 'Not provided')}
        Health Concerns: {user_info.get('health_concerns', 'None mentioned')}
        Goals: {user_info.get('goals', 'Not specified')}
        
        Provide:
        1. A brief summary of their current health status
        2. Recommended focus areas
        3. Suggested first steps
        4. Any health metrics they should track
        
        Format the response in a friendly, encouraging tone.
        """
        return self.get_response(prompt) 