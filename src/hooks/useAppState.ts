"use client";

import { useLocalStorage } from "./useLocalStorage";
import { useProfiles, getStorageKey, ProfileEntry } from "./useProfiles";
import { AppState, Player, DayCompletion, TouchLog, CoachNote, ProgressStats } from "@/types";
import { useCallback, useMemo } from "react";

const defaultPlayer: Player = {
  id: "player-1",
  name: "",
  age: 11,
  primaryPosition: "CB",
  secondaryPositions: [],
  startDate: new Date().toISOString().split("T")[0],
  avatarEmoji: "⚽",
};

const defaultProgress: ProgressStats = {
  totalSessions: 0,
  completedSessions: 0,
  totalTouches: 0,
  currentStreak: 0,
  longestStreak: 0,
  weeklyConsistency: [],
  weakFootSessions: 0,
  speedSessions: 0,
  filmStudySessions: 0,
  xp: 0,
  level: 1,
};

const defaultState: AppState = {
  player: defaultPlayer,
  currentDay: 1,
  completions: {},
  progress: defaultProgress,
  unlockedAchievements: [],
  coachNotes: [],
  touchLogs: [],
};

export function useAppState() {
  const profilesHook = useProfiles();
  const storageKey = getStorageKey(profilesHook.activeId);
  const [state, setState, isStateLoaded] = useLocalStorage<AppState>(storageKey, defaultState);

  const isLoaded = profilesHook.isLoaded && isStateLoaded;

  const updatePlayer = useCallback(
    (player: Partial<Player>) => {
      const newName = player.name || state.player.name;
      const newEmoji = player.avatarEmoji || state.player.avatarEmoji;
      const newId = player.name
        ? `player-${player.name.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`
        : state.player.id;

      if (player.name && !profilesHook.activeId) {
        const entry: ProfileEntry = {
          id: newId,
          name: newName,
          avatarEmoji: newEmoji,
        };
        profilesHook.addProfile(entry);
      }

      setState((prev) => ({
        ...prev,
        player: { ...prev.player, ...player, id: prev.player.id || newId },
      }));
    },
    [setState, state.player, profilesHook]
  );

  const createNewProfile = useCallback(
    (player: Partial<Player>) => {
      const id = `player-${(player.name || "new").toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`;
      const entry: ProfileEntry = {
        id,
        name: player.name || "New Player",
        avatarEmoji: player.avatarEmoji || "⚽",
      };
      profilesHook.addProfile(entry);

      const key = getStorageKey(id);
      const newState: AppState = {
        ...defaultState,
        player: {
          ...defaultPlayer,
          ...player,
          id,
          startDate: new Date().toISOString().split("T")[0],
        },
      };
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(newState));
      }
    },
    [profilesHook]
  );

  const completeDay = useCallback(
    (dayNumber: number, completion: DayCompletion) => {
      setState((prev) => {
        const newCompletions = { ...prev.completions, [dayNumber]: completion };
        const completedCount = Object.keys(newCompletions).length;
        const streak = calculateStreak(newCompletions, dayNumber);
        const totalTouches = Object.values(newCompletions).reduce(
          (sum, c) => sum + (c.touchLog?.total || 0),
          0
        );
        const xpGain = 100 + (completion.touchLog?.total || 0) / 10;
        const newXp = prev.progress.xp + xpGain;
        const newLevel = Math.floor(newXp / 500) + 1;

        return {
          ...prev,
          completions: newCompletions,
          currentDay: Math.max(prev.currentDay, dayNumber + 1),
          progress: {
            ...prev.progress,
            completedSessions: completedCount,
            totalTouches,
            currentStreak: streak,
            longestStreak: Math.max(prev.progress.longestStreak, streak),
            xp: newXp,
            level: newLevel,
          },
        };
      });
    },
    [setState]
  );

  const addTouchLog = useCallback(
    (log: TouchLog) => {
      setState((prev) => ({
        ...prev,
        touchLogs: [...prev.touchLogs, log],
        progress: {
          ...prev.progress,
          totalTouches: prev.progress.totalTouches + log.total,
        },
      }));
    },
    [setState]
  );

  const toggleDrillCompletion = useCallback(
    (dayNumber: number, drillId: string) => {
      setState((prev) => {
        const existing = prev.completions[dayNumber] || {
          dayNumber,
          date: new Date().toISOString().split("T")[0],
          completedDrills: [],
          touchLog: { date: new Date().toISOString().split("T")[0], ballMastery: 0, passing: 0, dribbling: 0, gameTouches: 0, total: 0 },
          notes: "",
        };
        const completedDrills = existing.completedDrills.includes(drillId)
          ? existing.completedDrills.filter((id) => id !== drillId)
          : [...existing.completedDrills, drillId];

        return {
          ...prev,
          completions: {
            ...prev.completions,
            [dayNumber]: { ...existing, completedDrills },
          },
        };
      });
    },
    [setState]
  );

  const addCoachNote = useCallback(
    (note: CoachNote) => {
      setState((prev) => ({
        ...prev,
        coachNotes: [...prev.coachNotes, note],
      }));
    },
    [setState]
  );

  const unlockAchievement = useCallback(
    (achievementId: string) => {
      setState((prev) => {
        if (prev.unlockedAchievements.includes(achievementId)) return prev;
        return {
          ...prev,
          unlockedAchievements: [...prev.unlockedAchievements, achievementId],
        };
      });
    },
    [setState]
  );

  const resetState = useCallback(() => {
    setState(defaultState);
  }, [setState]);

  const isSetup = useMemo(() => {
    return profilesHook.profiles.length > 0 && profilesHook.activeId !== "" && state.player.name !== "";
  }, [profilesHook.profiles.length, profilesHook.activeId, state.player.name]);

  return {
    state,
    isLoaded,
    isSetup,
    updatePlayer,
    createNewProfile,
    completeDay,
    addTouchLog,
    toggleDrillCompletion,
    addCoachNote,
    unlockAchievement,
    resetState,
    setState,
    profiles: profilesHook.profiles,
    activeProfile: profilesHook.activeProfile,
    switchProfile: profilesHook.switchProfile,
    deleteProfile: profilesHook.deleteProfile,
  };
}

function calculateStreak(completions: Record<number, DayCompletion>, currentDay: number): number {
  let streak = 0;
  let day = currentDay;
  while (completions[day]) {
    streak++;
    day--;
  }
  return streak;
}
