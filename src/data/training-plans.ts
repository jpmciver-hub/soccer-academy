import { DailyTraining, WeeklyPlan, Phase } from "@/types";

function generateDay(
  dayNumber: number,
  week: number,
  phase: Phase,
  title: string,
  focusArea: string,
  drillIds: {
    warmup: string[];
    touches: string[];
    speed: string[];
    positionSpecific: string[];
    recovery: string[];
    soccerIq: string[];
  }
): DailyTraining {
  return {
    id: `day-${dayNumber}`,
    dayNumber,
    week,
    phase,
    title,
    focusArea,
    totalMinutes: 90,
    sections: [
      {
        id: `day-${dayNumber}-warmup`,
        title: "Warm-Up",
        type: "warmup",
        drills: drillIds.warmup,
        estimatedMinutes: 10,
      },
      {
        id: `day-${dayNumber}-touches`,
        title: "1000 Touches",
        type: "touches",
        drills: drillIds.touches,
        estimatedMinutes: 20,
      },
      {
        id: `day-${dayNumber}-speed`,
        title: "Speed & Agility",
        type: "speed",
        drills: drillIds.speed,
        estimatedMinutes: 15,
      },
      {
        id: `day-${dayNumber}-position`,
        title: "Position Specific",
        type: "position-specific",
        drills: drillIds.positionSpecific,
        estimatedMinutes: 20,
      },
      {
        id: `day-${dayNumber}-recovery`,
        title: "Cool Down & Recovery",
        type: "recovery",
        drills: drillIds.recovery,
        estimatedMinutes: 10,
      },
      {
        id: `day-${dayNumber}-iq`,
        title: "Soccer IQ",
        type: "soccer-iq",
        drills: drillIds.soccerIq,
        estimatedMinutes: 15,
      },
    ],
  };
}

const phase1Weeks: WeeklyPlan[] = [];
const phase2Weeks: WeeklyPlan[] = [];
const phase3Weeks: WeeklyPlan[] = [];

const warmupDrills = ["bm-1", "bm-2"];
const touchDrills = ["bm-3", "bm-1", "dr-1", "ps-1"];
const speedDrills = ["sp-1", "sp-2"];
const defendingDrills = ["df-1", "df-2", "df-3"];
const passingDrills = ["ps-1", "ps-2", "ps-3"];
const scanningDrills = ["sc-1", "sc-2"];
const positionDrills = ["po-1", "po-2"];
const strengthDrills = ["st-1", "st-2"];
const recoveryDrills = ["st-2"];

const weekThemes: { phase: Phase; theme: string; focus: string }[] = [
  { phase: 1, theme: "Ball Mastery Foundations", focus: "Building your base with core touch patterns" },
  { phase: 1, theme: "First Touch & Control", focus: "Receiving under different conditions" },
  { phase: 1, theme: "Passing Accuracy", focus: "Short and medium range passing" },
  { phase: 1, theme: "Defensive Fundamentals", focus: "Body shape and positioning basics" },
  { phase: 1, theme: "Weak Foot Development", focus: "Building confidence on your non-dominant foot" },
  { phase: 2, theme: "Speed & Explosiveness", focus: "First step quickness and acceleration" },
  { phase: 2, theme: "Pressing & Intensity", focus: "Defensive pressing triggers and recovery" },
  { phase: 2, theme: "Playing Under Pressure", focus: "Maintaining composure with time constraints" },
  { phase: 2, theme: "Transition Moments", focus: "Quick switches between attack and defense" },
  { phase: 2, theme: "Advanced Positioning", focus: "Reading the game and spatial awareness" },
  { phase: 3, theme: "Match Scenarios", focus: "Simulating game situations" },
  { phase: 3, theme: "Decision Making", focus: "Choosing the right option quickly" },
  { phase: 3, theme: "Final Preparation", focus: "Putting it all together for match readiness" },
];

let dayCounter = 1;

for (let w = 0; w < weekThemes.length; w++) {
  const { phase, theme, focus } = weekThemes[w];
  const weekNum = w + 1;
  const days: DailyTraining[] = [];

  const dayTitles = [
    `${theme} - Technical`,
    `${theme} - Speed & Agility`,
    `${theme} - Tactical`,
    `${theme} - Position Focus`,
    `${theme} - Challenge Day`,
    `${theme} - Film & Recovery`,
    `Active Recovery & Review`,
  ];

  for (let d = 0; d < 7; d++) {
    const isRestDay = d === 6;
    const isFilmDay = d === 5;

    const dayDrills = {
      warmup: isRestDay ? [] : warmupDrills,
      touches: isRestDay ? [] : isFilmDay ? touchDrills.slice(0, 2) : touchDrills,
      speed: isRestDay || isFilmDay ? [] : speedDrills,
      positionSpecific: isRestDay || isFilmDay
        ? []
        : d % 2 === 0
        ? defendingDrills.slice(0, 2)
        : [...passingDrills.slice(0, 1), ...scanningDrills.slice(0, 1)],
      recovery: recoveryDrills,
      soccerIq: isRestDay ? [] : isFilmDay ? scanningDrills : [scanningDrills[0]],
    };

    days.push(
      generateDay(dayCounter, weekNum, phase, dayTitles[d], focus, dayDrills)
    );
    dayCounter++;
  }

  const plan: WeeklyPlan = {
    week: weekNum,
    phase,
    theme,
    days,
    parentNotes: `Week ${weekNum}: ${theme}. Focus on ${focus.toLowerCase()}. Ensure proper hydration and rest between sessions. Watch for signs of fatigue.`,
    recoveryReminders: [
      "Stretch for 10 minutes after each session",
      "Drink water before, during, and after training",
      "Get 8-10 hours of sleep",
      "Foam roll any tight muscles",
      phase === 2 ? "Ice any sore areas after speed work" : "Light jog on recovery days",
    ],
  };

  if (phase === 1) phase1Weeks.push(plan);
  else if (phase === 2) phase2Weeks.push(plan);
  else phase3Weeks.push(plan);
}

export const allWeeklyPlans: WeeklyPlan[] = [
  ...phase1Weeks,
  ...phase2Weeks,
  ...phase3Weeks,
];

export function getWeeklyPlan(week: number): WeeklyPlan | undefined {
  return allWeeklyPlans.find((w) => w.week === week);
}

export function getDailyTraining(dayNumber: number): DailyTraining | undefined {
  for (const week of allWeeklyPlans) {
    const day = week.days.find((d) => d.dayNumber === dayNumber);
    if (day) return day;
  }
  return undefined;
}

export function getPhaseForDay(dayNumber: number): Phase {
  if (dayNumber <= 35) return 1;
  if (dayNumber <= 70) return 2;
  return 3;
}

export function getWeekForDay(dayNumber: number): number {
  return Math.ceil(dayNumber / 7);
}

export const phaseInfo = {
  1: {
    name: "Foundation & Technique",
    description: "Build your technical base with core touches, passing accuracy, and defensive fundamentals.",
    weeks: "1-5",
    color: "from-emerald-500 to-teal-600",
  },
  2: {
    name: "Speed & Pressure",
    description: "Add intensity with speed work, pressing drills, and playing under pressure.",
    weeks: "6-10",
    color: "from-amber-500 to-orange-600",
  },
  3: {
    name: "Match Readiness",
    description: "Put it all together with match scenarios, decision making, and final preparation.",
    weeks: "11-13",
    color: "from-red-500 to-rose-600",
  },
};
