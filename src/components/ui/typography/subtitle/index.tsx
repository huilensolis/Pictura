export function Heading({ children, ...props }: { children: React.ReactNode }) {
  return (
    <sub className="text-neutral-900 dark:text-neutral-50" {...props}>
      {children}
    </sub>
  );
}
