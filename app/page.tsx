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
  dateModified: "2026-11-05",
};

export default function Page() {
  return (
    <div className="flex flex-col space-y-8">
      <h1 className="sr-only">Swapnil — AI Engineer in Gurugram, India</h1>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageJsonLd) }}
      />

      <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
        {info.summary}
      </p>

      <section>
        <h2 className="text-sm font-medium mb-3"><span className="text-green-700 dark:text-green-400"># </span>Experience</h2>
        <ul className="space-y-3">
          {resume.experience.map((e, i) => (
            <li key={i} className="text-sm">
              <div className="flex justify-between gap-4">
                <span>
                  <span className="text-neutral-800 dark:text-neutral-200">
                    {e.role}
                  </span>
                  <span className="text-neutral-600 dark:text-neutral-400"> @ {e.org}</span>
                </span>
                <span className="text-neutral-600 dark:text-neutral-400 text-xs whitespace-nowrap pt-0.5">
                  {e.period}
                </span>
              </div>
              {e.impact && (
                <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {e.impact}
                </p>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-sm font-medium mb-3"><span className="text-green-700 dark:text-green-400"># </span>Education</h2>
        {resume.education.map((e, i) => (
          <div key={i} className="flex justify-between gap-4 text-sm">
            <span>
              <span className="text-neutral-800 dark:text-neutral-200">
                {e.degree}
              </span>
              <span className="text-neutral-600 dark:text-neutral-400"> · {e.org}</span>
            </span>
            <span className="text-neutral-600 dark:text-neutral-400 text-xs whitespace-nowrap pt-0.5">
              {e.period}
            </span>
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-sm font-medium mb-3"><span className="text-green-700 dark:text-green-400"># </span>Skills</h2>
        <ul className="space-y-1.5">
          {resume.skills.map((s, i) => (
            <li key={i} className="text-xs leading-relaxed">
              <span className="text-neutral-800 dark:text-neutral-200">
                {s.group}:{" "}
              </span>
              <span className="text-neutral-600 dark:text-neutral-400">{s.items}</span>
            </li>
          ))}
        </ul>
      </section>

      <p className="text-xs text-neutral-600 dark:text-neutral-400">
        Try <code className="text-pink-600 dark:text-pink-300">skills</code>,{" "}
        <code className="text-pink-600 dark:text-pink-300">experience</code>, or{" "}
        <code className="text-pink-600 dark:text-pink-300">help</code> in the
        terminal below.
      </p>

      <p className="text-xs text-neutral-600 dark:text-neutral-400">
        <a
          className="underline underline-offset-4"
          href={`mailto:${info.email}`}
        >
          {info.email}
        </a>{" "}
        · Last updated Nov 2026
      </p>
    </div>
  );
}
