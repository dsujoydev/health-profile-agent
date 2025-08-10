import { useState } from "react";
import { AssessmentFormData, AssessmentHookReturn } from "../helpers/assessment.type";
import { TOTAL_STEPS } from "../helpers/assessment.constants";
import healthAgentService, { type AssessmentData } from "@/services/healthAgentService";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiAssessment, setAiAssessment] = useState<string>("");
  const [showResults, setShowResults] = useState(false);
  const [isLoadingResults, setIsLoadingResults] = useState(false);

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
    setIsSubmitting(false);
    setIsLoadingResults(false);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setIsLoadingResults(true);

    try {
      // Generate a unique user ID
      const userId = `user_${Date.now()}`;

      // Prepare assessment data for the AI
      const assessmentData: AssessmentData = {
        user_id: userId,
        assessment_date: new Date().toISOString(),
        age: parseInt(formData.age) || undefined,
        height: parseInt(formData.height) || undefined,
        weight: parseInt(formData.weight) || undefined,
        gender: formData.gender || undefined,
        activity_level: formData.activityLevel || undefined,
        medical_conditions: formData.medicalConditions.length > 0 ? formData.medicalConditions : undefined,
        medications: formData.medications || undefined,
        injuries: formData.injuries || undefined,
        goals: formData.primaryGoal ? [formData.primaryGoal] : undefined,
        preferred_activities: formData.workoutTypes.length > 0 ? formData.workoutTypes : undefined,
        dietary_preferences: formData.dietaryRestrictions.length > 0 ? formData.dietaryRestrictions : undefined,
        time_availability: formData.timeCommitment || undefined,
        equipment: formData.equipment.length > 0 ? formData.equipment : undefined,
        // Additional context
        sleep_quality: formData.sleepQuality || undefined,
        stress_level: formData.stressLevel || undefined,
        energy_levels: formData.energyLevels || undefined,
        work_type: formData.workType || undefined,
      };

      // Get AI assessment
      const result = await healthAgentService.getIntelligentAssessment(assessmentData);

      // Store user data in localStorage for future personalization
      localStorage.setItem("userId", userId);
      localStorage.setItem("userName", formData.name);
      localStorage.setItem("userGoals", JSON.stringify([formData.primaryGoal]));
      localStorage.setItem("fitnessLevel", formData.activityLevel);
      localStorage.setItem("primaryGoal", formData.primaryGoal);
      localStorage.setItem("availableTime", formData.timeCommitment);
      localStorage.setItem("equipment", JSON.stringify(formData.equipment));
      localStorage.setItem("healthStatus", "assessed");
      localStorage.setItem("motivationLevel", "high");

      setAiAssessment(result.assessment);
      setShowResults(true);
      setIsLoadingResults(false);
    } catch (error) {
      console.error("Error submitting assessment:", error);
      setIsLoadingResults(false);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    currentStep,
    totalSteps: TOTAL_STEPS,
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
    setShowResults,
    setCurrentStep,
    resetForm,
  };
};
