import { PrimaryButtonProps } from "./primary.model";

export function PrimaryButton({ children, ...props }: PrimaryButtonProps) {
  return (
    <button
      className="bg-neutral-700 dark:bg-neutral-800 text-neutral-50 rounded-lg dark:border dark:border-neutral-600 p-2 w-full font-medium text-lg hover:bg-neutral-600 dark:hover:bg-neutral-700 focus:bg-neutral-700 disabled:bg-neutral-600 dark:disabled:bg-neutral-700 disabled:text-neutral-200 dark:disabled:text-neutral-400 disabled:cursor-not-allowed transition-all delay-75"
      {...props}
    >
      {children}
    </button>
  );
}
