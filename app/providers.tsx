"use client";

import { ThemeProvider } from "next-themes";
import { createContext, useSyncExternalStore } from "react";

export const TerminalContext = createContext({
  isOpen: false,
  toggleIsOpen: () => {},
});

// Tiny external store: closed by default, last choice persisted in
// localStorage (best-effort — private mode still toggles, just won't persist).
let terminalOpen: boolean | null = null; // null = not read yet
const listeners = new Set<() => void>();

function getSnapshot(): boolean {
  if (terminalOpen === null) {
    try {
      terminalOpen = localStorage.getItem("terminal-open") === "true";
    } catch {
      terminalOpen = false;
    }
  }
  return terminalOpen;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function toggleIsOpen() {
  terminalOpen = !getSnapshot();
  try {
    localStorage.setItem("terminal-open", String(terminalOpen));
  } catch {
    // non-fatal
  }
  listeners.forEach((l) => l());
}

export default function Providers({
  children,
  nonce,
}: {
  children: React.ReactNode;
  nonce?: string;
}) {
  // Server always renders closed; client restores the stored choice on hydrate
  const isOpen = useSyncExternalStore(subscribe, getSnapshot, () => false);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      nonce={nonce}
    >
      <TerminalContext.Provider value={{ isOpen, toggleIsOpen }}>
        {children}
      </TerminalContext.Provider>
    </ThemeProvider>
  );
}
