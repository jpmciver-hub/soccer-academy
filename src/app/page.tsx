"use client";

import { ClientOnly } from "@/components/layout/ClientOnly";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { DashboardPage } from "@/components/dashboard/DashboardPage";

export default function Home() {
  return (
    <ClientOnly>
      <PageWrapper>
        {({ state }) => <DashboardPage state={state} />}
      </PageWrapper>
    </ClientOnly>
  );
}
