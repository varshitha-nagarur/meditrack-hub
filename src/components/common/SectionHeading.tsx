import type { ReactNode } from "react";

interface SectionHeadingProps {
  title: string;
  description?: string | undefined;
  action?: ReactNode;
}

export function SectionHeading({ title, description, action }: SectionHeadingProps) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h2 className="text-xl font-semibold text-foreground sm:text-2xl">{title}</h2>
        {description ? (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {action}
    </div>
  );
}
