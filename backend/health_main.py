from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv

# Import all health agents
from healthAgents.health_profile_agent import HealthProfileAgent
from healthAgents.workout_plan_agent import WorkoutPlanAgent
# from healthAgents.nutrition_agent import NutritionAgent
from healthAgents.progress_tracking_agent import ProgressTrackingAgent
from healthAgents.health_info_agent import HealthInfoAgent

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Initialize all agents
health_profile_agent = HealthProfileAgent()
workout_plan_agent = WorkoutPlanAgent()
# nutrition_agent = NutritionAgent()
progress_tracking_agent = ProgressTrackingAgent()
health_info_agent = HealthInfoAgent()

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