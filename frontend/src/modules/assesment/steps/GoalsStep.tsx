import { Target, Clock, Dumbbell } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { AssessmentStepProps } from "../helpers/assesment.schemas";
import { PRIMARY_GOALS, TIME_COMMITMENT_OPTIONS, EQUIPMENT_OPTIONS } from "../helpers/assessment.constants";

export const GoalsStep = ({ formData, onInputChange, onArrayChange }: AssessmentStepProps) => {
  const handleCheckboxChange = (field: string, value: string, checked: boolean) => {
    if (onArrayChange) {
      onArrayChange(field, value, checked);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <Target className="w-12 h-12 text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-bold">Your Goals</h2>
        <p className="text-gray-600">What do you want to achieve?</p>
      </div>

      <div className="space-y-6">
        <div>
          <Label className="flex items-center gap-2 mb-2">
            <Target className="w-5 h-5" />
            Primary Goal
          </Label>
          <Select value={formData.primaryGoal} onValueChange={(value) => onInputChange("primaryGoal", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select your primary goal" />
            </SelectTrigger>
            <SelectContent>
              {PRIMARY_GOALS.map((goal) => (
                <SelectItem key={goal.value} value={goal.value}>
                  {goal.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5" />
            Time Commitment
          </Label>
          <Select value={formData.timeCommitment} onValueChange={(value) => onInputChange("timeCommitment", value)}>
            <SelectTrigger>
              <SelectValue placeholder="How much time can you commit?" />
            </SelectTrigger>
            <SelectContent>
              {TIME_COMMITMENT_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="flex items-center gap-2 mb-2">
            <Dumbbell className="w-5 h-5" />
            Available Equipment (select all that apply)
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {EQUIPMENT_OPTIONS.map((item) => (
              <div key={item.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`equipment-${item.value}`}
                  checked={formData?.equipment?.includes(item.value) || false}
                  onCheckedChange={(checked) => handleCheckboxChange("equipment", item.value, checked as boolean)}
                />
                <Label htmlFor={`equipment-${item.value}`} className="font-normal">
                  {item.label}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalsStep;
