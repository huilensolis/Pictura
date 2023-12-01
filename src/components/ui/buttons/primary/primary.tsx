import { PrimaryButtonProps } from "./primary.model";

export function PrimaryButton({ children, ...props }: PrimaryButtonProps) {
  return (
    <button
      className="bg-neutral-800 text-neutral-50 rounded-xl p-2 w-full font-medium text-lg hover:bg-neutral-700 focus:bg-neutral-700"
      {...props}
    >
      {children}
    </button>
  );
}
