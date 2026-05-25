"use client";

import { useLocalStorage } from "./useLocalStorage";

export interface ProfileEntry {
  id: string;
  name: string;
  avatarEmoji: string;
}

interface ProfileIndex {
  activeId: string;
  profiles: ProfileEntry[];
}

const defaultIndex: ProfileIndex = {
  activeId: "",
  profiles: [],
};

export function useProfiles() {
  const [index, setIndex, isLoaded] = useLocalStorage<ProfileIndex>(
    "soccer-academy-profiles",
    defaultIndex
  );

  const addProfile = (profile: ProfileEntry) => {
    setIndex((prev) => ({
      activeId: profile.id,
      profiles: [...prev.profiles, profile],
    }));
  };

  const switchProfile = (id: string) => {
    setIndex((prev) => ({ ...prev, activeId: id }));
  };

  const deleteProfile = (id: string) => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(`soccer-academy-state-${id}`);
    }
    setIndex((prev) => {
      const remaining = prev.profiles.filter((p) => p.id !== id);
      return {
        activeId: remaining.length > 0 ? remaining[0].id : "",
        profiles: remaining,
      };
    });
  };

  const activeProfile = index.profiles.find((p) => p.id === index.activeId);

  return {
    profiles: index.profiles,
    activeProfile,
    activeId: index.activeId,
    isLoaded,
    addProfile,
    switchProfile,
    deleteProfile,
  };
}

export function getStorageKey(profileId: string): string {
  return profileId ? `soccer-academy-state-${profileId}` : "soccer-academy-state";
}
