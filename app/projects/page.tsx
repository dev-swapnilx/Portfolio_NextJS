export default function Page() {
  const pinnedRepositories = [
    {
      id: "1",
      name: "Personal Portfolio",
      url: "https://github.com/dev-swapnilx/Portfolio_NextJS.git",
      description: "Personal Portfolio Made using NextJS",
    },
    {
      id: "2",
      name: "OmniBoard: A Multi-Gaming board for Specially Abled",
      url: "https://github.com/dev-swapnilx/smart-board.git",
      description:
        "Smart, motorized board games with real-time web interface for immersive play",
    },
    {
      id: "3",
      name: "SafeStep: Early Fall Prediction for Senior Citizens with IOT",
      url: "https://github.com/dev-swapnilx/SafeStep.git",
      description:
        "IoT device with ML for fall prediction, triggering alarms and inflating jackets for elder safety",
    },
    {
      id: "4",
      name: "Argri-Site: Weed detection and removal drone",
      url: "https://github.com/dev-swapnilx/Argri-Site.git",
      description:
        "Autonomous drone for weed detection using Raspberry Pi and ML, aiding precision herbicide application",
    },
    {
      id: "5",
      name: "CogniCodeML: v1.0 - C++ Consciousness Unleashed",
      url: "https://github.com/dev-swapnilx/Machine_Learning",
      description:
        "A C++ repository housing kNN, K-Means, and Neural Network implementations on MNIST Handwriting and Iris Datasets, optimized for efficiency and clarity.",
    },
    
  ];

  return (
    <ul className="space-y-4">
      {pinnedRepositories.map((repo) => (
        <li key={repo.id}>
          <a
            className="bg-transparent border border-[#ecebeb] hover:border-[#999] dark:border-[#333] hover:dark:bg-[#ffffff05]
              transition-colors
              p-2 flex flex-col space-y-1.5 !no-underline rounded-md"
            rel="noopener noreferrer"
            target="_blank"
            href={repo.url}
          >
            <div>
              <span className="text-sm underline underline-offset-4 ">
                {repo.name}
              </span>
            </div>
            <span className="text-sm text-neutral-500">{repo.description}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
