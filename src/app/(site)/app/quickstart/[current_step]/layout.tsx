import { ReactNode } from "react";

export default function QuickStartLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-2 max-w-xl">
      {children}
    </div>
  );
}
