export interface AssessmentFormData {
  // Personal Info
  name: string;
  age: string;
  gender: string;
  height: string;
  weight: string;
  // Health Info
  activityLevel: string;
  medicalConditions: string[];
  medications: string;
  injuries: string;
  sleepQuality: string;
  stressLevel: string;
  energyLevels: string;
  workType: string;
  // Goals
  primaryGoal: string;
  timeCommitment: string;
  equipment: string[];
  // Preferences
  workoutTypes: string[];
  dietaryRestrictions: string[];
  additionalNotes: string;
}

export interface AssessmentStep {
  id: number;
  title: string;
  subtitle: string;
  icon: string;
}

export interface AssessmentResults {
  assessment: string;
  userId: string;
}

export interface AssessmentHookReturn {
  formData: AssessmentFormData;
  currentStep: number;
  totalSteps: number;
  progress: number;
  isSubmitting: boolean;
  showResults: boolean;
  isLoadingResults: boolean;
  aiAssessment: string;
  handleInputChange: (field: string, value: string) => void;
  handleArrayChange: (field: string, value: string, checked: boolean) => void;
  nextStep: () => void;
  prevStep: () => void;
  handleSubmit: () => Promise<void>;
  setShowResults: (show: boolean) => void;
  setCurrentStep: (step: number) => void;
  resetForm: () => void;
}
