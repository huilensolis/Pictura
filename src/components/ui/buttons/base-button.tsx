import { cn } from "@/utils/cn";
import { LoadingSpinner } from "../spinner";
import { IButtonProps } from "./button.models";

export function BaseButton({
  children,
  isLoading,
  isDisabled = false,
  className = "",
  ...props
}: IButtonProps) {
  return (
    <button
      {...props}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      className={cn(
        `flex items-center justify-center px-4 py-2 font-medium rounded gap-2 transition-all delay-75 w-full`,
        className,
      )}
    >
      {isLoading && <LoadingSpinner size={25} />}
      {!isLoading && children}
    </button>
  );
}
