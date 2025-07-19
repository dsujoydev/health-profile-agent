import { AssessmentStep } from "../types/assessment";

export const MEDICAL_CONDITION_OPTIONS = [
  "Diabetes",
  "High Blood Pressure",
  "Heart Disease",
  "Arthritis",
  "Asthma",
  "Back Problems",
  "None",
];

export const EQUIPMENT_OPTIONS = [
  "Dumbbells",
  "Resistance Bands",
  "Pull-up Bar",
  "Yoga Mat",
  "Treadmill",
  "Exercise Bike",
  "No Equipment",
];

export const WORKOUT_TYPE_OPTIONS = ["Strength Training", "Cardio", "Yoga", "Pilates", "HIIT", "Dance", "Swimming"];

export const DIETARY_OPTIONS = ["Vegetarian", "Vegan", "Keto", "Paleo", "Gluten-Free", "Dairy-Free", "No Restrictions"];

export const ACTIVITY_LEVELS = [
  { value: "sedentary", label: "Sedentary (little to no exercise)" },
  { value: "light", label: "Lightly active (1-3 days per week)" },
  { value: "moderate", label: "Moderately active (3-5 days per week)" },
  { value: "very", label: "Very active (6-7 days per week)" },
];

export const SLEEP_QUALITY_OPTIONS = [
  { value: "poor", label: "Poor (less than 5 hours)" },
  { value: "average", label: "Average (5-7 hours)" },
  { value: "good", label: "Good (7-9 hours)" },
  { value: "excellent", label: "Excellent (9+ hours)" },
];

export const STRESS_LEVELS = [
  { value: "low", label: "Low" },
  { value: "moderate", label: "Moderate" },
  { value: "high", label: "High" },
  { value: "very-high", label: "Very High" },
];

export const ENERGY_LEVELS = [
  { value: "low", label: "Low" },
  { value: "moderate", label: "Moderate" },
  { value: "good", label: "Good" },
  { value: "high", label: "High" },
];

export const WORK_TYPES = [
  { value: "office", label: "Office/Desk Work" },
  { value: "physical", label: "Physical/Manual Labor" },
  { value: "mixed", label: "Mixed (Office + Physical)" },
  { value: "remote", label: "Remote/Work from Home" },
  { value: "student", label: "Student" },
  { value: "retired", label: "Retired" },
];

export const PRIMARY_GOALS = [
  { value: "weight-loss", label: "Weight Loss" },
  { value: "muscle-gain", label: "Muscle Gain" },
  { value: "general-fitness", label: "General Fitness" },
  { value: "endurance", label: "Improve Endurance" },
  { value: "strength", label: "Build Strength" },
];

export const TIME_COMMITMENTS = [
  { value: "15-30", label: "15-30 minutes per day" },
  { value: "30-45", label: "30-45 minutes per day" },
  { value: "45-60", label: "45-60 minutes per day" },
  { value: "60+", label: "60+ minutes per day" },
];

export const GENDER_OPTIONS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

export const ASSESSMENT_STEPS: AssessmentStep[] = [
  {
    id: 1,
    title: "Personal Information",
    subtitle: "Let's start with the basics",
    icon: "User",
  },
  {
    id: 2,
    title: "Health Information",
    subtitle: "Help us understand your current health status",
    icon: "Heart",
  },
  {
    id: 3,
    title: "Fitness Goals",
    subtitle: "What do you want to achieve?",
    icon: "Target",
  },
  {
    id: 4,
    title: "Preferences",
    subtitle: "Customize your experience",
    icon: "Activity",
  },
];

export const TOTAL_STEPS = ASSESSMENT_STEPS.length;
