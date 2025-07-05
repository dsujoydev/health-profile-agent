import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Target, Zap, TrendingUp, Star, ArrowRight } from "lucide-react";

const Home = () => {
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
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-wellness-300/5 to-health-300/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
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
                <div>
                  Start Your Assessment
                  <ArrowRight className="ml-2 w-5 h-5" />
                </div>
              </Button>
              <Button asChild variant="outline" size="lg" className="hover:scale-105 transition-transform">
                <div>Explore Workouts</div>
              </Button>
            </div>
          </div>
        </div>
      </section>

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
              {/* <Link to="/assessment"> */}
              <div>
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5" />
                {/* </Link> */}
              </div>
            </Button>
            <Button asChild variant="outline" size="lg" className="hover:scale-105 transition-transform">
              {/* <Link to="/contact"> */}
              <div>
                Talk to an Expert
                <ArrowRight className="ml-2 w-5 h-5" />
                {/* </Link> */}
              </div>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
