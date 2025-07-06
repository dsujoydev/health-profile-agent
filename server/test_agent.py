#!/usr/bin/env python3

from healthAgents.health_profile_agent import HealthProfileAgent

def test_health_profile_agent():
    """Test the HealthProfileAgent to ensure methods are available"""
    
    # Initialize the agent
    agent = HealthProfileAgent()
    
    # Check if methods exist
    methods_to_check = ['store_context', 'get_contextual_response', 'context_memory']
    
    print("=== Health Profile Agent Test ===")
    print(f"Agent name: {agent.name}")
    print(f"Agent description: {agent.description}")
    
    print("\n=== Method Availability Check ===")
    for method in methods_to_check:
        if hasattr(agent, method):
            print(f"✅ {method}: Available")
        else:
            print(f"❌ {method}: Not available")
    
    print("\n=== Testing Dynamic Greeting ===")
    try:
        context = {
            "name": "John",
            "time_of_day": "morning",
            "goals": ["muscle-gain"],
            "visit_count": 1
        }
        greeting = agent.dynamic_greeting(context)
        print("✅ Dynamic greeting works")
        print(f"Greeting: {greeting[:100]}...")
    except Exception as e:
        print(f"❌ Dynamic greeting failed: {e}")
    
    print("\n=== Testing Intelligent Assessment ===")
    try:
        test_data = {
            "user_id": "test_user_123",
            "age": 27,
            "height": 152,
            "weight": 62,
            "gender": "male",
            "activity_level": "sedentary",
            "goals": ["muscle-gain"],
            "medical_conditions": ["Back Problems"]
        }
        
        result = agent.intelligent_assessment(test_data)
        print("✅ Intelligent assessment works")
        print(f"Assessment preview: {result['assessment'][:100]}...")
        
    except Exception as e:
        print(f"❌ Intelligent assessment failed: {e}")
    
    print("\n=== Testing Progress Guidance ===")
    try:
        guidance = agent.progress_aware_guidance("test_user", "Give me a health tip")
        print("✅ Progress guidance works")
        print(f"Guidance preview: {guidance[:100]}...")
    except Exception as e:
        print(f"❌ Progress guidance failed: {e}")

if __name__ == "__main__":
    test_health_profile_agent() 