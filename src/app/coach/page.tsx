"use client";

import { ClientOnly } from "@/components/layout/ClientOnly";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { CoachViewPage } from "@/components/progress/CoachViewPage";

export default function CoachRoute() {
  return (
    <ClientOnly>
      <PageWrapper>
        {({ state, addCoachNote }) => (
          <CoachViewPage state={state} onAddNote={addCoachNote} />
        )}
      </PageWrapper>
    </ClientOnly>
  );
}
