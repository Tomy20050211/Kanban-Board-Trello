export interface ControllerInputProps {
  value: string;
  label?: string;
  name: string;
  placeholder?: string;
  type?: "text" | "email" | "password" | "search" | "url" | "tel";
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  disabled?: boolean;
  error?: string;
  as?: "input" | "textarea";
  onChange: (nextValue: string) => void;
}
