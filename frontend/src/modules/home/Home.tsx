import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Target, Zap, TrendingUp, Star, ArrowRight, Bot, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import healthAgentService from "@/services/healthAgentService";

const Home = () => {
  const [dynamicGreeting, setDynamicGreeting] = useState("");
  const [personalizedTip, setPersonalizedTip] = useState("");
  const [adaptiveRecommendations, setAdaptiveRecommendations] = useState("");

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
      try {
        const context = getUserContext();

        // Get dynamic greeting
        const greeting = await healthAgentService.getDynamicGreeting(context);
        setDynamicGreeting(greeting);

        // Get personalized tip
        const tip = await healthAgentService.getProgressAwareGuidance(
          context.user_id || "anonymous",
          "Give me a personalized health tip for today based on my profile"
        );
        setPersonalizedTip(tip);

        // Get adaptive recommendations
        const recommendations = await healthAgentService.getAdaptiveProgramSuggestion(context);
        setAdaptiveRecommendations(recommendations);

        // Update visit count
        const newVisitCount = (context.visit_count || 0) + 1;
        localStorage.setItem("visitCount", newVisitCount.toString());
      } catch (error) {
        console.error("Error loading dynamic content:", error);
      }
    };
    loadDynamicContent();
  }, []);

  const features = [
    {
      icon: Heart,
      title: "AI Health Assessment",
      description: "Get personalized health insights with our comprehensive AI-powered assessment tool.",
      color: "text-red-500",
    },
    {
      icon: Target,
      title: "Custom Workout Plans",
      description: "Tailored fitness routines based on your goals, fitness level, and available equipment.",
      color: "text-blue-500",
    },
    {
      icon: Zap,
      title: "Smart Nutrition",
      description: "Intelligent meal planning with nutritional analysis and dietary preference support.",
      color: "text-green-500",
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      description: "Comprehensive analytics to monitor your health and fitness journey over time.",
      color: "text-purple-500",
    },
  ];

  const stats = [
    { value: "50K+", label: "Active Users" },
    { value: "1M+", label: "Workouts Completed" },
    { value: "98%", label: "Satisfaction Rate" },
    { value: "24/7", label: "AI Support" },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Fitness Enthusiast",
      content: "WellnessAI completely transformed my fitness journey. The personalized plans are incredible!",
      rating: 5,
    },
    {
      name: "Mike Chen",
      role: "Busy Professional",
      content: "Finally found a platform that adapts to my hectic schedule. The quick workouts are perfect.",
      rating: 5,
    },
    {
      name: "Emily Davis",
      role: "Nutrition Coach",
      content: "The meal planning feature is phenomenal. My clients love the personalized recommendations.",
      rating: 5,
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section with Dynamic Content */}
      <section className="relative py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-wellness-300/5 to-health-300/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Dynamic Greeting */}
            {dynamicGreeting && (
              <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl border border-blue-100 shadow-sm">
                <div className="flex items-center justify-center mb-3">
                  <Bot className="w-6 h-6 text-blue-600 mr-2" />
                  <span className="text-sm font-semibold text-blue-600">AI Personal Greeting</span>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto">{dynamicGreeting}</p>
              </div>
            )}

            <Badge variant="secondary" className="mb-4 px-4 py-2">
              <Zap className="w-4 h-4 mr-2" />
              AI-Powered Health & Wellness
            </Badge>

            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Your Personal <span className="bg-wellness-gradient bg-clip-text text-transparent">Wellness</span>{" "}
              Assistant
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
          </div>
        </div>
      </section>

      {/* AI-Powered Insights Section */}
      {(personalizedTip || adaptiveRecommendations) && (
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
              {personalizedTip && (
                <Card className="p-6 hover:shadow-lg transition-shadow border-l-4 border-l-purple-500">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-purple-100 rounded-full">
                      <Heart className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Daily Health Tip</h3>
                      <p className="text-gray-700 leading-relaxed">{personalizedTip}</p>
                    </div>
                  </div>
                </Card>
              )}

              {/* Adaptive Recommendations */}
              {adaptiveRecommendations && (
                <Card className="p-6 hover:shadow-lg transition-shadow border-l-4 border-l-green-500">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-green-100 rounded-full">
                      <Target className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Recommended Programs</h3>
                      <div className="text-gray-700 leading-relaxed">
                        {adaptiveRecommendations
                          .split("\n")
                          .slice(0, 3)
                          .map((line, index) => (
                            <p key={index} className="mb-2">
                              {line}
                            </p>
                          ))}
                      </div>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Everything You Need for Better Health</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our comprehensive platform combines cutting-edge AI with proven wellness strategies
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="text-center p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <CardContent className="pt-6">
                  <div className={`inline-flex p-3 rounded-full bg-gray-50 mb-4 ${feature.color}`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-wellness-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="animate-fade-in">
                <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
            <p className="text-xl text-gray-600">Join thousands who've transformed their health with WellnessAI</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/20 to-wellness-500/20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Ready to Transform Your Health?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Start your personalized wellness journey today with our AI-powered platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-wellness-gradient hover:scale-105 transition-transform">
              <Link to="/assessment">
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="hover:scale-105 transition-transform">
              <Link to="/workouts">
                Explore Workouts
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
