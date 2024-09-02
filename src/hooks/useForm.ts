import { useState, ChangeEvent } from 'react';
import { validateField, ValidationRule } from '../utils/validation'; // Import ValidationRule

interface UseFormProps<T> {
  initialValues: T;
  validationSchema?: { [K in keyof T]?: ValidationRule };  // Update this type to map to ValidationRule
}

export function useForm<T>({ initialValues, validationSchema }: UseFormProps<T>) {
  const [formData, setFormData] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (validationSchema && validationSchema[name as keyof T]) {
      const validationRule = validationSchema[name as keyof T] as ValidationRule;  // Cast to ValidationRule
      const error = validateField(name, value, validationRule);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: error || undefined,
      }));
    }
  };

  const validateAllFields = () => {
    if (!validationSchema) return true;

    const newErrors: Partial<Record<keyof T, string>> = {};
    let isValid = true;

    for (const key in validationSchema) {
      if (Object.prototype.hasOwnProperty.call(validationSchema, key)) {
        const value = (formData as any)[key];
        const validationRule = validationSchema[key as keyof T] as ValidationRule;  // Cast to ValidationRule
        const error = validateField(key, value, validationRule);
        if (error) {
          newErrors[key as keyof T] = error;
          isValid = false;
        }
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  return { formData, errors, handleChange, setFormData, validateAllFields };
}