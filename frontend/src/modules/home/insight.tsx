import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Heart, Target, Sparkles, Loader2 } from "lucide-react";
import healthAgentService from "@/services/healthAgentService";
import { useTypewriter } from "@/hooks/useTypewriter";
import { renderMarkdown } from "@/lib/markdownUtils";

const Insight = () => {
  const [personalizedTip, setPersonalizedTip] = useState("");
  const [adaptiveRecommendations, setAdaptiveRecommendations] = useState("");

  // Loading states
  const [isLoadingTip, setIsLoadingTip] = useState(false);
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(false);

  // Typewriter effect for different content
  const { displayedText: typedTip, isTyping: isTipTyping } = useTypewriter(personalizedTip, 30);
  const { displayedText: typedRecommendations, isTyping: isRecommendationsTyping } = useTypewriter(
    adaptiveRecommendations,
    30
  );

  // Get user context from localStorage/state
  const getUserContext = () => {
    const now = new Date();
    const timeOfDay = now.getHours() < 12 ? "morning" : now.getHours() < 17 ? "afternoon" : "evening";

    return {
      name: localStorage.getItem("userName") || undefined,
      time_of_day: timeOfDay,
      visit_count: parseInt(localStorage.getItem("visitCount") || "0"),
      goals: JSON.parse(localStorage.getItem("userGoals") || "[]"),
      fitness_level: localStorage.getItem("fitnessLevel") || "beginner",
      user_id: localStorage.getItem("userId") || `user_${Date.now()}`,
      primary_goal: localStorage.getItem("primaryGoal") || "general wellness",
      available_time: localStorage.getItem("availableTime") || "30 minutes",
      equipment: localStorage.getItem("equipment") || "bodyweight",
      health_status: localStorage.getItem("healthStatus") || "good",
      motivation_level: localStorage.getItem("motivationLevel") || "medium",
    };
  };

  useEffect(() => {
    const loadDynamicContent = async () => {
      const context = getUserContext();

      // Load personalized tip with loading state
      setIsLoadingTip(true);
      try {
        const tip = await healthAgentService.getProgressAwareGuidance(
          context.user_id || "anonymous",
          "Give me a personalized health tip for today based on my profile"
        );
        setPersonalizedTip(tip);
      } catch (error) {
        console.error("Error loading tip:", error);
      } finally {
        setIsLoadingTip(false);
      }

      // Load adaptive recommendations with loading state
      setIsLoadingRecommendations(true);
      try {
        const recommendations = await healthAgentService.getAdaptiveProgramSuggestion(context);
        setAdaptiveRecommendations(recommendations);
      } catch (error) {
        console.error("Error loading recommendations:", error);
      } finally {
        setIsLoadingRecommendations(false);
      }
    };

    loadDynamicContent();
  }, []);

  // Only render if there's content or loading
  if (!personalizedTip && !adaptiveRecommendations && !isLoadingTip && !isLoadingRecommendations) {
    return null;
  }

  return (
    <section className="py-16 bg-gradient-to-r from-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            <Sparkles className="inline w-8 h-8 text-purple-600 mr-2" />
            Personalized AI Insights
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our AI analyzes your unique profile to provide tailored recommendations
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Personalized Tip */}
          {isLoadingTip ? (
            <Card className="p-6 hover:shadow-lg transition-shadow border-l-4 border-l-purple-500">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-purple-100 rounded-full">
                  <Loader2 className="w-6 h-6 text-purple-600 animate-spin" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Daily Health Tip</h3>
                  <div className="animate-pulse">
                    <div className="bg-gray-200 rounded h-4 mb-2" />
                    <div className="bg-gray-200 rounded h-4 w-3/4" />
                  </div>
                </div>
              </div>
            </Card>
          ) : (
            personalizedTip && (
              <Card className="p-6 hover:shadow-lg transition-shadow border-l-4 border-l-purple-500 animate-fade-in">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-purple-100 rounded-full">
                    <Heart className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Daily Health Tip</h3>
                    <div className="text-gray-700 leading-relaxed">
                      {renderMarkdown(typedTip || personalizedTip)}
                      {isTipTyping && <span className="animate-pulse text-purple-600">|</span>}
                    </div>
                  </div>
                </div>
              </Card>
            )
          )}

          {/* Adaptive Recommendations */}
          {isLoadingRecommendations ? (
            <Card className="p-6 hover:shadow-lg transition-shadow border-l-4 border-l-green-500">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <Loader2 className="w-6 h-6 text-green-600 animate-spin" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Recommended Programs</h3>
                  <div className="animate-pulse space-y-2">
                    <div className="bg-gray-200 rounded h-4" />
                    <div className="bg-gray-200 rounded h-4 w-5/6" />
                    <div className="bg-gray-200 rounded h-4 w-4/6" />
                  </div>
                </div>
              </div>
            </Card>
          ) : (
            adaptiveRecommendations && (
              <Card className="p-6 hover:shadow-lg transition-shadow border-l-4 border-l-green-500 animate-fade-in">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-green-100 rounded-full">
                    <Target className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Recommended Programs</h3>
                    <div className="text-gray-700 leading-relaxed">
                      {renderMarkdown(typedRecommendations || adaptiveRecommendations)}
                      {isRecommendationsTyping && <span className="animate-pulse text-green-600">|</span>}
                    </div>
                  </div>
                </div>
              </Card>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default Insight;
