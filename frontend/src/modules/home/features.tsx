import { Card, CardContent } from "@/components/ui/card";
import { Heart, Target, Zap, TrendingUp } from "lucide-react";

const Features = () => {
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

  return (
    <>
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
    </>
  );
};

export default Features;
