import { BaseButton } from "../base-button";
import { IButtonProps } from "../button.models";

export function PlainButton({
  children,
  isLoading,
  isDisabled = false,
  ...props
}: IButtonProps) {
  return (
    <BaseButton isLoading={isLoading} isDisabled={isDisabled} {...props}>
      {children}
    </BaseButton>
  );
}
