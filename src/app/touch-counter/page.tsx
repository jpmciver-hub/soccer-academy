"use client";

import { useAppState } from "@/hooks/useAppState";
import { AppShell } from "@/components/layout/AppShell";
import { SetupScreen } from "@/components/layout/SetupScreen";
import { TouchCounterPage } from "@/components/touch-counter/TouchCounterPage";
import { TouchCategory } from "@/types";

export default function TouchCounterRoute() {
  const { state, isLoaded, isSetup, updatePlayer, addTouchLog } = useAppState();

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
