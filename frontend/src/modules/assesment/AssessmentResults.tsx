import { Bot, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useTypewriter } from "@/hooks/useTypewriter";
import { renderMarkdown } from "@/lib/markdownUtils";
import { useEffect, useState } from "react";

// Function to convert JSON assessment to markdown
const convertJsonToMarkdown = (assessment: string): string => {
  try {
    // Try to parse as JSON first
    const jsonData = JSON.parse(assessment);

    let markdown = "";

    // Handle the specific structure of the health assessment
    if (jsonData["Health Assessment"]) {
      markdown += `# 🏥 Health Assessment\n\n`;

      // Process the Health Assessment section
      const healthAssessment = jsonData["Health Assessment"];

      // Process each subsection within Health Assessment
      Object.entries(healthAssessment).forEach(([subsection, content]) => {
        // Add emojis to make sections more visually appealing
        const sectionEmojis: { [key: string]: string } = {
          "1. Health Status Summary": "📊",
          "2. Risk Assessment": "⚠️",
          "3. Opportunity Areas": "💪",
          "4. Personalized Recommendations": "🎯",
          "5. Priority Action Items": "✅",
          "6. Success Metrics": "📈",
          "7. Motivation Strategy": "🔥",
        };

        const emoji = sectionEmojis[subsection] || "📋";
        markdown += `## ${emoji} ${subsection}\n\n`;

        if (typeof content === "object" && content !== null) {
          // Handle nested objects like { "summary": "...", "current_state": "..." }
          Object.entries(content).forEach(([key, value]) => {
            // Convert keys to readable titles
            const title = key
              .split("_")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ");

            markdown += `### ${title}\n\n`;

            if (Array.isArray(value)) {
              value.forEach((item: string) => {
                markdown += `• ${item}\n`;
              });
              markdown += "\n";
            } else if (typeof value === "string") {
              markdown += `${value}\n\n`;
            }
          });
        } else if (typeof content === "string") {
          markdown += `${content}\n\n`;
        }
      });
    }

    return markdown;
  } catch (error) {
    // If it's not valid JSON, return as is (assuming it's already markdown)
    console.log("Assessment is not JSON, treating as markdown:", error);
    return assessment;
  }
};

interface AssessmentResultsProps {
  aiAssessment: string;
  isLoadingResults: boolean;
  onTakeAgain: () => void;
}

export const AssessmentResults = ({ aiAssessment, isLoadingResults, onTakeAgain }: AssessmentResultsProps) => {
  const [shouldStartTyping, setShouldStartTyping] = useState(false);

  // Convert JSON to markdown if needed
  const formattedAssessment = convertJsonToMarkdown(aiAssessment);

  // Debug logging
  console.log("Original assessment:", aiAssessment);
  console.log("Formatted assessment:", formattedAssessment);

  const { displayedText: typedAssessment, isTyping } = useTypewriter(shouldStartTyping ? formattedAssessment : "", 15);

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
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center mb-8">
        <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
          <Bot className="w-12 h-12 text-white" />
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Your Personalized Health Assessment
        </h2>
        <p className="text-gray-600 text-lg">Here's what we recommend based on your profile</p>
      </div>

      <Card className="p-8 bg-white shadow-xl border-0">
        {isLoadingResults ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="relative">
              <Loader2 className="w-12 h-12 text-primary animate-spin mb-6" />
              <div className="absolute inset-0 w-12 h-12 border-4 border-blue-200 rounded-full animate-ping"></div>
            </div>
            <p className="text-gray-600 text-lg font-medium">Generating your personalized assessment...</p>
            <p className="text-gray-500 text-sm mt-2">This may take a few moments</p>
          </div>
        ) : (
          <div className="prose prose-lg max-w-none">
            <div className="space-y-6">
              {renderMarkdown(typedAssessment)}
              {isTyping && (
                <span className="inline-block w-3 h-6 bg-gradient-to-b from-blue-500 to-purple-600 animate-pulse ml-1 rounded"></span>
              )}
            </div>
          </div>
        )}
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
        <Button
          onClick={onTakeAgain}
          variant="outline"
          className="gap-2 px-8 py-3 text-lg font-medium"
          disabled={isLoadingResults}
        >
          <Sparkles className="w-5 h-5" />
          {isLoadingResults ? "Generating..." : "Start New Assessment"}
        </Button>

        <Button
          onClick={() => window.print()}
          variant="default"
          className="gap-2 px-8 py-3 text-lg font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
            />
          </svg>
          Print Assessment
        </Button>
      </div>

      {/* Tips Section */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-0">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">💡 Tips for Success</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Review your assessment regularly</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Track your progress weekly</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Adjust goals as needed</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AssessmentResults;
