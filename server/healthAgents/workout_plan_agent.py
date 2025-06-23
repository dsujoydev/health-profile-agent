from .base_agent import BaseAgent


class WorkoutPlanAgent(BaseAgent):
    def __init__(self):
        super().__init__(
            name="FitnessCoach",
            description="I'm your workout planning specialist. I can create personalized exercise routines based on your goals, fitness level, and available equipment.",
            avatar="workout_avatar.png"
        )
        
        # Common workout types that could be expanded or stored in a database
        self.workout_types = [
            "Strength Training",
            "Cardio",
            "HIIT",
            "Flexibility/Yoga",
            "Calisthenics",
            "Sport-Specific"
        ]

    def generate_workout_plan(self, user_profile):
        """
        Generate a personalized workout plan based on user profile
        
        user_profile should contain:
        - fitness_level: beginner, intermediate, advanced
        - goals: e.g., weight loss, muscle gain, endurance
        - available_equipment: e.g., gym, home, minimal
        - time_available: minutes per session
        - frequency: workouts per week
        - limitations: any injuries or conditions
        """
        prompt = f"""
        Create a personalized workout plan based on the following profile:
        
        Fitness Level: {user_profile.get('fitness_level', 'Not specified')}
        Goals: {user_profile.get('goals', 'Not specified')}
        Available Equipment: {user_profile.get('available_equipment', 'Not specified')}
        Time Available: {user_profile.get('time_available', 'Not specified')} minutes per session
        Frequency: {user_profile.get('frequency', 'Not specified')} workouts per week
        Limitations/Injuries: {user_profile.get('limitations', 'None mentioned')}
        
        The workout plan should include:
        1. A weekly schedule
        2. Specific exercises for each day
        3. Sets, reps, and rest periods
        4. Warm-up and cool-down recommendations
        5. Progression plan for 4 weeks
        
        Format the response in a clear, motivational way that's easy to follow.
        """
        return self.get_response(prompt)
    
    def suggest_exercise_alternatives(self, exercise, equipment=None, difficulty=None):
        """Suggest alternative exercises for a given exercise"""
        prompt = f"""
        Suggest 3-5 alternative exercises for {exercise} that target the same muscle groups.
        
        {f"Available equipment: {equipment}" if equipment else ""}
        {f"Difficulty level: {difficulty}" if difficulty else ""}
        
        For each alternative, provide:
        1. Name of the exercise
        2. Brief description of proper form
        3. Primary and secondary muscles worked
        4. Relative difficulty compared to the original exercise
        """
        return self.get_response(prompt)
    
    def create_quick_workout(self, time_available, focus_area, equipment=None):
        """Create a quick workout when time is limited"""
        prompt = f"""
        Create a time-efficient {time_available}-minute workout focusing on {focus_area}.
        {f"Available equipment: {equipment}" if equipment else "Equipment: Bodyweight only"}
        
        The workout should include:
        1. A brief warm-up (2-3 minutes)
        2. The main workout routine with exercises, sets, and reps
        3. A quick cool-down
        
        Make it intense but achievable, with minimal transition time between exercises.
        """
        return self.get_response(prompt)
    
    def provide_form_guidance(self, exercise):
        """Provide detailed form guidance for a specific exercise"""
        prompt = f"""
        Provide detailed form guidance for performing {exercise} correctly and safely.
        
        Include:
        1. Starting position
        2. Step-by-step movement instructions
        3. Breathing pattern
        4. Common mistakes to avoid
        5. How to know if you're doing it right
        6. Modifications for different fitness levels
        
        Format this as a clear instructional guide.
        """
        return self.get_response(prompt) 