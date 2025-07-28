import { z } from "zod";

export const personalInfoSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  age: z.string().min(1, "Age is required"),
  gender: z.string().min(1, "Gender is required"),
  height: z.string().min(1, "Height is required"),
  weight: z.string().min(1, "Weight is required"),
});

export const healthInfoSchema = z.object({
  activityLevel: z.string().min(1, "Activity level is required"),
  medicalConditions: z.array(z.string()),
  medications: z.string(),
  injuries: z.string(),
  sleepQuality: z.string().min(1, "Sleep quality is required"),
  stressLevel: z.string().min(1, "Stress level is required"),
  energyLevels: z.string().min(1, "Energy level is required"),
  workType: z.string().min(1, "Work type is required"),
});

export const goalsSchema = z.object({
  primaryGoal: z.string().min(1, "Primary goal is required"),
  timeCommitment: z.string().min(1, "Time commitment is required"),
  equipment: z.array(z.string()),
});

export const preferencesSchema = z.object({
  workoutTypes: z.array(z.string()).min(1, "Select at least one workout type"),
  dietaryRestrictions: z.array(z.string()),
  additionalNotes: z.string().optional(),
});

export const assessmentFormSchema = personalInfoSchema
  .merge(healthInfoSchema)
  .merge(goalsSchema)
  .merge(preferencesSchema);

export type AssessmentFormData = z.infer<typeof assessmentFormSchema>;

export type FormField = keyof AssessmentFormData;

export type ArrayField = {
  [K in keyof AssessmentFormData]: AssessmentFormData[K] extends string[] ? K : never;
}[keyof AssessmentFormData];

export type StringField = Exclude<FormField, ArrayField>;

export interface AssessmentStepProps {
  formData: AssessmentFormData;
  onInputChange: (field: StringField, value: string) => void;
  onArrayChange?: (field: ArrayField, value: string, checked: boolean) => void;
}
