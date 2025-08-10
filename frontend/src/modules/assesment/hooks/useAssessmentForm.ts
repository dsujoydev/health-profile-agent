import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { AssessmentFormData, AssessmentHookReturn } from "../helpers/assessment.type";
import { TOTAL_STEPS } from "../helpers/assessment.constants";
import healthAgentService, { type AssessmentData } from "@/services/healthAgentService";
import { toast } from "sonner";

const initialFormData: AssessmentFormData = {
  // Personal Info
  name: "",
  age: "",
  gender: "",
  height: "",
  weight: "",
  // Health Info
  activityLevel: "",
  medicalConditions: [],
  medications: "",
  injuries: "",
  sleepQuality: "",
  stressLevel: "",
  energyLevels: "",
  workType: "",
  // Goals
  primaryGoal: "",
  timeCommitment: "",
  equipment: [],
  // Preferences
  workoutTypes: [],
  dietaryRestrictions: [],
  additionalNotes: "",
};

export const useAssessmentForm = (): AssessmentHookReturn => {
  const [formData, setFormData] = useState<AssessmentFormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState(1);
  const [aiAssessment, setAiAssessment] = useState<string>("");
  const [showResults, setShowResults] = useState(false);

  const progress = (currentStep / TOTAL_STEPS) * 100;

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field: string, value: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: checked
        ? [...(prev[field as keyof typeof prev] as string[]), value]
        : (prev[field as keyof typeof prev] as string[]).filter((item) => item !== value),
    }));
  };

  const nextStep = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setCurrentStep(1);
    setShowResults(false);
    setAiAssessment("");
  };

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
      toast.error("Failed to submit assessment. Please try again.");
    },
  });

  const handleSubmit = async () => {
    submitAssessmentMutation.mutate(formData);
  };

  return {
    formData,
    currentStep,
    totalSteps: TOTAL_STEPS,
    progress,
    isSubmitting: submitAssessmentMutation.isPending,
    showResults,
    isLoadingResults: submitAssessmentMutation.isPending,
    aiAssessment,
    handleInputChange,
    handleArrayChange,
    nextStep,
    prevStep,
    handleSubmit,
    setShowResults,
    setCurrentStep,
    resetForm,
  };
};
