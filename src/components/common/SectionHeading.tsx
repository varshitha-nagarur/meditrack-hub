import type { ReactNode } from "react";

interface SectionHeadingProps {
  title: string;
  description?: string | undefined;
  action?: ReactNode;
  /** Use "h1" for the primary heading of a page, "h2" for sections. */
  as?: "h1" | "h2";
}

export function SectionHeading({ title, description, action, as = "h2" }: SectionHeadingProps) {
  const Heading = as;
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div>
        <Heading className="text-xl font-semibold text-foreground sm:text-2xl">{title}</Heading>
        {description ? (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {action}
    </div>
  );
}
