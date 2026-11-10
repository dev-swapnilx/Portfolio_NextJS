import Link from "next/link";
import info from "@/data/about/info.json";
import resume from "@/data/about/resume.json";

export const metadata = { alternates: { canonical: "/" } };

const profilePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": "https://devxswapnil.in/#profilepage",
  url: "https://devxswapnil.in/",
  name: "Swapnil — AI Engineer",
  isPartOf: { "@id": "https://devxswapnil.in/#website" },
  mainEntity: { "@id": "https://devxswapnil.in/#person" },
  // Google's ProfilePage spec wants full ISO 8601 date-time with timezone
  dateCreated: "2026-10-01T09:00:00+05:30",
  dateModified: "2026-11-10T09:00:00+05:30",
};

// Bold the quantified wins so proof pops out of the gray (§9.3)
const METRIC = /(?<![A-Za-z\d])(\d[\d.,]*[\w%×+]*)/g;
function Metrics({ text }: { text: string }) {
  return (
    <>
      {text.split(METRIC).map((part, i) =>
        i % 2 === 1 ? (
          <strong
            key={i}
            className="font-semibold text-neutral-800 dark:text-neutral-200"
          >
            {part}
          </strong>
        ) : (
          part
        )
      )}
    </>
  );
}

const chipClass =
  "text-xs px-1.5 py-0.5 rounded border border-[#ecebeb] dark:border-[#333] text-neutral-600 dark:text-neutral-400 font-mono";

function SectionHeading({ children }: { children: string }) {
  return (
    <h2 className="text-sm font-medium mb-3">
      <span className="text-green-700 dark:text-green-400 font-mono"># </span>
      {children}
    </h2>
  );
}

const VISIBLE_CHIPS = 6;

export default function Page() {
  return (
    <div className="flex flex-col space-y-10 max-w-[68ch]">
      <h1 className="sr-only">Swapnil — AI Engineer in Gurugram, India</h1>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageJsonLd) }}
      />

      <header className="space-y-2">
        <p className="text-xl font-semibold leading-snug text-neutral-900 dark:text-neutral-100">
          AI Engineer shipping LLM products to production — RAG, agents &
          MLOps on AWS.
        </p>
        <p className="text-sm leading-[1.7] text-neutral-600 dark:text-neutral-400">
          <Metrics text="2.5+ yrs across fintech & media · double-digit cost savings · 10× faster workflows." />
        </p>
      </header>

      <section>
        <SectionHeading>Experience</SectionHeading>
        <ul className="space-y-4">
          {resume.experience.map((e, i) => (
            <li key={i} className="text-sm">
              <div className="flex justify-between gap-4">
                <span className="font-medium text-neutral-800 dark:text-neutral-200">
                  {e.role}
                  <span className="font-normal text-neutral-600 dark:text-neutral-400">
                    {" "}
                    @ {e.org}
                  </span>
                </span>
                <span className="text-neutral-600 dark:text-neutral-400 text-xs whitespace-nowrap pt-0.5">
                  {e.period}
                </span>
              </div>
              {e.impact && (
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400 leading-[1.7]">
                  <Metrics text={e.impact} />
                </p>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <SectionHeading>Skills</SectionHeading>
        <ul className="space-y-3">
          {resume.skills.map((s, i) => (
            <li key={i}>
              <p className="text-xs font-medium text-neutral-800 dark:text-neutral-200 mb-1.5">
                {s.group}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {s.items.slice(0, VISIBLE_CHIPS).map((item) => (
                  <span key={item} className={chipClass}>
                    {item}
                  </span>
                ))}
                {s.items.length > VISIBLE_CHIPS && (
                  <span className="text-xs text-neutral-600 dark:text-neutral-400 self-center">
                    +{s.items.length - VISIBLE_CHIPS} more
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <SectionHeading>Education</SectionHeading>
        <div className="flex justify-between gap-4 text-sm">
          <span className="text-neutral-800 dark:text-neutral-200">
            {resume.education[0].degree}
            <span className="text-neutral-600 dark:text-neutral-400">
              {" "}
              · {resume.education[0].org}
            </span>
          </span>
          <span className="text-neutral-600 dark:text-neutral-400 text-xs whitespace-nowrap pt-0.5">
            {resume.education[0].period}
          </span>
        </div>
      </section>

      <footer className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400">
        <p>
          <Link className="underline underline-offset-4" href="/projects">
            see projects →
          </Link>{" "}
          ·{" "}
          <a className="underline underline-offset-4" href={`mailto:${info.email}`}>
            {info.email}
          </a>{" "}
          · Last updated Nov 2026
        </p>
        <p className="font-mono">
          <span className="text-green-700 dark:text-green-400">▸</span>{" "}
          prefer a CLI? toggle the terminal — top-right
        </p>
      </footer>
    </div>
  );
}
