import info from "@/data/about/info.json";

export default function Page() {
  return (
    <div className="flex flex-col space-y-6">
      <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
        {info.summary}
      </p>

      <p className="text-xs text-neutral-500">
        Try <code className="text-pink-500 dark:text-pink-300">skills</code>,{" "}
        <code className="text-pink-500 dark:text-pink-300">experience</code>, or{" "}
        <code className="text-pink-500 dark:text-pink-300">help</code> in the
        terminal below.
      </p>
    </div>
  );
}
