from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
import requests

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)

class BaseAgent:
    def __init__(self, name, description):
        self.name = name
        self.description = description
        self.api_key = os.getenv("GROQ_API_KEY")

    def get_response(self, prompt):
        try:
            headers = {
                "Authorization": f"Bearer {self.api_key}",
                "Content-Type": "application/json"
            }

            data = {
                "model": "llama3-8b-8192",
                "messages": [
                    {"role": "system", "content": f"You are {self.name}, {self.description}. Respond in a helpful, concise, and professional manner."},
                    {"role": "user", "content": prompt}
                ],
                "temperature": 0.7,
                "max_tokens": 500
            }

            response = requests.post(
                "https://api.groq.com/openai/v1/chat/completions",
                headers=headers,
                json=data
            )

            if response.status_code == 200:
                return response.json()["choices"][0]["message"]["content"]
            else:
                return f"Error: {response.status_code} - {response.text}"
        except Exception as e:
            return f"An error occurred: {str(e)}"

class HealthProfileAgentClass(BaseAgent):
    def __init__(self):
        super().__init__(
            "HealthProfiler",
            "a health profile specialist who helps users set up wellness profiles, understand their goals, and guide them to the right resources"
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

class WorkoutPlanAgentClass(BaseAgent):
    def __init__(self):
        super().__init__(
            "WorkoutPlanner",
            "a fitness specialist who creates personalized workout plans and provides exercise guidance"
        )
    
    def generate_workout_plan(self, user_profile):
        prompt = f"Generate a detailed workout plan for a user with the following profile: {user_profile}"
        return self.get_response(prompt)
    
    def suggest_exercise_alternatives(self, exercise, equipment=None, difficulty=None):
        prompt = f"Suggest alternatives for {exercise} exercise"
        if equipment:
            prompt += f" using {equipment} equipment"
        if difficulty:
            prompt += f" at {difficulty} difficulty level"
        return self.get_response(prompt)
    
    def create_quick_workout(self, time_available, focus_area, equipment=None):
        prompt = f"Create a quick {time_available} workout focusing on {focus_area}"
        if equipment:
            prompt += f" using {equipment} equipment"
        return self.get_response(prompt)
    
    def provide_form_guidance(self, exercise):
        prompt = f"Provide detailed form guidance for {exercise} exercise"
        return self.get_response(prompt)

class ProgressTrackingAgentClass(BaseAgent):
    def __init__(self):
        super().__init__(
            "ProgressTracker",
            "a progress tracking specialist who helps analyze fitness data and suggest adjustments"
        )
    
    def analyze_progress(self, user_data):
        prompt = f"Analyze the following fitness progress data: {user_data}"
        return self.get_response(prompt)
    
    def suggest_adjustments(self, current_plan, progress_data):
        prompt = f"Suggest adjustments to the following fitness plan based on progress data:\nCurrent Plan: {current_plan}\nProgress Data: {progress_data}"
        return self.get_response(prompt)
    
    def create_milestone_plan(self, goal, current_status, timeframe):
        prompt = f"Create a milestone plan to achieve the following goal:\nGoal: {goal}\nCurrent Status: {current_status}\nTimeframe: {timeframe}"
        return self.get_response(prompt)
    
    def interpret_plateau(self, plateau_data):
        prompt = f"Interpret and provide strategies for overcoming the following fitness plateau: {plateau_data}"
        return self.get_response(prompt)
    
    def celebrate_achievement(self, achievement):
        prompt = f"Create an enthusiastic celebration message for the following fitness achievement: {achievement}"
        return self.get_response(prompt)

class HealthInfoAgentClass(BaseAgent):
    def __init__(self):
        super().__init__(
            "HealthEducator",
            "a health information specialist who provides evidence-based information about fitness, nutrition, and wellness topics"
        )
    
    def explain_concept(self, concept):
        prompt = f"Explain the following health/fitness concept in detail: {concept}"
        return self.get_response(prompt)
    
    def answer_health_question(self, question):
        prompt = f"Answer the following health/fitness question with evidence-based information: {question}"
        return self.get_response(prompt)
    
    def debunk_myth(self, myth):
        prompt = f"Debunk the following health/fitness myth with scientific evidence: {myth}"
        return self.get_response(prompt)
    
    def explain_research_finding(self, research_topic):
        prompt = f"Explain current research findings on the following health/fitness topic: {research_topic}"
        return self.get_response(prompt)
    
    def create_educational_content(self, topic, format_type="article"):
        prompt = f"Create educational {format_type} content about the following health/fitness topic: {topic}"
        return self.get_response(prompt)
    
    def compare_approaches(self, approach1, approach2, goal):
        prompt = f"Compare the following approaches for achieving this health/fitness goal:\nGoal: {goal}\nApproach 1: {approach1}\nApproach 2: {approach2}"
        return self.get_response(prompt)

# Initialize all agents with the new classes
health_profile_agent = HealthProfileAgentClass()
workout_plan_agent = WorkoutPlanAgentClass()
# nutrition_agent = NutritionAgent()
progress_tracking_agent = ProgressTrackingAgentClass()
health_info_agent = HealthInfoAgentClass()

# Health Profile Agent endpoints
@app.route('/api/health/profile/greet', methods=['POST'])
def health_profile_greet():
    data = request.json
    user_type = data.get('user_type', None)
    response = health_profile_agent.greet(user_type)
    return jsonify({'response': response})

@app.route('/api/health/profile/suggest-program', methods=['POST'])
def health_profile_suggest_program():
    data = request.json
    health_interest = data.get('health_interest', '')
    response = health_profile_agent.suggest_program(health_interest)
    return jsonify({'response': response})

@app.route('/api/health/profile/assessment', methods=['POST'])
def health_profile_assessment():
    data = request.json
    user_info = data.get('user_info', {})
    response = health_profile_agent.create_initial_assessment(user_info)
    return jsonify({'response': response})

# Workout Plan Agent endpoints
@app.route('/api/health/workout/plan', methods=['POST'])
def workout_generate_plan():
    data = request.json
    user_profile = data.get('user_profile', {})
    response = workout_plan_agent.generate_workout_plan(user_profile)
    return jsonify({'response': response})

@app.route('/api/health/workout/alternatives', methods=['POST'])
def workout_alternatives():
    data = request.json
    exercise = data.get('exercise', '')
    equipment = data.get('equipment', None)
    difficulty = data.get('difficulty', None)
    response = workout_plan_agent.suggest_exercise_alternatives(exercise, equipment, difficulty)
    return jsonify({'response': response})

@app.route('/api/health/workout/quick', methods=['POST'])
def workout_quick():
    data = request.json
    time_available = data.get('time_available', '30 minutes')
    focus_area = data.get('focus_area', 'full body')
    equipment = data.get('equipment', None)
    response = workout_plan_agent.create_quick_workout(time_available, focus_area, equipment)
    return jsonify({'response': response})

@app.route('/api/health/workout/form-guidance', methods=['POST'])
def workout_form_guidance():
    data = request.json
    exercise = data.get('exercise', '')
    response = workout_plan_agent.provide_form_guidance(exercise)
    return jsonify({'response': response})

# Nutrition Agent endpoints
@app.route('/api/health/nutrition/meal-plan', methods=['POST'])
def nutrition_meal_plan():
    data = request.json
    user_profile = data.get('user_profile', {})
    response = nutrition_agent.create_meal_plan(user_profile)
    return jsonify({'response': response})

# @app.route('/api/health/nutrition/food-alternatives', methods=['POST'])
# def nutrition_food_alternatives():
#     data = request.json
#     food = data.get('food', '')
#     dietary_restriction = data.get('dietary_restriction', None)
#     response = nutrition_agent.suggest_food_alternatives(food, dietary_restriction)
#     return jsonify({'response': response})

# @app.route('/api/health/nutrition/analyze-meal', methods=['POST'])
# def nutrition_analyze_meal():
#     data = request.json
#     meal_description = data.get('meal_description', '')
#     response = nutrition_agent.analyze_meal(meal_description)
#     return jsonify({'response': response})

# @app.route('/api/health/nutrition/tips', methods=['POST'])
# def nutrition_tips():
#     data = request.json
#     goal = data.get('goal', '')
#     response = nutrition_agent.provide_nutrition_tips(goal)
#     return jsonify({'response': response})

# @app.route('/api/health/nutrition/shopping-list', methods=['POST'])
# def nutrition_shopping_list():
#     data = request.json
#     dietary_preferences = data.get('dietary_preferences', 'balanced')
#     days = data.get('days', 7)
#     response = nutrition_agent.create_shopping_list(dietary_preferences, days)
#     return jsonify({'response': response})

# Progress Tracking Agent endpoints
@app.route('/api/health/progress/analyze', methods=['POST'])
def progress_analyze():
    data = request.json
    user_data = data.get('user_data', {})
    response = progress_tracking_agent.analyze_progress(user_data)
    return jsonify({'response': response})

@app.route('/api/health/progress/adjustments', methods=['POST'])
def progress_adjustments():
    data = request.json
    current_plan = data.get('current_plan', '')
    progress_data = data.get('progress_data', '')
    response = progress_tracking_agent.suggest_adjustments(current_plan, progress_data)
    return jsonify({'response': response})

@app.route('/api/health/progress/milestone-plan', methods=['POST'])
def progress_milestone_plan():
    data = request.json
    goal = data.get('goal', '')
    current_status = data.get('current_status', '')
    timeframe = data.get('timeframe', '')
    response = progress_tracking_agent.create_milestone_plan(goal, current_status, timeframe)
    return jsonify({'response': response})

@app.route('/api/health/progress/plateau', methods=['POST'])
def progress_plateau():
    data = request.json
    plateau_data = data.get('plateau_data', '')
    response = progress_tracking_agent.interpret_plateau(plateau_data)
    return jsonify({'response': response})

@app.route('/api/health/progress/celebrate', methods=['POST'])
def progress_celebrate():
    data = request.json
    achievement = data.get('achievement', '')
    response = progress_tracking_agent.celebrate_achievement(achievement)
    return jsonify({'response': response})

# Health Info Agent endpoints
@app.route('/api/health/info/explain-concept', methods=['POST'])
def health_info_explain_concept():
    data = request.json
    concept = data.get('concept', '')
    response = health_info_agent.explain_concept(concept)
    return jsonify({'response': response})

@app.route('/api/health/info/answer-question', methods=['POST'])
def health_info_answer_question():
    data = request.json
    question = data.get('question', '')
    response = health_info_agent.answer_health_question(question)
    return jsonify({'response': response})

@app.route('/api/health/info/debunk-myth', methods=['POST'])
def health_info_debunk_myth():
    data = request.json
    myth = data.get('myth', '')
    response = health_info_agent.debunk_myth(myth)
    return jsonify({'response': response})

@app.route('/api/health/info/research', methods=['POST'])
def health_info_research():
    data = request.json
    research_topic = data.get('research_topic', '')
    response = health_info_agent.explain_research_finding(research_topic)
    return jsonify({'response': response})

@app.route('/api/health/info/educational-content', methods=['POST'])
def health_info_educational_content():
    data = request.json
    topic = data.get('topic', '')
    format_type = data.get('format_type', 'article')
    response = health_info_agent.create_educational_content(topic, format_type)
    return jsonify({'response': response})

@app.route('/api/health/info/compare', methods=['POST'])
def health_info_compare():
    data = request.json
    approach1 = data.get('approach1', '')
    approach2 = data.get('approach2', '')
    goal = data.get('goal', '')
    response = health_info_agent.compare_approaches(approach1, approach2, goal)
    return jsonify({'response': response})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5001))
    app.run(debug=True, host='0.0.0.0', port=port)