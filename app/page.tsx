import info from "@/data/about/info.json";

const highlights = [
  "Built ML-Central, a Dockerized single source of truth for feature & model code — cut infra costs 40% across 15+ models.",
  "Shipped an NLP-driven global search service handling 50K+ daily requests, trimming query latency from 10s to 2s.",
  "Developed a multi-agent sourcing service (LangGraph + Crawl4AI) automating newsletters & RSS across 400K+ companies.",
  "Established real-time MLOps observability on Amazon ECS, reducing undetected failures by 85%.",
];

export default function Page() {
  return (
    <div className="flex flex-col space-y-6">
      <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
        {info.summary}
      </p>

      <div>
        <p className="text-sm text-neutral-500">
          Currently{" "}
          <span className="text-neutral-800 dark:text-neutral-200">
            {info.designation}
          </span>{" "}
          @ {info.organization.split(" (")[0]} · {info.location}
        </p>
      </div>

      <div>
        <h2 className="text-sm font-medium mb-2">Selected work</h2>
        <ul className="space-y-1.5">
          {highlights.map((h, i) => (
            <li
              key={i}
              className="text-sm text-neutral-600 dark:text-neutral-400 flex gap-2"
            >
              <span className="text-green-600 dark:text-green-400 select-none">
                ▸
              </span>
              <span>{h}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="text-xs text-neutral-500">
        Tip: open the terminal below (
        <span className="text-green-600 dark:text-green-400">▸</span> icon,
        top-right) and try{" "}
        <code className="text-pink-500 dark:text-pink-300">skills</code>,{" "}
        <code className="text-pink-500 dark:text-pink-300">experience</code>, or{" "}
        <code className="text-pink-500 dark:text-pink-300">help</code>.
      </p>
    </div>
  );
}
