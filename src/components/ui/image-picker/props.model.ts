import React, { HTMLInputTypeAttribute } from "react";
import {
  type UseFormRegister,
  type RegisterOptions,
  type FieldError,
} from "react-hook-form";

export interface ImagePickerProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  placeholderImageUrl?: string;
  imagePlaceHolderClasses?: string;
  id: string;
  defaultValue?: string | number;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  error: FieldError | null;
  validationScheme: RegisterOptions;
  register: UseFormRegister<any>;
}
