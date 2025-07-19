import { Bot, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useTypewriter } from "@/hooks/useTypewriter";
import { renderMarkdown } from "@/lib/markdownUtils";
import { useEffect, useState } from "react";

interface AssessmentResultsProps {
  aiAssessment: string;
  isLoadingResults: boolean;
  onTakeAgain: () => void;
}

export const AssessmentResults = ({ aiAssessment, isLoadingResults, onTakeAgain }: AssessmentResultsProps) => {
  const [shouldStartTyping, setShouldStartTyping] = useState(false);
  const { displayedText: typedAssessment, isTyping } = useTypewriter(shouldStartTyping ? aiAssessment : "", 15);

  // Start typewriter effect after loading is complete and we have assessment text
  useEffect(() => {
    if (!isLoadingResults && aiAssessment && !shouldStartTyping) {
      const timer = setTimeout(() => {
        setShouldStartTyping(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isLoadingResults, aiAssessment, shouldStartTyping]);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Bot className="w-12 h-12 text-purple-600 mr-3" />
          <Sparkles className="w-8 h-8 text-yellow-500" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Your AI-Powered Health Assessment</h2>
        <p className="text-gray-600 mt-2">Based on your responses, here's your personalized wellness plan</p>
      </div>

      <Card className="p-8 bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
        {isLoadingResults ? (
          <div className="text-center py-12">
            <div className="flex items-center justify-center mb-4">
              <Loader2 className="w-8 h-8 text-purple-600 animate-spin mr-3" />
              <span className="text-lg font-semibold text-purple-600">AI is analyzing your health profile...</span>
            </div>
            <div className="space-y-3 max-w-md mx-auto">
              <div className="animate-pulse">
                <div className="bg-purple-200 rounded h-4 mb-3" />
                <div className="bg-purple-200 rounded h-4 w-4/5 mb-3" />
                <div className="bg-purple-200 rounded h-4 w-3/5" />
              </div>
            </div>
          </div>
        ) : (
          <div className="prose prose-lg max-w-none">
            <div className="text-gray-800 leading-relaxed">
              {renderMarkdown(typedAssessment || aiAssessment)}
              {isTyping && <span className="animate-pulse text-purple-600">|</span>}
            </div>
          </div>
        )}
      </Card>

      {!isLoadingResults && (
        <div className="text-center animate-fade-in">
          <Button onClick={onTakeAgain} variant="outline" className="mr-4">
            Take Assessment Again
          </Button>
          <Button className="bg-wellness-gradient">Explore Your Personalized Workouts</Button>
        </div>
      )}
    </div>
  );
};
