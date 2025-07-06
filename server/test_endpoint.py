#!/usr/bin/env python3

import sys
import traceback
from healthAgents.health_profile_agent import HealthProfileAgent

def test_intelligent_assessment():
    """Test the specific method that was failing"""
    
    try:
        print("=== Testing HealthProfileAgent ===")
        
        # Initialize agent
        agent = HealthProfileAgent()
        print("✅ Agent initialized successfully")
        
        # Test data similar to the failing request
        test_data = {
            "user_id": "user_1751747468496",
            "assessment_date": "2025-07-05T20:31:08.496Z",
            "age": 27,
            "height": 152,
            "weight": 62,
            "gender": "male",
            "activity_level": "sedentary",
            "medical_conditions": ["Back Problems"],
            "medications": "Gastric Medicines, Paracetamols",
            "injuries": "nothing",
            "goals": ["muscle-gain"],
            "preferred_activities": ["Strength Training"],
            "dietary_preferences": ["Gluten-Free", "Dairy-Free"],
            "time_availability": "15-30",
            "equipment": ["No Equipment"],
            "sleep_quality": "average",
            "stress_level": "moderate",
            "energy_levels": "good",
            "work_type": "office"
        }
        
        print("=== Testing intelligent_assessment ===")
        result = agent.intelligent_assessment(test_data)
        print("✅ intelligent_assessment worked!")
        print(f"Response type: {type(result)}")
        print(f"Response keys: {result.keys() if isinstance(result, dict) else 'Not a dict'}")
        
        if isinstance(result, dict) and 'assessment' in result:
            assessment_preview = result['assessment'][:500] + "..." if len(result['assessment']) > 500 else result['assessment']
            print(f"Assessment preview: {assessment_preview}")
        
        print("\n=== Testing dynamic_greeting ===")
        greeting_context = {
            "name": "Test User",
            "time_of_day": "morning",
            "goals": ["muscle-gain"],
            "visit_count": 1
        }
        greeting = agent.dynamic_greeting(greeting_context)
        print("✅ dynamic_greeting worked!")
        print(f"Greeting: {greeting[:100]}...")
        
        print("\n=== All tests passed! ===")
        return True
        
    except Exception as e:
        print(f"❌ Error: {e}")
        print(f"❌ Error type: {type(e)}")
        print(f"❌ Traceback:")
        traceback.print_exc()
        return False

if __name__ == "__main__":
    success = test_intelligent_assessment()
    sys.exit(0 if success else 1) 