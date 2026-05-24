"use client";

import { ClientOnly } from "@/components/layout/ClientOnly";
import { useAppState } from "@/hooks/useAppState";
import { AppShell } from "@/components/layout/AppShell";
import { SetupScreen } from "@/components/layout/SetupScreen";
import { SoccerIQPage } from "@/components/soccer-iq/SoccerIQPage";

function SoccerIQContent() {
  const { isSetup, updatePlayer } = useAppState();

  if (!isSetup) {
    return <SetupScreen onComplete={updatePlayer} />;
  }

  return (
    <AppShell>
      <SoccerIQPage />
    </AppShell>
  );
}

export default function SoccerIQRoute() {
  return (
    <ClientOnly>
      <SoccerIQContent />
    </ClientOnly>
  );
}
