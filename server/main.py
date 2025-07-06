import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
# from fastapi import FastAPI, HTTPException, Request, Response, Depends
# from fastapi.security import HTTPAuthorizationCredentials, HTTPBeare
from pydantic import BaseModel
from typing import Dict, List, Optional, Any
from healthAgents import (
    HealthProfileAgent,
    WorkoutPlanAgent, 
    NutritionAgent,
    ProgressTrackingAgent,
    HealthInfoAgent
)


app = FastAPI(title="Health AI Agents API", version="1.0.0")
# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize agents
health_profile_agent = HealthProfileAgent()
workout_agent = WorkoutPlanAgent()
nutrition_agent = NutritionAgent()
progress_agent = ProgressTrackingAgent()
health_info_agent = HealthInfoAgent()

# Pydantic models for request bodies
class UserTypeRequest(BaseModel):
    user_type: str

class HealthInterestRequest(BaseModel):
    health_interest: str

class UserInfoRequest(BaseModel):
    user_info: Dict[str, Any]

class UserProfileRequest(BaseModel):
    user_profile: Dict[str, Any]

class ExerciseAlternativeRequest(BaseModel):
    exercise: str
    equipment: Optional[str] = None
    difficulty: Optional[str] = None

class QuickWorkoutRequest(BaseModel):
    time_available: str
    focus_area: str
    equipment: Optional[str] = None

class ExerciseFormRequest(BaseModel):
    exercise: str

class FoodAlternativeRequest(BaseModel):
    food: str
    dietary_restriction: str

class MealAnalysisRequest(BaseModel):
    meal_description: str

class NutritionTipsRequest(BaseModel):
    goal: str

class ShoppingListRequest(BaseModel):
    dietary_preference: str
    days: Optional[int] = 7

class ProgressAnalysisRequest(BaseModel):
    user_data: Dict[str, Any]

class PlanAdjustmentRequest(BaseModel):
    current_plan: str
    progress_data: str

class MilestonePlanRequest(BaseModel):
    goal: str
    current_status: str
    timeframe: str

class PlateauRequest(BaseModel):
    plateau_data: str

class AchievementRequest(BaseModel):
    achievement: str

class HealthConceptRequest(BaseModel):
    concept: str

class HealthQuestionRequest(BaseModel):
    question: str

class HealthMythRequest(BaseModel):
    myth: str

class ResearchRequest(BaseModel):
    research_topic: str

class EducationalContentRequest(BaseModel):
    topic: str
    format_type: Optional[str] = "article"

class CompareApproachesRequest(BaseModel):
    approach1: str
    approach2: str
    goal: str

# New Pydantic models for dynamic endpoints
class DynamicGreetingRequest(BaseModel):
    user_context: Dict[str, Any]

class IntelligentAssessmentRequest(BaseModel):
    user_data: Dict[str, Any]

class AdaptiveProgramRequest(BaseModel):
    user_context: Dict[str, Any]

class ProgressGuidanceRequest(BaseModel):
    user_id: str
    query: str

# Root endpoints
@app.get("/")
async def root():
    return {"message": "Health AI Agents API is running!"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "agents": ["health_profile", "workout", "nutrition", "progress", "health_info"]}

# Health Profile Agent endpoints (using dynamic methods)
@app.post("/api/health/profile/greet")
async def profile_greet(request: UserTypeRequest):
    try:
        # Convert old format to new dynamic greeting format
        user_context = {"user_type": request.user_type, "time_of_day": "day"}
        response = health_profile_agent.dynamic_greeting(user_context)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/health/profile/suggest-program")
async def profile_suggest_program(request: HealthInterestRequest):
    try:
        # Convert to adaptive program suggestion
        user_context = {"primary_goal": request.health_interest}
        response = health_profile_agent.adaptive_program_suggestion(user_context)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/health/profile/assessment")
async def profile_assessment(request: UserInfoRequest):
    try:
        response = health_profile_agent.intelligent_assessment(request.user_info)
        return {"response": response.get("assessment", "")}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Workout Plan Agent endpoints
@app.post("/api/health/workout/plan")
async def workout_plan(request: UserProfileRequest):
    try:
        response = workout_agent.generate_workout_plan(request.user_profile)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/health/workout/alternatives")
async def workout_alternatives(request: ExerciseAlternativeRequest):
    try:
        response = workout_agent.suggest_exercise_alternatives(
            request.exercise, request.equipment, request.difficulty
        )
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/health/workout/quick")
async def quick_workout(request: QuickWorkoutRequest):
    try:
        response = workout_agent.create_quick_workout(
            request.time_available, request.focus_area, request.equipment
        )
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/health/workout/form-guidance")
async def workout_form_guidance(request: ExerciseFormRequest):
    try:
        response = workout_agent.provide_form_guidance(request.exercise)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Nutrition Agent endpoints
@app.post("/api/health/nutrition/meal-plan")
async def nutrition_meal_plan(request: UserProfileRequest):
    try:
        response = nutrition_agent.create_meal_plan(request.user_profile)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/health/nutrition/food-alternatives")
async def nutrition_food_alternatives(request: FoodAlternativeRequest):
    try:
        response = nutrition_agent.suggest_food_alternatives(
            request.food, request.dietary_restriction
        )
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/health/nutrition/analyze-meal")
async def nutrition_analyze_meal(request: MealAnalysisRequest):
    try:
        response = nutrition_agent.analyze_meal(request.meal_description)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/health/nutrition/tips")
async def nutrition_tips(request: NutritionTipsRequest):
    try:
        response = nutrition_agent.provide_nutrition_tips(request.goal)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/health/nutrition/shopping-list")
async def nutrition_shopping_list(request: ShoppingListRequest):
    try:
        response = nutrition_agent.create_shopping_list(
            request.dietary_preference, request.days
        )
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Progress Tracking Agent endpoints
@app.post("/api/health/progress/analyze")
async def progress_analyze(request: ProgressAnalysisRequest):
    try:
        response = progress_agent.analyze_progress(request.user_data)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/health/progress/adjustments")
async def progress_adjustments(request: PlanAdjustmentRequest):
    try:
        response = progress_agent.suggest_plan_adjustments(
            request.current_plan, request.progress_data
        )
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/health/progress/milestone-plan")
async def progress_milestone_plan(request: MilestonePlanRequest):
    try:
        response = progress_agent.create_milestone_plan(
            request.goal, request.current_status, request.timeframe
        )
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/health/progress/plateau")
async def progress_plateau(request: PlateauRequest):
    try:
        response = progress_agent.address_plateau(request.plateau_data)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/health/progress/celebrate")
async def progress_celebrate(request: AchievementRequest):
    try:
        response = progress_agent.celebrate_achievement(request.achievement)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Health Info Agent endpoints
@app.post("/api/health/info/explain-concept")
async def health_info_explain_concept(request: HealthConceptRequest):
    try:
        response = health_info_agent.explain_health_concept(request.concept)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/health/info/answer-question")
async def health_info_answer_question(request: HealthQuestionRequest):
    try:
        response = health_info_agent.answer_health_question(request.question)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/health/info/debunk-myth")
async def health_info_debunk_myth(request: HealthMythRequest):
    try:
        response = health_info_agent.debunk_health_myth(request.myth)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/health/info/research")
async def health_info_research(request: ResearchRequest):
    try:
        response = health_info_agent.provide_research_summary(request.research_topic)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/health/info/educational-content")
async def health_info_educational_content(request: EducationalContentRequest):
    try:
        response = health_info_agent.create_educational_content(
            request.topic, request.format_type
        )
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/health/info/compare")
async def health_info_compare(request: CompareApproachesRequest):
    try:
        response = health_info_agent.compare_health_approaches(
            request.approach1, request.approach2, request.goal
        )
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/health/profile/dynamic-greeting")
async def profile_dynamic_greeting(request: DynamicGreetingRequest):
    try:
        response = health_profile_agent.dynamic_greeting(request.user_context)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/health/profile/intelligent-assessment")
async def profile_intelligent_assessment(request: IntelligentAssessmentRequest):
    try:
        response = health_profile_agent.intelligent_assessment(request.user_data)
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/health/profile/adaptive-program")
async def profile_adaptive_program(request: AdaptiveProgramRequest):
    try:
        response = health_profile_agent.adaptive_program_suggestion(request.user_context)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/health/profile/progress-guidance")
async def profile_progress_guidance(request: ProgressGuidanceRequest):
    try:
        response = health_profile_agent.progress_aware_guidance(
            request.user_id, 
            request.query
        )
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def main():
    print("Starting Health AI Agents Server...")
    uvicorn.run(app, host="0.0.0.0", port=8000)

if __name__ == "__main__":
    main()
