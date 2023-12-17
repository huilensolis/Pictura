import { IArticleProps } from "./article.models";

export function Article({ children, title, subtitle }: IArticleProps) {
  return (
    <article className="flex flex-col p-5 bg-neutral-100 h-full w-full rounded-md border border-neutral-200 dark:border-neutral-700 dark:bg-cm-lighter-gray">
      <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-50">
        {title}
      </h2>
      <p className="text-neutral-600 dark:text-neutral-400 mb-12">{subtitle}</p>
      {children}
    </article>
  );
}
