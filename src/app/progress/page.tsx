"use client";

import { ClientOnly } from "@/components/layout/ClientOnly";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { ProgressPage } from "@/components/progress/ProgressPage";

export default function ProgressRoute() {
  return (
    <ClientOnly>
      <PageWrapper>
        {({ state }) => <ProgressPage state={state} />}
      </PageWrapper>
    </ClientOnly>
  );
}
