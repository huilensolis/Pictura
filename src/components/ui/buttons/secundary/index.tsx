import { BaseButton } from "../base-button";
import { IButtonProps } from "../button.models";

export function PlainButton({
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
      className="bg-neutral-300 hover:brightness-90 dark:text-neutral-50 dark:bg-neutral-800 dark:border dark:border-neutral-600 dark:hover:brightness-110 disabled:brightness-90"
    >
      {children}
    </BaseButton>
  );
}
