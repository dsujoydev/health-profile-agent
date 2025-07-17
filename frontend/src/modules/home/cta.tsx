import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

const CTA = () => {
  return (
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
  );
};

export default CTA;
