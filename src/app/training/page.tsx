"use client";

import { ClientOnly } from "@/components/layout/ClientOnly";
import { useAppState } from "@/hooks/useAppState";
import { AppShell } from "@/components/layout/AppShell";
import { SetupScreen } from "@/components/layout/SetupScreen";
import { TrainingPage } from "@/components/training/TrainingPage";
import { DayCompletion } from "@/types";

function TrainingContent() {
  const { state, isSetup, updatePlayer, toggleDrillCompletion, completeDay } = useAppState();

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

export default function TrainingRoute() {
  return (
    <ClientOnly>
      <TrainingContent />
    </ClientOnly>
  );
}
