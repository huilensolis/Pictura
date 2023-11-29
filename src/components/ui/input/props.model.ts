import { HTMLInputTypeAttribute } from "react";

export interface InputProps {
  label: string;
  type: HTMLInputTypeAttribute;
  placeholder?: string;
  id: string;
  value?: string | number;
  error?: string | null;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
}
