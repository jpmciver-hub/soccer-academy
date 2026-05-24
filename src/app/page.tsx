"use client";

import { ClientOnly } from "@/components/layout/ClientOnly";
import { useAppState } from "@/hooks/useAppState";
import { AppShell } from "@/components/layout/AppShell";
import { SetupScreen } from "@/components/layout/SetupScreen";
import { DashboardPage } from "@/components/dashboard/DashboardPage";

function HomeContent() {
  const { state, isSetup, updatePlayer } = useAppState();

  if (!isSetup) {
    return <SetupScreen onComplete={updatePlayer} />;
  }

  return (
    <AppShell>
      <DashboardPage state={state} />
    </AppShell>
  );
}

export default function Home() {
  return (
    <ClientOnly>
      <HomeContent />
    </ClientOnly>
  );
}
