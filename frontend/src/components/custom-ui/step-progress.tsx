import { CheckCircle, Circle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
  stepValidation: {
    [key: number]: {
      isValid: boolean;
      completedFields: number;
      totalFields: number;
    };
  };
}

export const StepProgress = ({ currentStep, totalSteps, stepValidation }: StepProgressProps) => {
  const getStepStatus = (step: number) => {
    const validation = stepValidation[step];
    if (!validation) return "pending";

    if (validation.isValid) return "completed";
    if (validation.completedFields > 0) return "partial";
    return "pending";
  };

  const getStepIcon = (step: number) => {
    const status = getStepStatus(step);

    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "partial":
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default:
        return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStepLabel = (step: number) => {
    switch (step) {
      case 1:
        return "Personal Info";
      case 2:
        return "Health Info";
      case 3:
        return "Goals";
      case 4:
        return "Preferences";
      default:
        return `Step ${step}`;
    }
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-sm font-medium text-primary">
          {Math.round((currentStep / totalSteps) * 100)}% Complete
        </span>
      </div>

      <div className="flex items-center space-x-4">
        {Array.from({ length: totalSteps }, (_, index) => {
          const step = index + 1;
          const isCurrentStep = step === currentStep;
          const status = getStepStatus(step);

          return (
            <div
              key={step}
              className={cn(
                "flex items-center gap-2 text-sm",
                isCurrentStep && "text-primary font-medium",
                status === "completed" && "text-green-600",
                status === "partial" && "text-yellow-600"
              )}
            >
              {getStepIcon(step)}
              <span className="hidden sm:inline">{getStepLabel(step)}</span>
            </div>
          );
        })}
      </div>

      {/* Show current step validation status */}
      {stepValidation[currentStep] && (
        <div className="mt-3 p-3 bg-muted rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Current Step Progress:</span>
            <span className="text-muted-foreground">
              {stepValidation[currentStep].completedFields} of {stepValidation[currentStep].totalFields} fields
              completed
            </span>
          </div>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{
                width: `${
                  (stepValidation[currentStep].completedFields / stepValidation[currentStep].totalFields) * 100
                }%`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
