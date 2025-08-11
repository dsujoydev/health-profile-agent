import { Heart, Utensils, MessageSquare } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { AssessmentStepProps, ArrayField } from "../helpers/assesment.schemas";
import { WORKOUT_TYPES, DIETARY_RESTRICTIONS } from "../helpers/assessment.constants";

export const PreferencesStep = ({ formData, onInputChange, onArrayChange }: AssessmentStepProps) => {
  const handleCheckboxChange = (field: string, value: string, checked: boolean) => {
    if (onArrayChange) {
      onArrayChange(field as ArrayField, value, checked);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-bold">Your Preferences</h2>
        <p className="text-gray-600">Tell us what you enjoy</p>
      </div>

      <div className="space-y-6">
        <div>
          <Label className="flex items-center gap-2 mb-2">
            <Heart className="w-5 h-5" />
            Preferred Workout Types (select all that apply)
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {WORKOUT_TYPES.map((type) => (
              <div key={type.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`workout-${type.value}`}
                  checked={formData.workoutTypes.includes(type.value)}
                  onCheckedChange={(checked) => handleCheckboxChange("workoutTypes", type.value, checked as boolean)}
                />
                <Label htmlFor={`workout-${type.value}`} className="font-normal">
                  {type.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label className="flex items-center gap-2 mb-2">
            <Utensils className="w-5 h-5" />
            Dietary Restrictions (select all that apply)
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {DIETARY_RESTRICTIONS.map((item) => (
              <div key={item.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`diet-${item.value}`}
                  checked={formData?.dietaryRestrictions?.includes(item.value) || false}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange("dietaryRestrictions", item.value, checked as boolean)
                  }
                />
                <Label htmlFor={`diet-${item.value}`} className="font-normal">
                  {item.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label className="flex items-center gap-2 mb-2">
            <MessageSquare className="w-5 h-5" />
            Additional Notes
          </Label>
          <Textarea
            value={formData.additionalNotes || ""}
            onChange={(e) => onInputChange("additionalNotes", e.target.value)}
            placeholder="Anything else you'd like us to know about your preferences, goals, or health?"
            rows={4}
          />
        </div>
      </div>
    </div>
  );
};

export default PreferencesStep;
