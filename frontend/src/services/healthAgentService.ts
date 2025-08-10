interface UserContext {
  name?: string;
  age?: number;
  goals?: string[];
  fitness_level?: string;
  visit_count?: number;
  last_activity?: string;
  mood?: string;
  time_of_day?: string;
  user_id?: string;
  health_status?: string;
  available_time?: string;
  equipment?: string;
  primary_goal?: string;
  budget?: string;
  motivation_level?: string;
  learning_style?: string;
  limitations?: string;
  schedule?: string;
  social_preference?: string;
}

interface AssessmentData {
  user_id?: string;
  assessment_date?: string;
  age?: number;
  height?: number;
  weight?: number;
  gender?: string;
  activity_level?: string;
  sleep_quality?: string;
  stress_level?: string;
  work_type?: string;
  medical_conditions?: string[];
  medications?: string;
  injuries?: string;
  energy_levels?: string;
  goals?: string[];
  secondary_goals?: string[];
  preferred_activities?: string[];
  dietary_preferences?: string[];
  time_availability?: string;
  [key: string]: string | number | string[] | boolean | undefined;
}

interface AssessmentResponse {
  assessment: string;
  user_id?: string;
}

class HealthAgentService {
  private baseUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";

  async getDynamicGreeting(context: UserContext): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}/api/health/profile/dynamic-greeting`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_context: context }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error("Error fetching dynamic greeting:", error);
      return "Welcome to your wellness journey! Let's help you achieve your health goals.";
    }
  }

  async getIntelligentAssessment(assessmentData: AssessmentData): Promise<AssessmentResponse> {
    try {
      console.log("Making API call to:", `${this.baseUrl}/api/health/profile/intelligent-assessment`);
      console.log("Request payload:", { user_data: assessmentData });

      const response = await fetch(`${this.baseUrl}/api/health/profile/intelligent-assessment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_data: assessmentData }),
      });

      console.log("Response status:", response.status);
      console.log("Response headers:", Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response body:", errorText);
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log("Response data:", data);
      console.log("Response data type:", typeof data);
      console.log("Assessment field type:", typeof data.assessment);
      console.log("Assessment content:", data.assessment);
      return data;
    } catch (error) {
      console.error("Error fetching intelligent assessment:", error);
      throw error;
    }
  }

  async getAdaptiveProgramSuggestion(context: UserContext): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}/api/health/profile/adaptive-program`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_context: context }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error("Error fetching adaptive program suggestion:", error);
      return "We recommend starting with a balanced approach of light exercise and healthy eating habits.";
    }
  }

  async getProgressAwareGuidance(userId: string, query: string): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}/api/health/profile/progress-guidance`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, query }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error("Error fetching progress guidance:", error);
      return "Stay consistent with your wellness routine and listen to your body. Small daily improvements lead to lasting results.";
    }
  }

  async getHealthConcept(concept: string): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}/api/health/info/explain-concept`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ concept }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error("Error fetching health concept:", error);
      return "Focus on balanced nutrition, regular exercise, and adequate sleep for optimal health.";
    }
  }
}

export default new HealthAgentService();
export type { UserContext, AssessmentData, AssessmentResponse };
