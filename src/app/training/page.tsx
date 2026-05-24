"use client";

import { useAppState } from "@/hooks/useAppState";
import { AppShell } from "@/components/layout/AppShell";
import { SetupScreen } from "@/components/layout/SetupScreen";
import { TrainingPage } from "@/components/training/TrainingPage";
import { DayCompletion } from "@/types";

export default function TrainingRoute() {
  const { state, isLoaded, isSetup, updatePlayer, toggleDrillCompletion, completeDay } = useAppState();

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

  const handleCompleteDay = (dayNumber: number) => {
    const existing = state.completions[dayNumber];
    const completion: DayCompletion = {
      dayNumber,
      date: new Date().toISOString().split("T")[0],
      completedDrills: existing?.completedDrills || [],
      touchLog: existing?.touchLog || {
        date: new Date().toISOString().split("T")[0],
        ballMastery: 0,
        passing: 0,
        dribbling: 0,
        gameTouches: 0,
        total: 0,
      },
      notes: "",
    };
    completeDay(dayNumber, completion);
  };

  return (
    <AppShell>
      <TrainingPage
        state={state}
        onToggleDrill={toggleDrillCompletion}
        onCompleteDay={handleCompleteDay}
      />
    </AppShell>
  );
}
