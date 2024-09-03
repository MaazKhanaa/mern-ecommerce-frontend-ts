// Define the structure of the validation schema
export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  errorMessage: string;
}

export interface ValidationSchema {
  [key: string]: ValidationRule;
}

// Function to validate a single field
export const validateField = (
  fieldName: string,
  value: string,
  rules: ValidationRule
): string | undefined => {
  if (rules.required && !value) {
    return rules.errorMessage;
  }
  if (rules.minLength && value.length < rules.minLength) {
    return rules.errorMessage;
  }
  if (rules.maxLength && value.length > rules.maxLength) {
    return rules.errorMessage;
  }
  if (rules.pattern && !rules.pattern.test(value)) {
    return rules.errorMessage;
  }
  return undefined;
};
