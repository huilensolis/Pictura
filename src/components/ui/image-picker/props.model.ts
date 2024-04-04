import React from "react";
import {
  type UseFormRegister,
  type RegisterOptions,
  type FieldError,
} from "react-hook-form";

export interface ImagePickerProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  placeholderImageUrl?: string | null;
  imagePlaceHolderClasses?: string;
  id: string;
  defaultValue?: string | number;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  error: FieldError | undefined;
  validationScheme: RegisterOptions;
  register: UseFormRegister<any>;
  showErrorMessages?: boolean;
}
