"use client";

import { ClientOnly } from "@/components/layout/ClientOnly";
import { useAppState } from "@/hooks/useAppState";
import { AppShell } from "@/components/layout/AppShell";
import { SetupScreen } from "@/components/layout/SetupScreen";
import { ProgressPage } from "@/components/progress/ProgressPage";

function ProgressContent() {
  const { state, isSetup, updatePlayer } = useAppState();

  if (!isSetup) {
    return <SetupScreen onComplete={updatePlayer} />;
  }

  return (
    <AppShell>
      <ProgressPage state={state} />
    </AppShell>
  );
}

export default function ProgressRoute() {
  return (
    <ClientOnly>
      <ProgressContent />
    </ClientOnly>
  );
}
