export function Paragraph({
  children,
  ...props
}: {
  children: React.ReactNode;
}) {
  return (
    <p className="text-neutral-700 dark:text-neutral-400" {...props}>
      {children}
    </p>
  );
}
