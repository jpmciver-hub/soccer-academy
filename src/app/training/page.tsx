"use client";

import { ClientOnly } from "@/components/layout/ClientOnly";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { TrainingPage } from "@/components/training/TrainingPage";
import { DayCompletion } from "@/types";

export default function TrainingRoute() {
  return (
    <ClientOnly>
      <PageWrapper>
        {({ state, toggleDrillCompletion, completeDay }) => {
          const handleCompleteDay = (dayNumber: number) => {
            const existing = state.completions[dayNumber];
            const completion: DayCompletion = {
              dayNumber,
              date: new Date().toISOString().split("T")[0],
              completedDrills: existing?.completedDrills || [],
              touchLog: existing?.touchLog || {
                date: new Date().toISOString().split("T")[0],
                ballMastery: 0, passing: 0, dribbling: 0, gameTouches: 0, total: 0,
              },
              notes: "",
            };
            completeDay(dayNumber, completion);
          };

          return (
            <TrainingPage
              state={state}
              onToggleDrill={toggleDrillCompletion}
              onCompleteDay={handleCompleteDay}
            />
          );
        }}
      </PageWrapper>
    </ClientOnly>
  );
}
