"use client";

import { ClientOnly } from "@/components/layout/ClientOnly";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { TouchCounterPage } from "@/components/touch-counter/TouchCounterPage";
import { TouchCategory } from "@/types";

export default function TouchCounterRoute() {
  return (
    <ClientOnly>
      <PageWrapper>
        {({ state, addTouchLog }) => {
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

          return <TouchCounterPage state={state} onSaveTouches={handleSaveTouches} />;
        }}
      </PageWrapper>
    </ClientOnly>
  );
}
