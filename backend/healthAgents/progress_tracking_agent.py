from healthAgents.base_agent import BaseAgent


class ProgressTrackingAgent(BaseAgent):
    def __init__(self):
        super().__init__(
            name="ProgressCoach",
            description="I'm your progress tracking specialist. I can help you monitor your fitness journey, analyze your results, and adjust your plans to keep you moving forward.",
            avatar="progress_avatar.png"
        )
        
        # Common metrics that could be expanded or stored in a database
        self.tracking_metrics = [
            "Weight",
            "Body measurements",
            "Body fat percentage",
            "Strength (weight lifted)",
            "Endurance (distance/time)",
            "Energy levels",
            "Sleep quality",
            "Mood"
        ]

    def analyze_progress(self, user_data):
        """
        Analyze user's progress based on their tracking data
        
        user_data should contain:
        - start_date: when they began their program
        - current_date: today's date
        - metrics: dictionary of metrics with arrays of values
        - goals: what they're trying to achieve
        """
        prompt = f"""
        Analyze the following fitness progress data and provide insights:
        
        Program Start Date: {user_data.get('start_date', 'Not specified')}
        Current Date: {user_data.get('current_date', 'Not specified')}
        Goals: {user_data.get('goals', 'Not specified')}
        
        Metrics Tracked:
        {self._format_metrics(user_data.get('metrics', {}))}
        
        Please provide:
        1. A summary of overall progress
        2. Analysis of trends in each metric
        3. Areas of strongest improvement
        4. Areas that need more focus
        5. Recommendations for adjustments to their program
        6. Realistic expectations for continued progress
        
        Format this as an encouraging progress report that acknowledges achievements while providing constructive guidance.
        """
        return self.get_response(prompt)
    
    def _format_metrics(self, metrics):
        """Helper method to format metrics data for the prompt"""
        formatted = ""
        for metric, values in metrics.items():
            if isinstance(values, list) and len(values) > 0:
                formatted += f"- {metric}: Starting {values[0]}, Current {values[-1]}\n"
            else:
                formatted += f"- {metric}: {values}\n"
        return formatted or "No metrics data provided"
    
    def suggest_adjustments(self, current_plan, progress_data):
        """Suggest adjustments to workout or nutrition plan based on progress"""
        prompt = f"""
        Based on the following progress data, suggest adjustments to the user's current plan:
        
        Current Plan Summary:
        {current_plan}
        
        Progress Data:
        {progress_data}
        
        Please provide:
        1. 3-5 specific adjustments to optimize results
        2. Rationale for each adjustment
        3. How to implement each change
        4. Expected impact of these adjustments
        
        Format these as actionable recommendations that build on current success while addressing any plateaus or challenges.
        """
        return self.get_response(prompt)
    
    def create_milestone_plan(self, goal, current_status, timeframe):
        """Create a plan with milestones to reach a specific goal"""
        prompt = f"""
        Create a milestone-based plan to progress from current status to goal:
        
        Goal: {goal}
        Current Status: {current_status}
        Desired Timeframe: {timeframe}
        
        Please provide:
        1. A realistic assessment of the timeframe
        2. 4-6 progressive milestones to reach the goal
        3. Specific metrics to track for each milestone
        4. Estimated time to reach each milestone
        5. Signs that indicate readiness to move to the next milestone
        
        Format this as a clear roadmap that breaks down the larger goal into achievable steps.
        """
        return self.get_response(prompt)
    
    def interpret_plateau(self, plateau_data):
        """Help interpret and overcome a fitness plateau"""
        prompt = f"""
        Analyze the following plateau situation and provide strategies to overcome it:
        
        Plateau Description:
        {plateau_data}
        
        Please provide:
        1. Potential physiological reasons for this plateau
        2. Potential lifestyle/habit factors that might be contributing
        3. 5-7 specific strategies to break through the plateau
        4. How to mentally approach plateaus as part of the fitness journey
        5. When to consider changing goals vs. changing approach
        
        Format this as an informative and encouraging guide to help the user understand and overcome their plateau.
        """
        return self.get_response(prompt)
    
    def celebrate_achievement(self, achievement):
        """Generate a celebration message for a fitness achievement"""
        prompt = f"""
        Create an enthusiastic and motivating celebration message for the following fitness achievement:
        
        {achievement}
        
        The message should:
        1. Acknowledge the hard work that went into this achievement
        2. Highlight the significance of this milestone
        3. Connect this achievement to their overall journey
        4. Provide encouragement for continued progress
        
        Make this genuinely uplifting and personal, avoiding generic platitudes.
        """
        return self.get_response(prompt)