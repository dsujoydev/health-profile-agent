import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { User, Heart, Target, Activity, CheckCircle, ArrowRight, ArrowLeft } from "lucide-react";

const Assessment = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Info
    name: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    // Health Info
    activityLevel: "",
    medicalConditions: [] as string[],
    medications: "",
    injuries: "",
    // Goals
    primaryGoal: "",
    timeCommitment: "",
    equipment: [] as string[],
    // Preferences
    workoutTypes: [] as string[],
    dietaryRestrictions: [] as string[],
    additionalNotes: "",
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const medicalConditionOptions = [
    "Diabetes",
    "High Blood Pressure",
    "Heart Disease",
    "Arthritis",
    "Asthma",
    "Back Problems",
    "None",
  ];

  const equipmentOptions = [
    "Dumbbells",
    "Resistance Bands",
    "Pull-up Bar",
    "Yoga Mat",
    "Treadmill",
    "Exercise Bike",
    "No Equipment",
  ];

  const workoutTypeOptions = ["Strength Training", "Cardio", "Yoga", "Pilates", "HIIT", "Dance", "Swimming"];

  const dietaryOptions = ["Vegetarian", "Vegan", "Keto", "Paleo", "Gluten-Free", "Dairy-Free", "No Restrictions"];

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
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log("Assessment completed:", formData);
    // Here you would typically send the data to your API
    alert("Assessment completed! Redirecting to your personalized dashboard...");
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <User className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold">Personal Information</h2>
              <p className="text-gray-600">Let's start with the basics</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleInputChange("age", e.target.value)}
                  placeholder="Enter your age"
                />
              </div>
              <div>
                <Label>Gender</Label>
                <RadioGroup
                  value={formData.gender}
                  onValueChange={(value) => handleInputChange("gender", value)}
                  className="flex flex-row space-x-6 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other">Other</Label>
                  </div>
                </RadioGroup>
              </div>
              <div>
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  value={formData.height}
                  onChange={(e) => handleInputChange("height", e.target.value)}
                  placeholder="Enter your height"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="weight">Current Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  value={formData.weight}
                  onChange={(e) => handleInputChange("weight", e.target.value)}
                  placeholder="Enter your current weight"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold">Health Information</h2>
              <p className="text-gray-600">Help us understand your current health status</p>
            </div>

            <div className="space-y-6">
              <div>
                <Label>Current Activity Level</Label>
                <RadioGroup
                  value={formData.activityLevel}
                  onValueChange={(value) => handleInputChange("activityLevel", value)}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sedentary" id="sedentary" />
                    <Label htmlFor="sedentary">Sedentary (little to no exercise)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="light" id="light" />
                    <Label htmlFor="light">Lightly active (1-3 days per week)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="moderate" id="moderate" />
                    <Label htmlFor="moderate">Moderately active (3-5 days per week)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="very" id="very" />
                    <Label htmlFor="very">Very active (6-7 days per week)</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>Medical Conditions (select all that apply)</Label>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  {medicalConditionOptions.map((condition) => (
                    <div key={condition} className="flex items-center space-x-2">
                      <Checkbox
                        id={condition}
                        checked={formData.medicalConditions.includes(condition)}
                        onCheckedChange={(checked) =>
                          handleArrayChange("medicalConditions", condition, checked as boolean)
                        }
                      />
                      <Label htmlFor={condition}>{condition}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="medications">Current Medications</Label>
                <Textarea
                  id="medications"
                  value={formData.medications}
                  onChange={(e) => handleInputChange("medications", e.target.value)}
                  placeholder="List any medications you're currently taking"
                />
              </div>

              <div>
                <Label htmlFor="injuries">Previous Injuries or Physical Limitations</Label>
                <Textarea
                  id="injuries"
                  value={formData.injuries}
                  onChange={(e) => handleInputChange("injuries", e.target.value)}
                  placeholder="Describe any injuries or physical limitations"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Target className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold">Fitness Goals</h2>
              <p className="text-gray-600">What do you want to achieve?</p>
            </div>

            <div className="space-y-6">
              <div>
                <Label>Primary Goal</Label>
                <RadioGroup
                  value={formData.primaryGoal}
                  onValueChange={(value) => handleInputChange("primaryGoal", value)}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="weight-loss" id="weight-loss" />
                    <Label htmlFor="weight-loss">Weight Loss</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="muscle-gain" id="muscle-gain" />
                    <Label htmlFor="muscle-gain">Muscle Gain</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="general-fitness" id="general-fitness" />
                    <Label htmlFor="general-fitness">General Fitness</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="endurance" id="endurance" />
                    <Label htmlFor="endurance">Improve Endurance</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="strength" id="strength" />
                    <Label htmlFor="strength">Build Strength</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>Time Commitment</Label>
                <RadioGroup
                  value={formData.timeCommitment}
                  onValueChange={(value) => handleInputChange("timeCommitment", value)}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="15-30" id="15-30" />
                    <Label htmlFor="15-30">15-30 minutes per day</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="30-45" id="30-45" />
                    <Label htmlFor="30-45">30-45 minutes per day</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="45-60" id="45-60" />
                    <Label htmlFor="45-60">45-60 minutes per day</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="60+" id="60+" />
                    <Label htmlFor="60+">60+ minutes per day</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>Available Equipment (select all that apply)</Label>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  {equipmentOptions.map((equipment) => (
                    <div key={equipment} className="flex items-center space-x-2">
                      <Checkbox
                        id={equipment}
                        checked={formData.equipment.includes(equipment)}
                        onCheckedChange={(checked) => handleArrayChange("equipment", equipment, checked as boolean)}
                      />
                      <Label htmlFor={equipment}>{equipment}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Activity className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold">Preferences</h2>
              <p className="text-gray-600">Customize your experience</p>
            </div>

            <div className="space-y-6">
              <div>
                <Label>Preferred Workout Types (select all that apply)</Label>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  {workoutTypeOptions.map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={type}
                        checked={formData.workoutTypes.includes(type)}
                        onCheckedChange={(checked) => handleArrayChange("workoutTypes", type, checked as boolean)}
                      />
                      <Label htmlFor={type}>{type}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Dietary Restrictions (select all that apply)</Label>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  {dietaryOptions.map((dietary) => (
                    <div key={dietary} className="flex items-center space-x-2">
                      <Checkbox
                        id={dietary}
                        checked={formData.dietaryRestrictions.includes(dietary)}
                        onCheckedChange={(checked) =>
                          handleArrayChange("dietaryRestrictions", dietary, checked as boolean)
                        }
                      />
                      <Label htmlFor={dietary}>{dietary}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="additionalNotes">Additional Notes</Label>
                <Textarea
                  id="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={(e) => handleInputChange("additionalNotes", e.target.value)}
                  placeholder="Any additional information you'd like to share..."
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

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
            <Button onClick={handleSubmit} className="bg-wellness-gradient flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              Complete Assessment
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
