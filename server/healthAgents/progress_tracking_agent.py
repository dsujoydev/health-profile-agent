from .base_agent import BaseAgent

class ProgressTrackingAgent(BaseAgent):
    def __init__(self):
        super().__init__(
            name="ProgressTracker",
            description="I'm your progress tracking specialist. I can help analyze your health journey, identify patterns, and suggest adjustments to keep you on track.",
            avatar="progress_avatar.png"
        )
        
        # Key metrics that could be tracked
        self.trackable_metrics = [
            "Weight",
            "Body measurements",
            "Workout performance",
            "Energy levels",
            "Sleep quality",
            "Mood and stress",
            "Nutritional habits"
        ]

    def analyze_progress(self, user_data):
        """
        Analyze user's progress based on tracked data
        
        user_data should contain:
        - time_period: how long they've been tracking
        - metrics: dictionary of metric names and their changes
        - goals: original goals set
        - challenges: any obstacles faced
        """
        prompt = f"""
        Analyze the following progress data:
        
        Time Period: {user_data.get('time_period', 'Not specified')}
        Current Metrics: {user_data.get('current_metrics', 'Not provided')}
        Starting Metrics: {user_data.get('starting_metrics', 'Not provided')}
        Original Goals: {user_data.get('goals', 'Not specified')}
        Challenges Faced: {user_data.get('challenges', 'None mentioned')}
        
        Provide:
        1. Overall progress assessment
        2. Key achievements to celebrate
        3. Areas that need attention
        4. Trends and patterns observed
        5. Recommendations for next steps
        
        Be encouraging and focus on both progress made and realistic next steps.
        """
        return self.get_response(prompt)
    
    def suggest_plan_adjustments(self, current_plan, progress_data):
        """Suggest adjustments to current plan based on progress"""
        prompt = f"""
        Based on the current plan: "{current_plan}"
        And progress data: "{progress_data}"
        
        Suggest specific adjustments to:
        1. Exercise routine (frequency, intensity, types)
        2. Nutrition approach
        3. Recovery and rest
        4. Goal timeline and expectations
        
        Explain why each adjustment would be beneficial and how to implement it gradually.
        """
        return self.get_response(prompt)
    
    def create_milestone_plan(self, goal, current_status, timeframe):
        """Create a milestone plan to reach a specific goal"""
        prompt = f"""
        Create a milestone plan for this goal: "{goal}"
        Current status: "{current_status}"
        Target timeframe: "{timeframe}"
        
        Break this down into:
        1. Weekly milestones for the first month
        2. Monthly milestones for the full timeframe
        3. Key metrics to track
        4. Celebration points along the way
        5. Potential obstacles and how to overcome them
        
        Make it motivating and achievable with clear action steps.
        """
        return self.get_response(prompt)
    
    def address_plateau(self, plateau_data):
        """Provide strategies for breaking through plateaus"""
        prompt = f"""
        Help address this plateau situation: "{plateau_data}"
        
        Provide strategies for:
        1. Identifying the root cause of the plateau
        2. Specific changes to try (exercise, nutrition, recovery)
        3. Mental/motivational approaches
        4. Timeline expectations for seeing changes
        5. How to prevent future plateaus
        
        Be empathetic and provide practical, science-based solutions.
        """
        return self.get_response(prompt)
    
    def celebrate_achievement(self, achievement):
        """Create a celebration message and suggest next steps after an achievement"""
        prompt = f"""
        Celebrate this achievement: "{achievement}"
        
        Provide:
        1. An encouraging celebration message
        2. Reflection on what this achievement means
        3. How this success can build momentum
        4. Suggestions for the next challenge or goal
        5. Ways to maintain this positive progress
        
        Make it personal and motivating while encouraging continued growth.
        """
        return self.get_response(prompt) 