import { Target } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { AssessmentFormData } from "../../types/assessment";
import { PRIMARY_GOALS, TIME_COMMITMENTS, EQUIPMENT_OPTIONS } from "../../constants/assessmentOptions";

interface GoalsStepProps {
  formData: AssessmentFormData;
  onInputChange: (field: string, value: string) => void;
  onArrayChange: (field: string, value: string, checked: boolean) => void;
}

export const GoalsStep = ({ formData, onInputChange, onArrayChange }: GoalsStepProps) => {
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
            onValueChange={(value) => onInputChange("primaryGoal", value)}
            className="mt-2"
          >
            {PRIMARY_GOALS.map((goal) => (
              <div key={goal.value} className="flex items-center space-x-2">
                <RadioGroupItem value={goal.value} id={goal.value} />
                <Label htmlFor={goal.value}>{goal.label}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div>
          <Label>Time Commitment</Label>
          <RadioGroup
            value={formData.timeCommitment}
            onValueChange={(value) => onInputChange("timeCommitment", value)}
            className="mt-2"
          >
            {TIME_COMMITMENTS.map((commitment) => (
              <div key={commitment.value} className="flex items-center space-x-2">
                <RadioGroupItem value={commitment.value} id={commitment.value} />
                <Label htmlFor={commitment.value}>{commitment.label}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div>
          <Label>Available Equipment (select all that apply)</Label>
          <div className="grid grid-cols-2 gap-3 mt-2">
            {EQUIPMENT_OPTIONS.map((equipment) => (
              <div key={equipment} className="flex items-center space-x-2">
                <Checkbox
                  id={equipment}
                  checked={formData.equipment.includes(equipment)}
                  onCheckedChange={(checked) => onArrayChange("equipment", equipment, checked as boolean)}
                />
                <Label htmlFor={equipment}>{equipment}</Label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
