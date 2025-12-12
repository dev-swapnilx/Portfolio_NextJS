"use client";
import { useRouter, usePathname } from "next/navigation";
import { useState, useRef, useEffect, useContext, ReactNode } from "react";
import { useTheme } from "next-themes";
import { TerminalContext } from "../app/providers";

// Import JSON data
import aboutInfo from "@/data/about/info.json";
import portfolioProject from "@/data/projects/portfolio.json";
import omniboardProject from "@/data/projects/omniboard.json";
import safestepProject from "@/data/projects/safestep.json";
import agrisiteProject from "@/data/projects/agrisite.json";
import cognicodemlProject from "@/data/projects/cognicodeml.json";

// === Virtual File System (typed) ===
type FileContent =
  | {
      name: string;
      organization: string;
      designation: string;
      email: string;
      phone: string;
      summary: string;
    }
  | { name: string; url: string; description: string }
  | null;

const filesystem: Record<string, Record<string, FileContent>> = {
  "/": { "about/": null, "projects/": null },
  "/about": {
    "info.json": aboutInfo
  },
  "/projects": {
    "portfolio.json": portfolioProject,
    "omniboard.json": omniboardProject,
    "safestep.json": safestepProject,
    "agrisite.json": agrisiteProject,
    "cognicodeml.json": cognicodemlProject
  }
};

const commands = [
  "cd",
  "ls",
  "cat",
  "help",
  "welcome",
  "clear",
  "theme",
  "date",
  "contact",
  "leetcode",
] as const;

const routes = { about: "/about", projects: "/projects" } as const;
type RouteKey = keyof typeof routes;
const validRoutes: RouteKey[] = ["about", "projects"];

const helpCommand = [
  { command: "cd <page-name>", description: "eg: cd <projects | about>" },
  { command: "cd ..", description: "go back to previous page" },
  { command: "ls", description: "list directory contents" },
  { command: "cat <file>.json", description: "display file content" },
  { command: "welcome", description: "displays welcome message" },
  { command: "help", description: "list of commands" },
  { command: "clear", description: "clear the terminal" },
  { command: "theme <mode>", description: "eg: theme <dark | light>" },
  { command: "date", description: "Current date and time" },
  { command: "contact", description: "displays contact information" },
  { command: "leetcode", description: "displays leetcode profile" },
];

// Union type for history entries
type HistoryEntry = string | { __output: ReactNode };

export default function Terminal() {
  const [history, setHistory] = useState<HistoryEntry[]>(["welcome"]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [value, setValue] = useState("");
  const [tabHint, setTabHint] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { setTheme } = useTheme();
  const { isOpen, toggleIsOpen } = useContext(TerminalContext);

  const currentPath = pathname;
  console.log("Path changed:", { pathname, currentPath });

  const getFilesInCurrentDir = (): string[] => {
    console.log("Current path:", currentPath);

    // Handle root path
    if (currentPath === "/") {
      return ["about/", "projects/"];
    }

    // Handle about page
    if (currentPath.startsWith("/about")) {
      return ["..", "info.json"];
    }

    // Handle projects page
    if (currentPath === "/projects" || currentPath === "/projects/") {
      return [
        "..",
        "portfolio.json",
        "omniboard.json",
        "safestep.json",
        "agrisite.json",
        "cognicodeml.json",
      ];
    }

    // Default case
    return [];
  };

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history, tabHint]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const trimmed = value.trim();

    if (e.key === "Tab") {
      e.preventDefault();
      setTabHint("");

      if (trimmed.startsWith("cd ") || trimmed === "cd") {
        const arg = trimmed.slice(3).trim();
        
        // Handle ~/ completion
        if (arg === "~" || arg.startsWith("~/")) {
          const rest = arg.slice(1); // Remove ~
          const matches = validRoutes.filter(r => r.startsWith(rest.slice(1)));
          
          if (matches.length === 1) {
            setValue(`cd ~/${matches[0]}`);
          } else if (matches.length > 1) {
            setTabHint(matches.map(r => `~/${r}/`).join("    "));
          } else if (arg === "~") {
            setTabHint("~/about/    ~/projects/");
          }
          return;
        }
        
        // Handle normal directory completion at root
        if (currentPath === "/") {
          if (arg === "") {
            setTabHint("about/    projects/");
            return;
          }
          const matches = validRoutes.filter((r) => r.startsWith(arg));
          if (matches.length === 1) setValue(`cd ${matches[0]}`);
          else if (matches.length > 1)
            setTabHint(matches.map((r) => r + "/").join("    "));
        }
        return;
      }

      if (trimmed.startsWith("cat ") || trimmed === "cat") {
        const arg = trimmed.slice(4).trim();
        const files = getFilesInCurrentDir().filter((f) => f.endsWith(".json"));
        if (arg === "") {
          setTabHint(files.join("    "));
          return;
        }
        const matches = files.filter((f) => f.startsWith(arg));
        if (matches.length === 1) setValue(`cat ${matches[0]}`);
        else if (matches.length > 1) setTabHint(matches.join("    "));
      }
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const newIndex =
        historyIndex === -1
          ? commandHistory.length - 1
          : Math.max(0, historyIndex - 1);
      setHistoryIndex(newIndex);
      setValue(commandHistory[newIndex]);
      setTabHint("");
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      if (historyIndex >= commandHistory.length - 1) {
        setHistoryIndex(-1);
        setValue("");
      } else {
        setHistoryIndex(historyIndex + 1);
        setValue(commandHistory[historyIndex + 1]);
      }
      setTabHint("");
    }
  };

  // Helper function to resolve paths with ~
  const resolvePath = (path: string): string => {
    if (path.startsWith('~/')) {
      return path.replace('~', ''); // Remove ~ to make it an absolute path
    }
    return path;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;

    const [cmd, ...args] = trimmed.split(" ");
    const arg = args.join(" ");

    if (!commandHistory.includes(trimmed)) {
      setCommandHistory((prev) => [...prev, trimmed]);
    }
    setHistoryIndex(-1);

    let output: ReactNode = null;

    if (cmd === "cd") {
      const isAtRoot = currentPath === "/"
      if (arg === "..") {
        if (isAtRoot) {
          output = <p className="text-yellow-500">Already at root directory ~</p>;
        } else {
          router.back();
        }
      } 
      else if (arg === "~/") {
        router.push("/");
      }
      else if (arg.startsWith("~/")) {
        const targetPath = resolvePath(arg);
        if (["/about", "/projects"].includes(targetPath)) {
          router.push(targetPath);
        } else {
          output = <p className="text-red-500">bash: cd: {arg}: No such directory</p>;
        }
      } else if (currentPath !== "/" && arg) {
        output = (
          <p className="text-red-500">
            bash: cd: {arg}: no such file or directory
          </p>
        );
      } else if (arg && validRoutes.includes(arg as RouteKey)) {
        router.push(routes[arg as RouteKey]);
      } else if (arg) {
        output = (
          <p className="text-red-500">
            bash: cd: {arg}: No such file or directory
          </p>
        );
      }
    } else if (cmd === "ls") {
      const files = getFilesInCurrentDir();
      output = (
        <p className="text-cyan-500 dark:text-cyan-400 font-mono text-xs">
          {files.join("    ")}
        </p>
      );
    } else if (cmd === "cat" && arg) {
      const fileData = filesystem[currentPath]?.[arg];
      if (fileData) {
        output = (
          <pre className="text-green-600 dark:text-green-400 text-xs font-mono whitespace-pre-wrap">
            {JSON.stringify(fileData, null, 2)}
          </pre>
        );
      } else {
        output = <p className="text-red-500">cat: {arg}: No such file</p>;
      }
    } else if (cmd === "theme" && arg && ["dark", "light"].includes(arg)) {
      setTheme(arg);
      output = <p>Theme switched to {arg}</p>;
    } else if (
      commands.includes(cmd as any) &&
      !["cd", "ls", "cat"].includes(cmd)
    ) {
      // handled by CmdResult
    } else if (trimmed) {
      output = <p className="text-red-500">{trimmed}: command not found</p>;
    }

    setHistory((prev) => [...prev, trimmed]);
    if (output) {
      setHistory((prev) => [
        ...prev.slice(0, -1),
        trimmed,
        { __output: output },
      ]);
    }

    setValue("");
    setTabHint("");
  };

  const clearTerminal = () => {
    setHistory([]);
    setValue("");
    setTabHint("");
  };

  if (!isOpen) return null;

  return (
    <div
      className="relative h-60 mb-6 bg-gray-100 dark:bg-[#171717] rounded-md text-sm overflow-hidden flex flex-col"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="sticky top-0 left-0 right-0 h-6 bg-zinc-300 dark:bg-[#323232] flex pl-2 ">
        <div className="flex space-x-2 items-center my-auto">
          <div
            className="h-3 w-3 bg-red-500 rounded-full flex justify-center items-center cursor-pointer"
            onClick={toggleIsOpen}
          ></div>
          <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
          <div className="h-3 w-3 bg-green-600 rounded-full"></div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollcontainer">
        <div className="px-1 py-1">
          {history.map((entry, i) => {
            if (typeof entry === "object" && "__output" in entry) {
              return <div key={i}>{(entry as any).__output}</div>;
            }

            const data = entry as string;
            const cmd = data.trim().split(" ")[0];

            return (
              <div key={i}>
                <p>
                  <span className="text-yellow-500 dark:text-yellow-300">
                    →{" "}
                  </span>
                  <span className="text-pink-500 dark:text-pink-300">~ </span>
                  {data}
                </p>

                {cmd !== "cd" && commands.includes(cmd as any) && (
                  <CmdResult type={cmd} clear={clearTerminal} />
                )}
              </div>
            );
          })}

          <div className="flex">
            <p>
              <span className="text-yellow-500 dark:text-yellow-300">→ </span>
              <span className="text-pink-500 dark:text-pink-300">~ </span>
            </p>

            <form onSubmit={handleSubmit} className="flex-1 ml-2">
              <input
                type="text"
                className="w-full border-none outline-none bg-transparent"
                autoFocus
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                  setTabHint("");
                }}
                onKeyDown={handleKeyDown}
                ref={inputRef}
              />
            </form>
          </div>

          {tabHint && (
            <div className="pl-8 -mt-1">
              <p className="text-cyan-500 dark:text-cyan-400 text-xs font-mono">
                {tabHint}
              </p>
            </div>
          )}
        </div>
        <div ref={terminalEndRef} />
      </div>
    </div>
  );
}

function CmdResult({ type, clear }: { type: string; clear: () => void }) {
  if (type === "welcome")
    return <p>Hi guest, to see the list available commands, type `help`</p>;

  if (type === "help")
    return (
      <div>
        {helpCommand.map((info, i) => (
          <div key={i} className="grid grid-cols-2 gap-1">
            <p>{`'${info.command}'`}</p>
            <p>{`- ${info.description}`}</p>
          </div>
        ))}
      </div>
    );

  if (type === "clear") {
    clear();
    return null;
  }

  if (type === "date")
    return <p>{`Current Date and Time: ${new Date().toLocaleString()}`}</p>;

  if (type === "contact")
    return (
      <div className="flex flex-col space-y-2">
        <a
          className="underline underline-offset-4 text-blue-500 dark:text-blue-300"
          href="mailto:swapnildhamu76@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          swapnildhamu76@gmail.com
        </a>
        <a
          className="underline underline-offset-4 text-blue-500 dark:text-blue-300"
          href="tel:+916239320323"
          target="_blank"
          rel="noopener noreferrer"
        >
          +91 62393 20323
        </a>
      </div>
    );

  if (type === "leetcode")
    return (
      <p>
        You can check out my leetcode profile here:{" "}
        <a
          className="underline underline-offset-4 text-blue-500 dark:text-blue-300"
          href="https://leetcode.com/sswapnil_be20/"
          target="_blank"
          rel="noopener noreferrer"
        >
          leetcode.com/sswapnil_be20
        </a>
      </p>
    );

  return null;
}
