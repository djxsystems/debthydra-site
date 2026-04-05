import { InputHTMLAttributes, forwardRef } from "react";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
  error?: string;
  prefix?: string;
  suffix?: string;
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, hint, error, prefix, suffix, className = "", id, ...props }, ref) => {
    const fieldId = id ?? label.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex flex-col gap-1">
        <label htmlFor={fieldId} className="text-sm font-medium text-gray-700">
          {label}
        </label>
        {hint && <p className="text-xs text-gray-500">{hint}</p>}
        <div className="relative flex items-center">
          {prefix && (
            <span className="absolute left-3 text-gray-500 text-sm select-none">{prefix}</span>
          )}
          <input
            ref={ref}
            id={fieldId}
            className={`w-full rounded-lg border ${
              error ? "border-red-400" : "border-gray-200"
            } bg-white py-2 text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
              prefix ? "pl-7" : "pl-3"
            } ${suffix ? "pr-10" : "pr-3"} ${className}`}
            {...props}
          />
          {suffix && (
            <span className="absolute right-3 text-gray-500 text-sm select-none">{suffix}</span>
          )}
        </div>
        {error && <p className="text-xs text-red-600">{error}</p>}
      </div>
    );
  }
);

FormField.displayName = "FormField";
export default FormField;
