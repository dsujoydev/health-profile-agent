import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, ArrowRight, Bot, Loader2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import healthAgentService from "@/services/healthAgentService";

// Skeleton loader component
const SkeletonLoader = ({ lines = 1, className = "" }: { lines?: number; className?: string }) => (
  <div className={className}>
    <div className="flex items-center justify-center mb-3">
      <Loader2 className="w-6 h-6 text-blue-600 mr-2 animate-spin" />
      <span className="text-sm font-semibold text-blue-600">AI is thinking...</span>
    </div>
    <div className="animate-pulse">
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className={`bg-gray-200 rounded h-4 ${i > 0 ? "mt-2" : ""}`} />
      ))}
    </div>
  </div>
);

// Typewriter effect hook
const useTypewriter = (text: string, speed = 30) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!text) return;

    setIsTyping(true);
    setDisplayedText("");
    let index = 0;

    const timer = setInterval(() => {
      setDisplayedText((prev) => prev + text[index]);
      index++;

      if (index >= text.length) {
        clearInterval(timer);
        setIsTyping(false);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return { displayedText, isTyping };
};

const Hero = () => {
  const [dynamicGreeting, setDynamicGreeting] = useState("");
  const [isLoadingGreeting, setIsLoadingGreeting] = useState(false);

  // Typewriter effect for greeting
  const { displayedText: typedGreeting, isTyping } = useTypewriter(dynamicGreeting, 25);

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

      // Load greeting with loading state
      setIsLoadingGreeting(true);
      try {
        const greeting = await healthAgentService.getDynamicGreeting(context);
        setDynamicGreeting(greeting);
      } catch (error) {
        console.error("Error loading greeting:", error);
      } finally {
        setIsLoadingGreeting(false);
      }

      // Update visit count
      const newVisitCount = (context.visit_count || 0) + 1;
      localStorage.setItem("visitCount", newVisitCount.toString());
    };

    loadDynamicContent();
  }, []);

  return (
    <section className="relative py-20 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-wellness-300/5 to-health-300/5"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <Badge variant="secondary" className="mb-4 px-4 py-2">
            <Zap className="w-4 h-4 mr-2" />
            AI-Powered Health & Wellness
          </Badge>

          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            Your Personal <span className="bg-wellness-gradient bg-clip-text text-transparent">Wellness</span> Assistant
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Transform your health journey with AI-powered assessments, personalized workout plans, smart nutrition
            guidance, and comprehensive progress tracking.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-wellness-gradient hover:scale-105 transition-transform">
              <Link to="/assessment">
                Start Your Assessment
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="hover:scale-105 transition-transform">
              <Link to="/workouts">Explore Workouts</Link>
            </Button>
          </div>

          {isLoadingGreeting ? (
            <SkeletonLoader
              lines={3}
              className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl border border-blue-100 shadow-sm"
            />
          ) : (
            dynamicGreeting && (
              <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl border border-blue-100 shadow-sm animate-fade-in">
                <div className="flex items-center justify-center mb-3">
                  <Bot className="w-6 h-6 text-blue-600 mr-2" />
                  <span className="text-sm font-semibold text-blue-600">AI Personal Greeting</span>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto">
                  {typedGreeting}
                  {isTyping && <span className="animate-pulse">|</span>}
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
