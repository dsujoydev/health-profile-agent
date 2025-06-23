from .base_agent import BaseAgent

class NutritionAgent(BaseAgent):
    def __init__(self):
        super().__init__(
            name="NutritionExpert",
            description="I'm your nutrition specialist. I can help create meal plans, analyze food choices, and provide nutritional guidance based on your goals.",
            avatar="nutrition_avatar.png"
        )
        
        # Common dietary approaches that could be expanded
        self.dietary_approaches = [
            "Mediterranean",
            "Balanced/Flexible",
            "Low-carb",
            "Plant-based",
            "High-protein",
            "Anti-inflammatory"
        ]

    def create_meal_plan(self, user_profile):
        """
        Create a personalized meal plan based on user profile
        
        user_profile should contain:
        - age, weight, height, activity_level
        - dietary_preferences: e.g., vegetarian, keto, Mediterranean
        - allergies: list of food allergies
        - goal: weight loss, muscle gain, maintenance, etc.
        - meal_preferences: breakfast, lunch, dinner preferences
        """
        prompt = f"""
        Create a personalized meal plan based on the following profile:
        
        Age: {user_profile.get('age', 'Not specified')}
        Weight: {user_profile.get('weight', 'Not specified')} kg
        Height: {user_profile.get('height', 'Not specified')} cm
        Activity Level: {user_profile.get('activity_level', 'Not specified')}
        Dietary Preferences: {user_profile.get('dietary_preferences', 'No specific preferences')}
        Allergies: {user_profile.get('allergies', 'None mentioned')}
        Goal: {user_profile.get('goal', 'General health')}
        
        Create a 7-day meal plan that includes:
        1. Daily calorie targets
        2. Macro breakdown (protein, carbs, fats)
        3. Breakfast, lunch, dinner, and 2 snack options for each day
        4. Simple preparation instructions
        5. Shopping list for the week
        
        Make it practical and achievable for someone with a normal lifestyle.
        """
        return self.get_response(prompt)
    
    def suggest_food_alternatives(self, food, dietary_restriction):
        """Suggest healthy alternatives for a specific food based on dietary needs"""
        prompt = f"""
        Suggest 3-5 healthy alternatives to {food} for someone with {dietary_restriction} dietary restrictions.
        
        For each alternative, provide:
        1. Name of the food
        2. Nutritional comparison to the original food
        3. How to use it in recipes
        4. Where to typically find it
        5. Taste and texture description
        """
        return self.get_response(prompt)
    
    def analyze_meal(self, meal_description):
        """Analyze the nutritional content and health aspects of a described meal"""
        prompt = f"""
        Analyze this meal: "{meal_description}"
        
        Provide:
        1. Estimated nutritional breakdown (calories, protein, carbs, fats, fiber)
        2. Health benefits of the ingredients
        3. Potential improvements or additions
        4. How it fits into different dietary goals
        5. Timing recommendations (best time of day to eat this)
        
        Be encouraging while providing constructive feedback.
        """
        return self.get_response(prompt)
    
    def provide_nutrition_tips(self, goal):
        """Provide targeted nutrition tips based on a specific goal"""
        prompt = f"""
        Provide 5-7 practical nutrition tips specifically for someone whose goal is {goal}.
        
        Make the tips:
        1. Actionable and specific
        2. Evidence-based
        3. Easy to implement
        4. Sustainable long-term
        
        Include both what to do and why it helps with their specific goal.
        """
        return self.get_response(prompt)
    
    def create_shopping_list(self, dietary_preference, days=7):
        """Create a healthy shopping list based on dietary preferences"""
        prompt = f"""
        Create a {days}-day shopping list for someone following a {dietary_preference} diet.
        
        Organize the list by:
        1. Fresh produce (fruits and vegetables)
        2. Proteins (meat, fish, plant-based)
        3. Whole grains and starches
        4. Dairy/dairy alternatives
        5. Pantry staples and condiments
        6. Healthy snacks
        
        Include estimated quantities for 1-2 people and focus on versatile ingredients that can be used in multiple meals.
        """
        return self.get_response(prompt) 