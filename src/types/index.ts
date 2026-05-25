export type Position = "RB" | "CB" | "CDM" | "RWB";

export type DrillCategory =
  | "ball-mastery"
  | "defending"
  | "passing"
  | "speed"
  | "finishing"
  | "scanning"
  | "positioning"
  | "strength";

export type TouchCategory = "ball-mastery" | "passing" | "dribbling" | "juggling" | "game-touches";

export type Phase = 1 | 2 | 3;

export type DifficultyLevel = "beginner" | "intermediate" | "advanced";

export interface Player {
  id: string;
  name: string;
  age: number;
  primaryPosition: Position;
  secondaryPositions: Position[];
  startDate: string;
  avatarEmoji: string;
}

export interface Drill {
  id: string;
  name: string;
  description: string;
  coachingPoints: string[];
  equipment: string[];
  videoUrl?: string;
  category: DrillCategory;
  difficulty: DifficultyLevel;
  estimatedMinutes: number;
  positionRelevance: Position[];
  touchCount?: number;
}

export interface TrainingSection {
  id: string;
  title: string;
  type: "warmup" | "touches" | "speed" | "position-specific" | "recovery" | "soccer-iq";
  drills: string[];
  estimatedMinutes: number;
}

export interface DailyTraining {
  id: string;
  dayNumber: number;
  week: number;
  phase: Phase;
  title: string;
  sections: TrainingSection[];
  focusArea: string;
  totalMinutes: number;
}

export interface WeeklyPlan {
  week: number;
  phase: Phase;
  theme: string;
  days: DailyTraining[];
  parentNotes: string;
  recoveryReminders: string[];
}

export interface TouchLog {
  date: string;
  ballMastery: number;
  passing: number;
  dribbling: number;
  juggling: number;
  gameTouches: number;
  total: number;
}

export interface ProgressStats {
  totalSessions: number;
  completedSessions: number;
  totalTouches: number;
  currentStreak: number;
  longestStreak: number;
  weeklyConsistency: number[];
  weakFootSessions: number;
  speedSessions: number;
  filmStudySessions: number;
  xp: number;
  level: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: string;
  threshold: number;
  category: "touches" | "streak" | "skill" | "consistency" | "special";
  unlockedAt?: string;
}

export interface CoachNote {
  id: string;
  date: string;
  content: string;
  attitude: 1 | 2 | 3 | 4 | 5;
  effort: 1 | 2 | 3 | 4 | 5;
  confidence: 1 | 2 | 3 | 4 | 5;
  areasImproving: string[];
  areasNeedingFocus: string[];
}

export interface DayCompletion {
  dayNumber: number;
  date: string;
  completedDrills: string[];
  touchLog: TouchLog;
  notes: string;
}

export interface AppState {
  player: Player;
  currentDay: number;
  completions: Record<number, DayCompletion>;
  progress: ProgressStats;
  unlockedAchievements: string[];
  coachNotes: CoachNote[];
  touchLogs: TouchLog[];
}
