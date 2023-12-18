import { IHeadingProps } from "./heading.models";

const FONTSIZES: string[] = [
  "0.75rem", // text-xs
  "0.875rem", // text-sm
  "1rem", // text-base
  "1.125rem", // text-lg
  "1.25rem", // text-xl
  "1.5rem", // text-2xl
  "1.875rem", // text-3xl
  "2.25rem", // text-4xl
  "3rem", // text-5xl
  "3.75rem", // text-6xl
  "4.5rem", // text-7xl
  "6rem", // text-8xl
  "8rem", // text-9xl
].reverse();

export function Heading({
  children,
  level,
  extraClasses,
  ...props
}: IHeadingProps) {
  const headingNumber = level > 6 ? 6 : level;
  const HeadingTag = `h${headingNumber}` as keyof JSX.IntrinsicElements;
  const fontSize = FONTSIZES[level - 1];

  return (
    <HeadingTag
      className={`w-full text-neutral-900 dark:text-neutral-50 font-medium leading-none ${extraClasses}`}
      style={{ fontSize: fontSize }}
      {...props}
    >
      {children}
    </HeadingTag>
  );
}
