export default function LoadingAuth() {
  return (
    <section className="flex flex-col gap-6 w-[530px] animate-pulse delay-75">
      <article className="flex flex-col gap-2">
        <div className="mb-2 w-10 h-10 rounded-2xl bg-neutral-400 dark:bg-neutral-500" />
        <h1 className="h-10 w-40 bg-neutral-400 rounded-xl dark:bg-neutral-500" />
        <div className="h-5 bg-neutral-400 w-full rounded-xl dark:bg-neutral-500" />
      </article>
      <div className="flex flex-col gap-2 w-full">
        <div className="h-5 w-24 rounded-xl bg-neutral-400 dark:bg-neutral-500" />
        <div className="h-11 w-full bg-neutral-400 rounded-xl dark:bg-neutral-500" />
        <div className="h-11 w-full rounded-xl bg-neutral-400 dark:bg-neutral-500" />
      </div>
    </section>
  );
}
