import { BaseButton } from "../base-button";
import { IButtonProps } from "../button.models";

export function PrimaryButton({
  children,
  isLoading,
  isDisabled = false,
  ...props
}: IButtonProps) {
  return (
    <BaseButton
      isLoading={isLoading}
      isDisabled={isDisabled}
      {...props}
      className="bg-neutral-700 text-neutral-50 dark:bg-neutral-50 dark:text-neutral-700 dark:border dark:border-neutral-50 hover:brightness-125 dark:hover:brightness-90 disabled:bg-neutral-600 disabled:hover:cursor-not-allowed disabled:hover:brightness-100"
    >
      {children}
    </BaseButton>
  );
}
