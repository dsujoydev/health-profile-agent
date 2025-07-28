import { User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AssessmentStepProps } from "../helpers/assesment.schemas";
import { GENDER_OPTIONS } from "../helpers/assessment.constants";

export const PersonalInfoStep = ({ formData, onInputChange }: AssessmentStepProps) => {
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
            onChange={(e) => onInputChange("name", e.target.value)}
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            type="number"
            min="1"
            max="120"
            value={formData.age}
            onChange={(e) => onInputChange("age", e.target.value)}
            placeholder="Enter your age"
          />
        </div>

        <div>
          <Label>Gender</Label>
          <RadioGroup
            value={formData.gender}
            onValueChange={(value) => onInputChange("gender", value)}
            className="mt-2"
          >
            <div className="grid grid-cols-2 gap-4">
              {GENDER_OPTIONS.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value}>{option.label}</Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div>
          <Label htmlFor="height">Height (cm)</Label>
          <Input
            id="height"
            type="number"
            min="100"
            max="250"
            value={formData.height}
            onChange={(e) => onInputChange("height", e.target.value)}
            placeholder="Enter your height in cm"
          />
        </div>

        <div>
          <Label htmlFor="weight">Weight (kg)</Label>
          <Input
            id="weight"
            type="number"
            min="20"
            max="300"
            step="0.1"
            value={formData.weight}
            onChange={(e) => onInputChange("weight", e.target.value)}
            placeholder="Enter your weight in kg"
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoStep;
