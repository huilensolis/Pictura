import { AlertItemProps } from "../alert.models";

export function WarningAlert({ title, description, children }: AlertItemProps) {
  return (
    <div className="px-4 rounded-md bg-amber-50 dark:bg-amber-500/[0.1] md:max-w-2xl md:mx-auto md:px-8 w-full">
      <div className="py-3">
        <div className="flex">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 rounded-full text-amber-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="self-center ml-3">
            <span className="text-amber-600 dark:text-amber-500 font-semibold">
              {title}
            </span>
            <p className="text-amber-600 dark:text-amber-500 mt-1">
              {description}
            </p>
            {children && children}
          </div>
        </div>
      </div>
    </div>
  );
}
