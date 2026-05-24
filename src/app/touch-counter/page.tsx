"use client";

import { ClientOnly } from "@/components/layout/ClientOnly";
import { useAppState } from "@/hooks/useAppState";
import { AppShell } from "@/components/layout/AppShell";
import { SetupScreen } from "@/components/layout/SetupScreen";
import { TouchCounterPage } from "@/components/touch-counter/TouchCounterPage";
import { TouchCategory } from "@/types";

function TouchCounterContent() {
  const { state, isSetup, updatePlayer, addTouchLog } = useAppState();

  if (!isSetup) {
    return <SetupScreen onComplete={updatePlayer} />;
  }

  const handleSaveTouches = (touches: Record<TouchCategory, number>) => {
    const total = Object.values(touches).reduce((sum, v) => sum + v, 0);
    addTouchLog({
      date: new Date().toISOString().split("T")[0],
      ballMastery: touches["ball-mastery"],
      passing: touches.passing,
      dribbling: touches.dribbling,
      gameTouches: touches["game-touches"],
      total,
    });
  };

  return (
    <AppShell>
      <TouchCounterPage state={state} onSaveTouches={handleSaveTouches} />
    </AppShell>
  );
}

export default function TouchCounterRoute() {
  return (
    <ClientOnly>
      <TouchCounterContent />
    </ClientOnly>
  );
}
