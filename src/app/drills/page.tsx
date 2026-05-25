"use client";

import { ClientOnly } from "@/components/layout/ClientOnly";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { DrillLibraryPage } from "@/components/drills/DrillLibraryPage";

export default function DrillsRoute() {
  return (
    <ClientOnly>
      <PageWrapper>
        {() => <DrillLibraryPage />}
      </PageWrapper>
    </ClientOnly>
  );
}
