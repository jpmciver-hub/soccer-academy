"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
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
} from "lucide-react";

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
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();

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
          "fixed top-0 left-0 z-50 h-full w-64 bg-zinc-950 border-r border-zinc-800 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:z-auto",
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

        <nav className="p-3 space-y-1">
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

        <div className="absolute bottom-4 left-3 right-3">
          <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800">
            <p className="text-xs text-zinc-500 font-medium">90 DAY PROGRAM</p>
            <p className="text-xs text-zinc-400 mt-1">Pre-Academy Development</p>
          </div>
        </div>
      </aside>
    </>
  );
}
