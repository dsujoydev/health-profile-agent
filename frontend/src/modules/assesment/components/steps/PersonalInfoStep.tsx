import { User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AssessmentFormData } from "../../types/assessment";
import { GENDER_OPTIONS } from "../../constants/assessmentOptions";

interface PersonalInfoStepProps {
  formData: AssessmentFormData;
  onInputChange: (field: string, value: string) => void;
}

export const PersonalInfoStep = ({ formData, onInputChange }: PersonalInfoStepProps) => {
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
            className="flex flex-row space-x-6 mt-2"
          >
            {GENDER_OPTIONS.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value}>{option.label}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <div>
          <Label htmlFor="height">Height (cm)</Label>
          <Input
            id="height"
            type="number"
            value={formData.height}
            onChange={(e) => onInputChange("height", e.target.value)}
            placeholder="Enter your height"
          />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="weight">Current Weight (kg)</Label>
          <Input
            id="weight"
            type="number"
            value={formData.weight}
            onChange={(e) => onInputChange("weight", e.target.value)}
            placeholder="Enter your current weight"
          />
        </div>
      </div>
    </div>
  );
};
