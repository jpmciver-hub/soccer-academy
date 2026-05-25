"use client";

import { ClientOnly } from "@/components/layout/ClientOnly";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { SoccerIQPage } from "@/components/soccer-iq/SoccerIQPage";

export default function SoccerIQRoute() {
  return (
    <ClientOnly>
      <PageWrapper>
        {() => <SoccerIQPage />}
      </PageWrapper>
    </ClientOnly>
  );
}
