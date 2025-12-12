import { getProjects } from '@/utils/importProjects';

export default async function Page() {
  const pinnedRepositories = await getProjects();
  

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
