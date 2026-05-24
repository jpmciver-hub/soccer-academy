"use client";

import { useAppState } from "@/hooks/useAppState";
import { AppShell } from "@/components/layout/AppShell";
import { SetupScreen } from "@/components/layout/SetupScreen";
import { CoachViewPage } from "@/components/progress/CoachViewPage";

export default function CoachRoute() {
  const { state, isLoaded, isSetup, updatePlayer, addCoachNote } = useAppState();

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="animate-pulse text-zinc-500">Loading...</div>
      </div>
    );
  }

  if (!isSetup) {
    return <SetupScreen onComplete={updatePlayer} />;
  }

  return (
    <AppShell>
      <CoachViewPage state={state} onAddNote={addCoachNote} />
    </AppShell>
  );
}
