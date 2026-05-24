"use client";

import { ClientOnly } from "@/components/layout/ClientOnly";
import { useAppState } from "@/hooks/useAppState";
import { AppShell } from "@/components/layout/AppShell";
import { SetupScreen } from "@/components/layout/SetupScreen";
import { DrillLibraryPage } from "@/components/drills/DrillLibraryPage";

function DrillsContent() {
  const { isSetup, updatePlayer } = useAppState();

  if (!isSetup) {
    return <SetupScreen onComplete={updatePlayer} />;
  }

  return (
    <AppShell>
      <DrillLibraryPage />
    </AppShell>
  );
}

export default function DrillsRoute() {
  return (
    <ClientOnly>
      <DrillsContent />
    </ClientOnly>
  );
}
