"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { ProfileEntry } from "@/hooks/useProfiles";
import { Menu } from "lucide-react";

interface AppShellProps {
  children: React.ReactNode;
  profiles?: ProfileEntry[];
  activeProfile?: ProfileEntry;
  onSwitchProfile?: (id: string) => void;
  onNewProfile?: () => void;
}

export function AppShell({
  children,
  profiles,
  activeProfile,
  onSwitchProfile,
  onNewProfile,
}: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-zinc-950 text-white overflow-hidden">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        profiles={profiles}
        activeProfile={activeProfile}
        onSwitchProfile={onSwitchProfile}
        onNewProfile={onNewProfile}
      />
      <main className="flex-1 overflow-y-auto">
        <div className="sticky top-0 z-30 lg:hidden bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 px-4 py-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
        <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
