import { Activity, HeartPulse, Pill, Bandage, Moon, Zap, Laptop } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { AssessmentStepProps } from "../helpers/assesment.schemas";
import { ACTIVITY_LEVELS } from "../helpers/assessment.constants";
import { FieldWrapper } from "../components/ValidationIndicator";

const HEALTH_ISSUES = [
  { id: "diabetes", label: "Diabetes" },
  { id: "hypertension", label: "High Blood Pressure" },
  { id: "heart", label: "Heart Disease" },
  { id: "asthma", label: "Asthma" },
  { id: "arthritis", label: "Arthritis" },
  { id: "back-pain", label: "Chronic Back Pain" },
  { id: "anxiety", label: "Anxiety/Depression" },
  { id: "none", label: "None" },
];

export const HealthInfoStep = ({ formData, onInputChange, onArrayChange }: AssessmentStepProps) => {
  const handleCheckboxChange = (field: string, value: string, checked: boolean) => {
    if (onArrayChange) {
      onArrayChange(field, value, checked);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <HeartPulse className="w-12 h-12 text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-bold">Health Information</h2>
        <p className="text-gray-600">Help us understand your health status</p>
      </div>

      <div className="space-y-6">
        <FieldWrapper label="Activity Level" isValid={!!formData.activityLevel} icon={<Activity className="w-5 h-5" />}>
          <Select value={formData.activityLevel} onValueChange={(value) => onInputChange("activityLevel", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select your activity level" />
            </SelectTrigger>
            <SelectContent>
              {ACTIVITY_LEVELS.map((level) => (
                <SelectItem key={level.value} value={level.value}>
                  {level.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FieldWrapper>

        <div>
          <Label className="flex items-center gap-2 mb-2">
            <Bandage className="w-5 h-5" />
            Medical Conditions (select all that apply)
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {HEALTH_ISSUES.map((issue) => (
              <div key={issue.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`condition-${issue.id}`}
                  checked={formData.medicalConditions.includes(issue.id)}
                  onCheckedChange={(checked) => handleCheckboxChange("medicalConditions", issue.id, checked as boolean)}
                />
                <Label htmlFor={`condition-${issue.id}`} className="font-normal">
                  {issue.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label className="flex items-center gap-2 mb-2">
            <Pill className="w-5 h-5" />
            Current Medications
          </Label>
          <Textarea
            value={formData.medications}
            onChange={(e) => onInputChange("medications", e.target.value)}
            placeholder="List any medications you're currently taking..."
            rows={2}
          />
        </div>

        <div>
          <Label className="flex items-center gap-2 mb-2">
            <Bandage className="w-5 h-5" />
            Injuries or Physical Limitations
          </Label>
          <Textarea
            value={formData.injuries}
            onChange={(e) => onInputChange("injuries", e.target.value)}
            placeholder="Describe any injuries or physical limitations..."
            rows={2}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FieldWrapper label="Sleep Quality" isValid={!!formData.sleepQuality} icon={<Moon className="w-5 h-5" />}>
            <Select value={formData.sleepQuality} onValueChange={(value) => onInputChange("sleepQuality", value)}>
              <SelectTrigger>
                <SelectValue placeholder="How would you rate your sleep?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="excellent">Excellent (7-9 hours, restful)</SelectItem>
                <SelectItem value="good">Good (6-7 hours, mostly restful)</SelectItem>
                <SelectItem value="fair">Fair (5-6 hours, sometimes restless)</SelectItem>
                <SelectItem value="poor">Poor (less than 5 hours, often restless)</SelectItem>
              </SelectContent>
            </Select>
          </FieldWrapper>

          <FieldWrapper label="Energy Levels" isValid={!!formData.energyLevels} icon={<Zap className="w-5 h-5" />}>
            <Select value={formData.energyLevels} onValueChange={(value) => onInputChange("energyLevels", value)}>
              <SelectTrigger>
                <SelectValue placeholder="How are your energy levels?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">High (energetic throughout the day)</SelectItem>
                <SelectItem value="moderate">Moderate (energy dips in afternoon)</SelectItem>
                <SelectItem value="low">Low (frequently tired)</SelectItem>
                <SelectItem value="fluctuates">Fluctuates (varies day to day)</SelectItem>
              </SelectContent>
            </Select>
          </FieldWrapper>
        </div>

        <FieldWrapper label="Stress Level" isValid={!!formData.stressLevel} icon={<Activity className="w-5 h-5" />}>
          <Select value={formData.stressLevel} onValueChange={(value) => onInputChange("stressLevel", value)}>
            <SelectTrigger>
              <SelectValue placeholder="How would you rate your stress level?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low (rarely stressed)</SelectItem>
              <SelectItem value="moderate">Moderate (occasionally stressed)</SelectItem>
              <SelectItem value="high">High (frequently stressed)</SelectItem>
              <SelectItem value="very-high">Very High (constantly stressed)</SelectItem>
            </SelectContent>
          </Select>
        </FieldWrapper>

        <FieldWrapper label="Work Type" isValid={!!formData.workType} icon={<Laptop className="w-5 h-5" />}>
          <Select value={formData.workType} onValueChange={(value) => onInputChange("workType", value)}>
            <SelectTrigger>
              <SelectValue placeholder="What best describes your work?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sedentary">Mostly sitting (desk job)</SelectItem>
              <SelectItem value="light">Light activity (some walking/standing)</SelectItem>
              <SelectItem value="active">Active (on your feet most of the day)</SelectItem>
              <SelectItem value="labor">Physically demanding (heavy lifting, manual labor)</SelectItem>
            </SelectContent>
          </Select>
        </FieldWrapper>
      </div>
    </div>
  );
};

export default HealthInfoStep;
