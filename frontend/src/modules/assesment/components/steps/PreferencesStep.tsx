import { Activity } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { AssessmentFormData } from "../../types/assessment";
import { WORKOUT_TYPE_OPTIONS, DIETARY_OPTIONS } from "../../constants/assessmentOptions";

interface PreferencesStepProps {
  formData: AssessmentFormData;
  onInputChange: (field: string, value: string) => void;
  onArrayChange: (field: string, value: string, checked: boolean) => void;
}

export const PreferencesStep = ({ formData, onInputChange, onArrayChange }: PreferencesStepProps) => {
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
            {WORKOUT_TYPE_OPTIONS.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={type}
                  checked={formData.workoutTypes.includes(type)}
                  onCheckedChange={(checked) => onArrayChange("workoutTypes", type, checked as boolean)}
                />
                <Label htmlFor={type}>{type}</Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label>Dietary Restrictions (select all that apply)</Label>
          <div className="grid grid-cols-2 gap-3 mt-2">
            {DIETARY_OPTIONS.map((dietary) => (
              <div key={dietary} className="flex items-center space-x-2">
                <Checkbox
                  id={dietary}
                  checked={formData.dietaryRestrictions.includes(dietary)}
                  onCheckedChange={(checked) => onArrayChange("dietaryRestrictions", dietary, checked as boolean)}
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
            onChange={(e) => onInputChange("additionalNotes", e.target.value)}
            placeholder="Any additional information you'd like to share..."
          />
        </div>
      </div>
    </div>
  );
};
