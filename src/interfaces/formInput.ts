export interface FormInputProps {
    id: string;
    label: string;
    type: string;
    value: string;
    name: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    error?: string;
  }