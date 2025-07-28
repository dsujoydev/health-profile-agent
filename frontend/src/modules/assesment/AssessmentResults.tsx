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
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Bot className="w-10 h-10 text-primary" />
        </div>
        <h2 className="text-2xl font-bold">Your Personalized Health Assessment</h2>
        <p className="text-gray-600">Here's what we recommend based on your profile</p>
      </div>

      <Card className="p-6 bg-muted/50">
        {isLoadingResults ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-primary animate-spin mb-4" />
            <p className="text-gray-600">Generating your personalized assessment...</p>
          </div>
        ) : (
          <div className="prose max-w-none">
            <div
              className="whitespace-pre-wrap"
              dangerouslySetInnerHTML={{
                __html: renderMarkdown(typedAssessment),
              }}
            />
            {isTyping && (
              <span className="inline-block w-2 h-6 bg-primary animate-pulse ml-1"></span>
            )}
          </div>
        )}
      </Card>

      <div className="flex justify-center pt-6">
        <Button
          onClick={onTakeAgain}
          variant="outline"
          className="gap-2"
          disabled={isLoadingResults}
        >
          <Sparkles className="w-4 h-4" />
          {isLoadingResults ? 'Generating...' : 'Start Over'}
        </Button>
      </div>
    </div>
  );
};

export default AssessmentResults;
