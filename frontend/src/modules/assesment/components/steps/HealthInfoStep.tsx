import { Heart } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { AssessmentFormData } from "../../types/assessment";
import {
  MEDICAL_CONDITION_OPTIONS,
  ACTIVITY_LEVELS,
  SLEEP_QUALITY_OPTIONS,
  STRESS_LEVELS,
  ENERGY_LEVELS,
  WORK_TYPES,
} from "../../constants/assessmentOptions";

interface HealthInfoStepProps {
  formData: AssessmentFormData;
  onInputChange: (field: string, value: string) => void;
  onArrayChange: (field: string, value: string, checked: boolean) => void;
}

export const HealthInfoStep = ({ formData, onInputChange, onArrayChange }: HealthInfoStepProps) => {
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
            onValueChange={(value) => onInputChange("activityLevel", value)}
            className="mt-2"
          >
            {ACTIVITY_LEVELS.map((level) => (
              <div key={level.value} className="flex items-center space-x-2">
                <RadioGroupItem value={level.value} id={level.value} />
                <Label htmlFor={level.value}>{level.label}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div>
          <Label>Medical Conditions (select all that apply)</Label>
          <div className="grid grid-cols-2 gap-3 mt-2">
            {MEDICAL_CONDITION_OPTIONS.map((condition) => (
              <div key={condition} className="flex items-center space-x-2">
                <Checkbox
                  id={condition}
                  checked={formData.medicalConditions.includes(condition)}
                  onCheckedChange={(checked) => onArrayChange("medicalConditions", condition, checked as boolean)}
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
            onChange={(e) => onInputChange("medications", e.target.value)}
            placeholder="List any medications you're currently taking"
          />
        </div>

        <div>
          <Label htmlFor="injuries">Previous Injuries or Physical Limitations</Label>
          <Textarea
            id="injuries"
            value={formData.injuries}
            onChange={(e) => onInputChange("injuries", e.target.value)}
            placeholder="Describe any injuries or physical limitations"
          />
        </div>

        <div>
          <Label>Sleep Quality</Label>
          <RadioGroup
            value={formData.sleepQuality}
            onValueChange={(value) => onInputChange("sleepQuality", value)}
            className="mt-2"
          >
            {SLEEP_QUALITY_OPTIONS.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={`${option.value}-sleep`} />
                <Label htmlFor={`${option.value}-sleep`}>{option.label}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div>
          <Label>Stress Level</Label>
          <RadioGroup
            value={formData.stressLevel}
            onValueChange={(value) => onInputChange("stressLevel", value)}
            className="mt-2"
          >
            {STRESS_LEVELS.map((level) => (
              <div key={level.value} className="flex items-center space-x-2">
                <RadioGroupItem value={level.value} id={`${level.value}-stress`} />
                <Label htmlFor={`${level.value}-stress`}>{level.label}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div>
          <Label>Energy Levels</Label>
          <RadioGroup
            value={formData.energyLevels}
            onValueChange={(value) => onInputChange("energyLevels", value)}
            className="mt-2"
          >
            {ENERGY_LEVELS.map((level) => (
              <div key={level.value} className="flex items-center space-x-2">
                <RadioGroupItem value={level.value} id={`${level.value}-energy`} />
                <Label htmlFor={`${level.value}-energy`}>{level.label}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div>
          <Label>Work Type</Label>
          <RadioGroup
            value={formData.workType}
            onValueChange={(value) => onInputChange("workType", value)}
            className="mt-2"
          >
            {WORK_TYPES.map((type) => (
              <div key={type.value} className="flex items-center space-x-2">
                <RadioGroupItem value={type.value} id={`${type.value}-work`} />
                <Label htmlFor={`${type.value}-work`}>{type.label}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};
