"use client";

import { ClientOnly } from "@/components/layout/ClientOnly";
import { useAppState } from "@/hooks/useAppState";
import { AppShell } from "@/components/layout/AppShell";
import { SetupScreen } from "@/components/layout/SetupScreen";
import { CoachViewPage } from "@/components/progress/CoachViewPage";

function CoachContent() {
  const { state, isSetup, updatePlayer, addCoachNote } = useAppState();

  if (!isSetup) {
    return <SetupScreen onComplete={updatePlayer} />;
  }

  return (
    <AppShell>
      <CoachViewPage state={state} onAddNote={addCoachNote} />
    </AppShell>
  );
}

export default function CoachRoute() {
  return (
    <ClientOnly>
      <CoachContent />
    </ClientOnly>
  );
}
