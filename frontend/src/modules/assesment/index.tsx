import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";

// Import reusable components and hooks
import { useAssessmentForm } from "./hooks/useAssessmentForm";
import { PersonalInfoStep, HealthInfoStep, GoalsStep, PreferencesStep } from "./components/steps";
import { AssessmentResults } from "./components/AssessmentResults";

const Assessment = () => {
  // Use the custom assessment form hook
  const {
    formData,
    currentStep,
    totalSteps,
    progress,
    isSubmitting,
    showResults,
    isLoadingResults,
    aiAssessment,
    handleInputChange,
    handleArrayChange,
    nextStep,
    prevStep,
    handleSubmit,
    resetForm,
  } = useAssessmentForm();

  const handleTakeAgain = () => {
    resetForm();
  };

  const handleSubmitWithErrorHandling = async () => {
    try {
      await handleSubmit();
    } catch (error) {
      console.error("Error submitting assessment:", error);
      alert("There was an error processing your assessment. Please try again.");
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoStep formData={formData} onInputChange={handleInputChange} />;
      case 2:
        return (
          <HealthInfoStep formData={formData} onInputChange={handleInputChange} onArrayChange={handleArrayChange} />
        );
      case 3:
        return <GoalsStep formData={formData} onInputChange={handleInputChange} onArrayChange={handleArrayChange} />;
      case 4:
        return (
          <PreferencesStep formData={formData} onInputChange={handleInputChange} onArrayChange={handleArrayChange} />
        );
      default:
        return null;
    }
  };

  const renderResults = () => {
    if (!showResults) return null;

    return (
      <AssessmentResults
        aiAssessment={aiAssessment}
        isLoadingResults={isLoadingResults}
        onTakeAgain={handleTakeAgain}
      />
    );
  };

  if (showResults) {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">{renderResults()}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Health & Wellness Assessment</h1>
          <p className="text-lg text-gray-600">Help us create your personalized wellness plan</p>
          <Badge variant="secondary" className="mt-4">
            Step {currentStep} of {totalSteps}
          </Badge>
        </div>

        <div className="mb-8">
          <Progress value={progress} className="w-full h-2" />
        </div>

        <Card className="mb-8">
          <CardContent className="p-8">{renderStepContent()}</CardContent>
        </Card>

        <div className="flex justify-between">
          <Button variant="outline" onClick={prevStep} disabled={currentStep === 1} className="flex items-center">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          {currentStep === totalSteps ? (
            <Button
              onClick={handleSubmitWithErrorHandling}
              disabled={isSubmitting}
              className="bg-wellness-gradient flex items-center"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating AI Assessment...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Complete Assessment
                </>
              )}
            </Button>
          ) : (
            <Button onClick={nextStep} className="bg-wellness-gradient flex items-center">
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Assessment;
