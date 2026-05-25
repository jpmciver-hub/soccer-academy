"use client";

import { useState, ReactNode } from "react";
import { useAppState } from "@/hooks/useAppState";
import { AppShell } from "./AppShell";
import { SetupScreen } from "./SetupScreen";

interface PageWrapperProps {
  children: (appState: ReturnType<typeof useAppState>) => ReactNode;
}

export function PageWrapper({ children }: PageWrapperProps) {
  const appState = useAppState();
  const {
    isSetup, updatePlayer, createNewProfile,
    profiles, activeProfile, switchProfile,
  } = appState;
  const [addingNew, setAddingNew] = useState(false);

  if (!isSetup || addingNew) {
    return (
      <SetupScreen
        onComplete={(player) => {
          if (addingNew) {
            createNewProfile(player);
            setAddingNew(false);
            window.location.reload();
          } else {
            updatePlayer(player);
          }
        }}
      />
    );
  }

  return (
    <AppShell
      profiles={profiles}
      activeProfile={activeProfile}
      onSwitchProfile={switchProfile}
      onNewProfile={() => setAddingNew(true)}
    >
      {children(appState)}
    </AppShell>
  );
}
