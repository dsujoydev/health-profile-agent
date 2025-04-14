from healthAgents.base_agent import BaseAgent

class NutritionAgent(BaseAgent):
    def __init__(self):
        super().__init__(
            name="NutritionCoach",
            description="I'm your nutrition specialist. I can create meal plans, provide dietary advice, and help you make healthy food choices.",
            avatar="nutrition_avatar.png"
        )
        
        # Common dietary preferences that could be expanded
        self.dietary_preferences = [
            "Vegetarian",
            "Vegan",
            "Pescatarian",
            "Keto",
            "Paleo",
            "Mediterranean",
            "Gluten-free",
            "Dairy-free",
            "Low-carb"
        ]
        
        # Food groups for balanced nutrition
        self.food_groups = {
            "proteins": ["Chicken", "Fish", "Tofu", "Beans", "Lentils", "Greek yogurt", "Eggs"],
            "vegetables": ["Leafy greens", "Broccoli", "Bell peppers", "Carrots", "Tomatoes"],
            "fruits": ["Berries", "Apples", "Citrus", "Bananas"],
            "whole_grains": ["Brown rice", "Quinoa", "Oats", "Whole wheat bread"],
            "healthy_fats": ["Avocado", "Olive oil", "Nuts", "Seeds"]
        }

    def create_meal_plan(self, user_profile):
        """
        Create a personalized meal plan based on user profile
        
        user_profile should be a dictionary with keys like:
        - age
        - weight
        - height
        - activity_level
        - dietary_restrictions
        - goals
        """
        prompt = f"""
        Create a 3-day meal plan for a user with the following profile:
        
        Age: {user_profile.get('age', 'Not provided')}
        Weight: {user_profile.get('weight', 'Not provided')}
        Height: {user_profile.get('height', 'Not provided')}
        Activity Level: {user_profile.get('activity_level', 'Not provided')}
        Dietary Restrictions: {user_profile.get('dietary_restrictions', 'None')}
        Goals: {user_profile.get('goals', 'Balanced nutrition')}
        
        Include breakfast, lunch, dinner, and snacks for each day.
        Provide approximate calorie counts for each meal.
        Format the response in markdown.
        """
        return self.get_response(prompt)
    
    def suggest_food_alternatives(self, food, dietary_restriction=None):
        """
        Suggest healthy alternatives for a specific food
        
        Parameters:
        - food: The food to find alternatives for
        - dietary_restriction: Any dietary restrictions to consider
        """
        prompt = f"Suggest healthy alternatives for {food}"
        if dietary_restriction:
            prompt += f" that are suitable for someone with {dietary_restriction} dietary restriction"
        prompt += ". Include nutritional benefits of each alternative."
        return self.get_response(prompt)
    
    def analyze_meal(self, meal_description):
        """
        Analyze the nutritional content of a meal
        
        Parameters:
        - meal_description: Description of the meal to analyze
        """
        prompt = f"""
        Analyze the following meal in terms of nutritional value:
        
        {meal_description}
        
        Provide:
        1. Approximate macronutrient breakdown (protein, carbs, fats)
        2. Estimated calorie count
        3. Nutritional strengths of this meal
        4. Suggestions for improving nutritional balance
        """
        return self.get_response(prompt)
    
    def provide_nutrition_tips(self, goal):
        """
        Provide nutrition tips for a specific health/fitness goal
        
        Parameters:
        - goal: The health or fitness goal
        """
        prompt = f"""
        Provide 5 evidence-based nutrition tips for someone with the following health/fitness goal:
        
        {goal}
        
        For each tip, include:
        1. A brief explanation of why it works
        2. A practical way to implement it
        3. A common mistake to avoid
        """
        return self.get_response(prompt)
    
    def create_shopping_list(self, dietary_preferences="balanced", days=7):
        """
        Create a grocery shopping list based on dietary preferences
        
        Parameters:
        - dietary_preferences: Type of diet (e.g., balanced, keto, vegan)
        - days: Number of days to shop for
        """
        prompt = f"""
        Create a comprehensive grocery shopping list for {days} days of {dietary_preferences} eating.
        
        Include:
        1. Fresh produce
        2. Proteins
        3. Grains and starches
        4. Dairy or alternatives
        5. Healthy fats
        6. Seasonings and condiments
        7. Snacks
        
        Organize by grocery store section and include approximate quantities.
        """
        return self.get_response(prompt)