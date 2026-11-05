import { getProjects } from '@/utils/importProjects';

const description =
  "Projects by Swapnil — AI Engineer: terminal-style portfolio, NPX dev card, and more.";

export const metadata = {
  title: "Projects",
  description,
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects — Swapnil",
    description,
    url: "/projects",
    type: "website",
  },
};

export default async function Page() {
  const pinnedRepositories = await getProjects();

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
      itemListElement: pinnedRepositories?.map((repo, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "SoftwareSourceCode",
          name: repo.name,
          description: repo.description,
          codeRepository: repo.url.replace(/\.git$/, ""),
          author: { "@id": "https://devxswapnil.in/#person" },
        },
      })),
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      {pinnedRepositories?.map((repo) => (
        <a
          key={repo.id}
          className="bg-transparent border border-[#ecebeb] hover:border-[#999] dark:border-[#333] hover:dark:bg-[#ffffff05]
            transition-colors p-4 flex flex-col space-y-2 !no-underline rounded-md h-full"
          rel="noopener noreferrer"
          target="_blank"
          href={repo.url}
        >
          <div className="flex-1">
            <h3 className="text-base font-medium underline underline-offset-4">
              {repo.name}
            </h3>
            <p className="mt-2 text-sm text-neutral-500">{repo.description}</p>
          </div>
        </a>
      ))}
    </div>
  );
}
