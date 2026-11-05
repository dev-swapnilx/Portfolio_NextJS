import { getProjects, Project } from "@/utils/importProjects";

const description =
  "Projects by Swapnil — AI Engineer: production LLM systems, terminal-style portfolio, NPX dev card, and more.";

export const metadata = {
  title: "Projects",
  description,
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects — Swapnil",
    description,
    url: "/projects",
    type: "website",
    images: [
      { url: "/opengraph-image", width: 1200, height: 630, alt: "Swapnil — AI Engineer" },
    ],
  },
};

function Chips({ project }: { project: Project }) {
  if (!project.stack?.length) return null;
  return (
    <div className="flex flex-wrap gap-1.5 pt-1">
      {project.stack.map((tech) => (
        <span
          key={tech}
          className="text-[11px] px-1.5 py-0.5 rounded border border-[#ecebeb] dark:border-[#333] text-neutral-500"
        >
          {tech}
        </span>
      ))}
    </div>
  );
}

function CardBody({ project }: { project: Project }) {
  return (
    <>
      <div className="flex justify-between items-baseline gap-3">
        <h3 className="text-base font-medium">{project.name}</h3>
        {project.year && (
          <span className="text-xs text-neutral-500 whitespace-nowrap">
            {project.year}
          </span>
        )}
      </div>
      {project.org && (
        <p className="text-xs text-green-600 dark:text-green-400">
          @ {project.org}
        </p>
      )}
      <p className="text-sm text-neutral-500 flex-1">{project.description}</p>
      <Chips project={project} />
    </>
  );
}

const cardClass =
  "bg-transparent border border-[#ecebeb] hover:border-[#999] dark:border-[#333] hover:dark:bg-[#ffffff05] transition-colors p-4 flex flex-col space-y-2 !no-underline rounded-md h-full";

export default async function Page() {
  const projects = await getProjects();
  const work = projects.filter((p) => p.kind === "work");
  const personal = projects.filter((p) => p.kind !== "work");

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://devxswapnil.in/projects#page",
    url: "https://devxswapnil.in/projects",
    name: "Projects — Swapnil",
    isPartOf: { "@id": "https://devxswapnil.in/#website" },
    about: { "@id": "https://devxswapnil.in/#person" },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: [...work, ...personal].map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": p.url ? "SoftwareSourceCode" : "CreativeWork",
          name: p.name,
          description: p.description,
          ...(p.url ? { codeRepository: p.url.replace(/\.git$/, "") } : {}),
          author: { "@id": "https://devxswapnil.in/#person" },
        },
      })),
    },
  };

  return (
    <div className="flex flex-col space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />

      <section>
        <h2 className="text-sm font-medium mb-3">
          <span className="text-green-600 dark:text-green-400"># </span>
          Production work
        </h2>
        <div className="grid grid-cols-1 gap-4">
          {work.map((p) => (
            <div key={p.id} className={cardClass}>
              <CardBody project={p} />
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-sm font-medium mb-3">
          <span className="text-green-600 dark:text-green-400"># </span>
          Earlier projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {personal.map((p) => (
            <a
              key={p.id}
              className={cardClass}
              rel="noopener noreferrer"
              target="_blank"
              href={p.url}
            >
              <CardBody project={p} />
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
