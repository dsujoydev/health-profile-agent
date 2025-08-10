import { CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ValidationIndicatorProps {
  isValid: boolean;
  isRequired?: boolean;
  className?: string;
}

export const ValidationIndicator = ({ isValid, isRequired = true, className }: ValidationIndicatorProps) => {
  if (!isRequired) return null;

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {isValid ? <CheckCircle className="w-4 h-4 text-green-500" /> : <AlertCircle className="w-4 h-4 text-red-500" />}
    </div>
  );
};

interface FieldWrapperProps {
  children: React.ReactNode;
  label: string;
  isValid: boolean;
  isRequired?: boolean;
  error?: string;
  icon?: React.ReactNode;
}

export const FieldWrapper = ({ children, label, isValid, isRequired = true, error, icon }: FieldWrapperProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm font-medium">
          {icon}
          {label}
          {isRequired && <span className="text-red-500">*</span>}
        </label>
        <ValidationIndicator isValid={isValid} isRequired={isRequired} />
      </div>
      {children}
      {error && (
        <p className="text-sm text-red-500 flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
          {error}
        </p>
      )}
    </div>
  );
};
