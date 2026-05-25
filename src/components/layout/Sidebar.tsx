"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ProfileEntry } from "@/hooks/useProfiles";
import {
  Home,
  Calendar,
  Library,
  BarChart3,
  Target,
  Brain,
  Printer,
  ClipboardList,
  X,
  UserPlus,
  ChevronDown,
  Check,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Dashboard", icon: Home },
  { href: "/training", label: "Today's Training", icon: Calendar },
  { href: "/touch-counter", label: "Touch Counter", icon: Target },
  { href: "/drills", label: "Drill Library", icon: Library },
  { href: "/progress", label: "Progress", icon: BarChart3 },
  { href: "/soccer-iq", label: "Soccer IQ", icon: Brain },
  { href: "/weekly-plan", label: "Weekly Plan", icon: Printer },
  { href: "/coach", label: "Coach View", icon: ClipboardList },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  profiles?: ProfileEntry[];
  activeProfile?: ProfileEntry;
  onSwitchProfile?: (id: string) => void;
  onNewProfile?: () => void;
}

export function Sidebar({
  open,
  onClose,
  profiles = [],
  activeProfile,
  onSwitchProfile,
  onNewProfile,
}: SidebarProps) {
  const pathname = usePathname();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 bg-zinc-950 border-r border-zinc-800 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:z-auto flex flex-col",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚽</span>
            <div>
              <h1 className="text-sm font-bold text-white tracking-tight">SOCCER</h1>
              <h1 className="text-sm font-bold text-emerald-400 tracking-tight -mt-1">ACADEMY</h1>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Profile Switcher */}
        {activeProfile && profiles.length > 0 && (
          <div className="px-3 pt-3 relative">
            <button
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors"
            >
              <span className="text-lg">{activeProfile.avatarEmoji}</span>
              <span className="text-sm font-medium text-white flex-1 text-left truncate">
                {activeProfile.name}
              </span>
              <ChevronDown className={cn(
                "h-3.5 w-3.5 text-zinc-500 transition-transform",
                profileMenuOpen && "rotate-180"
              )} />
            </button>

            {profileMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setProfileMenuOpen(false)}
                />
                <div className="absolute left-3 right-3 top-full mt-1 z-50 bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl overflow-hidden">
                  {profiles.map((profile) => (
                    <button
                      key={profile.id}
                      onClick={() => {
                        onSwitchProfile?.(profile.id);
                        setProfileMenuOpen(false);
                        window.location.reload();
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-zinc-800 transition-colors"
                    >
                      <span className="text-lg">{profile.avatarEmoji}</span>
                      <span className="text-sm text-white flex-1 text-left truncate">
                        {profile.name}
                      </span>
                      {profile.id === activeProfile.id && (
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                      )}
                    </button>
                  ))}
                  <div className="border-t border-zinc-800">
                    <button
                      onClick={() => {
                        setProfileMenuOpen(false);
                        onNewProfile?.();
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-zinc-800 transition-colors text-emerald-400"
                    >
                      <UserPlus className="h-4 w-4" />
                      <span className="text-sm font-medium">Add Player</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        <nav className="p-3 space-y-1 flex-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-emerald-500/15 text-emerald-400"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                )}
              >
                <Icon className="h-4.5 w-4.5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3">
          <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800">
            <p className="text-xs text-zinc-500 font-medium">90 DAY PROGRAM</p>
            <p className="text-xs text-zinc-400 mt-1">Pre-Academy Development</p>
          </div>
        </div>
      </aside>
    </>
  );
}
