/**
 * Form validation utility for validating form inputs
 */

type ValidationFunction = (value: any) => boolean | string;

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  validate?: ValidationFunction;
  errorMessage?: string;
}

export interface FieldValidation {
  [field: string]: ValidationRule;
}

export interface ValidationErrors {
  [field: string]: string;
}

/**
 * Validates form data against a set of validation rules
 * @param data The form data to validate
 * @param validationRules The validation rules to check against
 * @returns Object with validation errors (if any)
 */
export function validateForm(data: Record<string, any>, validationRules: FieldValidation): ValidationErrors {
  const errors: ValidationErrors = {};

  Object.entries(validationRules).forEach(([field, rules]) => {
    const value = data[field];

    // Required check
    if (rules.required && (value === undefined || value === null || value === '')) {
      errors[field] = rules.errorMessage || `${field} is required`;
      return;
    }

    // If not required and empty, skip other validations
    if (!rules.required && (value === undefined || value === null || value === '')) {
      return;
    }

    // Min length check
    if (rules.minLength !== undefined && typeof value === 'string' && value.length < rules.minLength) {
      errors[field] = rules.errorMessage || `${field} must be at least ${rules.minLength} characters`;
      return;
    }

    // Max length check
    if (rules.maxLength !== undefined && typeof value === 'string' && value.length > rules.maxLength) {
      errors[field] = rules.errorMessage || `${field} must not exceed ${rules.maxLength} characters`;
      return;
    }

    // Pattern check
    if (rules.pattern && typeof value === 'string' && !rules.pattern.test(value)) {
      errors[field] = rules.errorMessage || `${field} has an invalid format`;
      return;
    }

    // Custom validation
    if (rules.validate) {
      const result = rules.validate(value);
      if (typeof result === 'string') {
        errors[field] = result;
      } else if (result === false) {
        errors[field] = rules.errorMessage || `${field} is invalid`;
      }
    }
  });

  return errors;
}

/**
 * Checks if there are any validation errors in the provided object
 * @param errors The validation errors object
 * @returns True if there are no errors, false otherwise
 */
export function isValid(errors: ValidationErrors): boolean {
  return Object.keys(errors).length === 0;
}

/**
 * Common validation rules
 */
export const commonValidations = {
  email: {
    required: true,
    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    errorMessage: 'Please enter a valid email address'
  },
  password: {
    required: true,
    minLength: 8,
    validate: (value: string) => {
      if (!/[A-Z]/.test(value)) {
        return 'Password must contain at least one uppercase letter';
      }
      if (!/[a-z]/.test(value)) {
        return 'Password must contain at least one lowercase letter';
      }
      if (!/[0-9]/.test(value)) {
        return 'Password must contain at least one number';
      }
      return true;
    },
    errorMessage: 'Password must be at least 8 characters'
  },
  date: {
    required: true,
    validate: (value: string) => {
      const date = new Date(value);
      return !isNaN(date.getTime()) || 'Please enter a valid date';
    }
  },
  serialNumber: {
    required: true,
    validate: (value: string) => value.trim() !== '' || 'Serial number is required'
  }
}; 