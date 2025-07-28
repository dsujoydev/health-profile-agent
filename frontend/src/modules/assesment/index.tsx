import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, ArrowLeft, Loader2, CheckCircle } from "lucide-react";
import {
  AssessmentFormData,
  AssessmentStepProps,
  assessmentFormSchema,
  StringField,
  ArrayField,
} from "./helpers/assesment.schemas";

// Simple error handler
const handleError = (message: string) => {
  console.error(message);
  window.alert(`Error: ${message}`);
};

// Import steps and components
import { PersonalInfoStep, HealthInfoStep, GoalsStep, PreferencesStep } from "./steps";
import { AssessmentResults } from "./AssessmentResults";
import {
  TOTAL_STEPS,
  GENDER_OPTIONS,
  ACTIVITY_LEVELS,
  PRIMARY_GOALS,
  TIME_COMMITMENT_OPTIONS,
  WORKOUT_TYPES,
  DIETARY_RESTRICTIONS,
  EQUIPMENT_OPTIONS,
} from "./helpers/assessment.constants";

// Mock service - replace with actual API call
const submitAssessment = async (data: AssessmentFormData): Promise<string> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`# Health & Fitness Assessment Results

## Personal Information
- **Name:** ${data.name}
- **Age:** ${data.age}
- **Gender:** ${GENDER_OPTIONS.find((g) => g.value === data.gender)?.label || data.gender}
- **Height:** ${data.height} cm
- **Weight:** ${data.weight} kg

## Health Profile
- **Activity Level:** ${ACTIVITY_LEVELS.find((a) => a.value === data.activityLevel)?.label || data.activityLevel}
- **Sleep Quality:** ${data.sleepQuality}
- **Stress Level:** ${data.stressLevel}
- **Energy Levels:** ${data.energyLevels}
- **Work Type:** ${data.workType}

## Goals
- **Primary Goal:** ${PRIMARY_GOALS.find((g) => g.value === data.primaryGoal)?.label || data.primaryGoal}
- **Time Commitment:** ${
        TIME_COMMITMENT_OPTIONS.find((t) => t.value === data.timeCommitment)?.label || data.timeCommitment
      }
- **Equipment:** ${data.equipment.map((eq) => EQUIPMENT_OPTIONS.find((e) => e.value === eq)?.label || eq).join(", ")}

## Preferences
- **Workout Types:** ${data.workoutTypes.map((wt) => WORKOUT_TYPES.find((w) => w.value === wt)?.label || wt).join(", ")}
- **Dietary Restrictions:** ${
        data.dietaryRestrictions.length > 0
          ? data.dietaryRestrictions
              .map((dr) => DIETARY_RESTRICTIONS.find((d) => d.value === dr)?.label || dr)
              .join(", ")
          : "None"
      }

## Personalized Recommendations
Based on your assessment, here are our recommendations for you:

### Exercise Plan
1. **Cardio:** 30 minutes of moderate-intensity exercise 5 days a week
2. **Strength Training:** 2-3 days a week focusing on major muscle groups
3. **Flexibility:** Daily stretching routine
4. **Rest:** At least 1-2 rest days per week

### Nutrition Plan
- **Caloric Intake:** Approximately 2000-2200 calories per day
- **Macronutrients:** 40% carbs, 30% protein, 30% fat
- **Hydration:** At least 8 glasses of water daily

### Lifestyle Recommendations
- Aim for 7-9 hours of sleep per night
- Take short breaks every hour if you have a desk job
- Practice stress-reduction techniques like meditation or deep breathing

${data.additionalNotes ? `### Additional Notes\n${data.additionalNotes}\n` : ""}

*This is a sample assessment. For a complete and personalized plan, please consult with a certified health professional.*`);
    }, 1500);
  });
};

const Assessment = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [aiAssessment, setAiAssessment] = useState("");
  const [isLoadingResults, setIsLoadingResults] = useState(false);

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
    energyLevels: "",
    workType: "",
    primaryGoal: "",
    timeCommitment: "",
    availableEquipment: [],
    workoutPreferences: [],
    dietaryRestrictions: [],
    additionalNotes: "",
  };

  const methods = useForm<AssessmentFormData>({
    resolver: zodResolver(assessmentFormSchema),
    defaultValues,
  });

  const { handleSubmit, trigger, watch, setValue } = methods;
  const progress = (currentStep / TOTAL_STEPS) * 100;

  const nextStep = async () => {
    // Trigger validation for current step fields
    const fields = getStepFields(currentStep);
    const isValid = await trigger(fields as (keyof AssessmentFormData)[]);

    if (isValid && currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

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

  const onSubmit = async (data: AssessmentFormData) => {
    try {
      setIsLoadingResults(true);
      setIsSubmitting(true);
      const result = await submitAssessment(data);
      setAiAssessment(result);
      setShowResults(true);
    } catch (error) {
      console.error("Error submitting assessment:", error);
      handleError("Failed to submit assessment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
        isLoadingResults={isLoadingResults}
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

        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Step {currentStep} of {TOTAL_STEPS}
            </span>
            <span className="text-sm font-medium text-primary">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="mb-6">
          <CardContent className="p-6">{renderStepContent()}</CardContent>
        </Card>

        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1 || isSubmitting}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>

          {currentStep < TOTAL_STEPS ? (
            <Button type="button" onClick={nextStep} disabled={isSubmitting} className="gap-2">
              Next
              <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button type="submit" disabled={isSubmitting} className="gap-2">
              {isSubmitting ? (
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
