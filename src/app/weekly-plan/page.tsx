"use client";

import { ClientOnly } from "@/components/layout/ClientOnly";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { WeeklyPlanPage } from "@/components/training/WeeklyPlanPage";

export default function WeeklyPlanRoute() {
  return (
    <ClientOnly>
      <PageWrapper>
        {({ state }) => <WeeklyPlanPage state={state} />}
      </PageWrapper>
    </ClientOnly>
  );
}
