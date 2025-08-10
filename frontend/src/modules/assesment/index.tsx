import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, ArrowLeft, Loader2, CheckCircle } from "lucide-react";
import {
  AssessmentFormData,
  AssessmentStepProps,
  assessmentFormSchema,
  StringField,
  ArrayField,
} from "./helpers/assesment.schemas";
import healthAgentService, { type AssessmentData } from "@/services/healthAgentService";
import { toast } from "sonner";

// Import steps and components
import { PersonalInfoStep, HealthInfoStep, GoalsStep, PreferencesStep } from "./steps";
import { AssessmentResults } from "./AssessmentResults";
import { TOTAL_STEPS } from "./helpers/assessment.constants";
import { StepProgress } from "../../components/custom-ui/step-progress";

const Assessment = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showResults, setShowResults] = useState(false);
  const [aiAssessment, setAiAssessment] = useState("");

  const defaultValues: AssessmentFormData = {
    name: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    activityLevel: "",
    medicalConditions: [],
    medications: "",
    injuries: "",
    sleepQuality: "",
    stressLevel: "",
    energyLevels: "",
    workType: "",
    primaryGoal: "",
    timeCommitment: "",
    equipment: [],
    workoutTypes: [],
    dietaryRestrictions: [],
    additionalNotes: "",
  };

  const methods = useForm<AssessmentFormData>({
    resolver: zodResolver(assessmentFormSchema),
    defaultValues,
  });

  const { handleSubmit, trigger, watch, setValue } = methods;

  // Define getStepFields function first
  const getStepFields = (step: number): (keyof AssessmentFormData)[] => {
    switch (step) {
      case 1:
        return ["name", "age", "gender", "height", "weight"];
      case 2:
        return ["activityLevel", "sleepQuality", "stressLevel", "energyLevels", "workType"];
      case 3:
        return ["primaryGoal", "timeCommitment"];
      case 4:
        return ["workoutTypes"];
      default:
        return [];
    }
  };

  // Calculate step validation status
  const calculateStepValidation = () => {
    const formData = watch();
    const stepValidation: { [key: number]: { isValid: boolean; completedFields: number; totalFields: number } } = {};

    for (let step = 1; step <= TOTAL_STEPS; step++) {
      const fields = getStepFields(step);
      const totalFields = fields.length;
      let completedFields = 0;

      fields.forEach((field) => {
        const value = formData[field];
        if (Array.isArray(value)) {
          if (value.length > 0) completedFields++;
        } else {
          if (value && value.toString().trim() !== "") completedFields++;
        }
      });

      stepValidation[step] = {
        isValid: completedFields === totalFields && totalFields > 0,
        completedFields,
        totalFields,
      };
    }

    return stepValidation;
  };

  const stepValidation = calculateStepValidation();

  // React Query mutation for submitting assessment
  const submitAssessmentMutation = useMutation({
    mutationFn: async (data: AssessmentFormData) => {
      // Generate a unique user ID
      const userId = `user_${Date.now()}`;

      // Prepare assessment data for the AI
      const assessmentData: AssessmentData = {
        user_id: userId,
        assessment_date: new Date().toISOString(),
        age: parseInt(data.age) || undefined,
        height: parseInt(data.height) || undefined,
        weight: parseInt(data.weight) || undefined,
        gender: data.gender || undefined,
        activity_level: data.activityLevel || undefined,
        medical_conditions: data.medicalConditions.length > 0 ? data.medicalConditions : undefined,
        medications: data.medications || undefined,
        injuries: data.injuries || undefined,
        goals: data.primaryGoal ? [data.primaryGoal] : undefined,
        preferred_activities: data.workoutTypes.length > 0 ? data.workoutTypes : undefined,
        dietary_preferences: data.dietaryRestrictions.length > 0 ? data.dietaryRestrictions : undefined,
        time_availability: data.timeCommitment || undefined,
        equipment: data.equipment.length > 0 ? data.equipment : undefined,
        // Additional context
        sleep_quality: data.sleepQuality || undefined,
        stress_level: data.stressLevel || undefined,
        energy_levels: data.energyLevels || undefined,
        work_type: data.workType || undefined,
      };

      // Store user data in localStorage for future personalization
      localStorage.setItem("userId", userId);
      localStorage.setItem("userName", data.name);
      localStorage.setItem("userGoals", JSON.stringify([data.primaryGoal]));
      localStorage.setItem("fitnessLevel", data.activityLevel);
      localStorage.setItem("primaryGoal", data.primaryGoal);
      localStorage.setItem("availableTime", data.timeCommitment);
      localStorage.setItem("equipment", JSON.stringify(data.equipment));
      localStorage.setItem("healthStatus", "assessed");
      localStorage.setItem("motivationLevel", "high");

      // Get AI assessment
      const result = await healthAgentService.getIntelligentAssessment(assessmentData);
      return result.assessment;
    },
    onSuccess: (assessment) => {
      setAiAssessment(assessment);
      setShowResults(true);
      toast.success("Assessment submitted successfully!");
    },
    onError: (error) => {
      console.error("Error submitting assessment:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to submit assessment. Please try again.";
      toast.error(errorMessage);
    },
  });

  // Test API connection
  const testApiConnection = async () => {
    try {
      const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";
      const response = await fetch(`${baseUrl}/health`);
      if (response.ok) {
        console.log("API is accessible");
        return true;
      } else {
        console.error("API health check failed:", response.status);
        return false;
      }
    } catch (error) {
      console.error("API connection test failed:", error);
      return false;
    }
  };

  const nextStep = async () => {
    // Trigger validation for current step fields
    const fields = getStepFields(currentStep);
    console.log("Validating fields for step", currentStep, ":", fields);

    const isValid = await trigger(fields as (keyof AssessmentFormData)[]);
    console.log("Validation result:", isValid);

    // Get form errors for better debugging
    const errors = methods.formState.errors;
    console.log("Form errors:", errors);

    if (isValid && currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Show validation errors to user
      const errorFields = Object.keys(errors);
      if (errorFields.length > 0) {
        const errorMessages = errorFields.map((field) => {
          const error = errors[field as keyof typeof errors];
          return error?.message || `${field} is required`;
        });
        toast.error(`Please fill in all required fields: ${errorMessages.join(", ")}`);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const onSubmit = async (data: AssessmentFormData) => {
    console.log("Submitting assessment data:", data);

    // Test API connection first
    const isApiAccessible = await testApiConnection();
    if (!isApiAccessible) {
      toast.error("Cannot connect to the server. Please make sure the backend is running.");
      return;
    }

    submitAssessmentMutation.mutate(data);
  };

  const handleTakeAgain = () => {
    methods.reset();
    setCurrentStep(1);
    setShowResults(false);
    setAiAssessment("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleInputChange = (field: StringField, value: string) => {
    setValue(field, value, { shouldValidate: true });
  };

  const handleArrayChange = (field: ArrayField, value: string, checked: boolean) => {
    const currentValues = (watch(field as keyof AssessmentFormData) as string[]) || [];
    const newValues = checked ? [...currentValues, value] : currentValues.filter((v: string) => v !== value);

    setValue(field as keyof AssessmentFormData, newValues, { shouldValidate: true });
  };

  const renderStepContent = () => {
    const commonProps: AssessmentStepProps = {
      formData: watch(),
      onInputChange: handleInputChange,
      onArrayChange: handleArrayChange,
    };

    switch (currentStep) {
      case 1:
        return <PersonalInfoStep {...commonProps} />;
      case 2:
        return <HealthInfoStep {...commonProps} />;
      case 3:
        return <GoalsStep {...commonProps} />;
      case 4:
        return <PreferencesStep {...commonProps} />;
      default:
        return null;
    }
  };

  if (showResults) {
    return (
      <AssessmentResults
        aiAssessment={aiAssessment}
        isLoadingResults={submitAssessmentMutation.isPending}
        onTakeAgain={handleTakeAgain}
      />
    );
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl mx-auto p-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Health & Fitness Assessment</h1>
          <p className="text-gray-600">Complete the assessment to get personalized recommendations</p>
        </div>

        <StepProgress currentStep={currentStep} totalSteps={TOTAL_STEPS} stepValidation={stepValidation} />

        <Card className="mb-6">
          <CardContent className="p-6">{renderStepContent()}</CardContent>
        </Card>

        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1 || submitAssessmentMutation.isPending}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>

          {currentStep < TOTAL_STEPS ? (
            <Button type="button" onClick={nextStep} disabled={submitAssessmentMutation.isPending} className="gap-2">
              Next
              <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button type="submit" disabled={submitAssessmentMutation.isPending} className="gap-2">
              {submitAssessmentMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Submit Assessment
                </>
              )}
            </Button>
          )}
        </div>
      </form>
    </FormProvider>
  );
};

export default Assessment;
