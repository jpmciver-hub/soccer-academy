import { Drill, DrillCategory, Position } from "@/types";

export const drills: Drill[] = [
  // Ball Mastery
  {
    id: "bm-1",
    name: "Toe Taps",
    description: "Alternate tapping the top of the ball with the sole of each foot. Keep your body balanced over the ball and maintain a rhythm.",
    coachingPoints: [
      "Stay on the balls of your feet",
      "Keep knees slightly bent",
      "Eyes up as you improve",
      "Light touches, quick feet"
    ],
    equipment: ["Ball"],
    videoUrl: "https://www.youtube.com/watch?v=KaktBhbJUyg",
    category: "ball-mastery",
    difficulty: "beginner",
    estimatedMinutes: 5,
    positionRelevance: ["RB", "CB", "CDM", "RWB"],
    touchCount: 200,
  },
  {
    id: "bm-2",
    name: "Juggling",
    description: "Keep the ball in the air using feet, thighs, and head. Start with one touch and catch, then build to consecutive juggles. Focus on a soft cushioning touch.",
    coachingPoints: [
      "Lock your ankle and point toes slightly up",
      "Strike the bottom third of the ball with your laces",
      "Keep the ball below head height for control",
      "Use both feet equally"
    ],
    equipment: ["Ball"],
    videoUrl: "https://www.youtube.com/watch?v=iVCIG-yir2o",
    category: "ball-mastery",
    difficulty: "beginner",
    estimatedMinutes: 10,
    positionRelevance: ["RB", "CB", "CDM", "RWB"],
    touchCount: 200,
  },
  {
    id: "bm-3",
    name: "Foundation Touches",
    description: "Cycle through: inside-inside, outside-outside, sole rolls, and pull-push patterns in a small grid.",
    coachingPoints: [
      "Soft first touch",
      "Keep the ball within your body frame",
      "Gradually increase speed",
      "Both feet equally"
    ],
    equipment: ["Ball", "4 Cones"],
    category: "ball-mastery",
    difficulty: "beginner",
    estimatedMinutes: 8,
    positionRelevance: ["RB", "CB", "CDM", "RWB"],
    touchCount: 300,
  },
  {
    id: "bm-4",
    name: "Cruyff Turns",
    description: "Approach the ball as if to pass, then drag it behind your standing leg with the inside of your foot. Accelerate out.",
    coachingPoints: [
      "Sell the fake pass with your body shape",
      "Plant foot beside the ball",
      "Sharp change of direction",
      "Accelerate after the turn"
    ],
    equipment: ["Ball", "2 Cones"],
    videoUrl: "https://www.youtube.com/watch?v=LRSUw7mgqAY",
    category: "ball-mastery",
    difficulty: "intermediate",
    estimatedMinutes: 8,
    positionRelevance: ["RB", "CB", "CDM", "RWB"],
    touchCount: 100,
  },
  {
    id: "bm-5",
    name: "La Croqueta",
    description: "Push the ball with the inside of one foot to the inside of the other foot in a quick lateral movement. Used to evade tackles in tight spaces.",
    coachingPoints: [
      "Quick weight shift",
      "Ball stays close to feet",
      "Use body to shield",
      "Practice both directions"
    ],
    equipment: ["Ball"],
    category: "ball-mastery",
    difficulty: "advanced",
    estimatedMinutes: 6,
    positionRelevance: ["CDM", "RWB"],
    touchCount: 80,
  },
  // Passing
  {
    id: "ps-1",
    name: "Wall Passes",
    description: "Pass against a wall or rebounder with the inside of your foot. Receive and control with the opposite foot.",
    coachingPoints: [
      "Lock your ankle",
      "Follow through toward target",
      "Cushion the return pass",
      "Alternate feet every 10 passes"
    ],
    equipment: ["Ball", "Wall/Rebounder"],
    videoUrl: "https://www.youtube.com/watch?v=LHSJbFE43Xg",
    category: "passing",
    difficulty: "beginner",
    estimatedMinutes: 10,
    positionRelevance: ["RB", "CB", "CDM", "RWB"],
    touchCount: 200,
  },
  {
    id: "ps-2",
    name: "Driven Passes",
    description: "Practice firm driven passes over 15-20 yards. Focus on hitting the laces through the center of the ball.",
    coachingPoints: [
      "Plant foot pointing at target",
      "Strike through the middle of the ball",
      "Follow through low for driven pass",
      "Keep body over the ball"
    ],
    equipment: ["Ball", "Cones", "Wall/Partner"],
    category: "passing",
    difficulty: "intermediate",
    estimatedMinutes: 10,
    positionRelevance: ["CB", "CDM"],
    touchCount: 100,
  },
  {
    id: "ps-3",
    name: "Switching Play",
    description: "Practice long diagonal passes to switch the point of attack. Set up cones at 30-40 yards and aim to land the ball within a target zone.",
    coachingPoints: [
      "Open body shape",
      "Strike underneath the ball for loft",
      "Follow through across your body",
      "Scan before switching"
    ],
    equipment: ["Ball", "6 Cones"],
    category: "passing",
    difficulty: "advanced",
    estimatedMinutes: 12,
    positionRelevance: ["CB", "CDM"],
    touchCount: 60,
  },
  // Defending
  {
    id: "df-1",
    name: "1v1 Defensive Stance",
    description: "Practice getting into a low, balanced defensive stance. Shadow an imaginary attacker, staying on your toes and ready to react.",
    coachingPoints: [
      "Low center of gravity",
      "Side-on body shape",
      "Watch the ball, not the player's hips",
      "Patience — don't dive in"
    ],
    equipment: ["Cones"],
    videoUrl: "https://www.youtube.com/watch?v=sjHLU8CQkQw",
    category: "defending",
    difficulty: "beginner",
    estimatedMinutes: 8,
    positionRelevance: ["RB", "CB", "CDM", "RWB"],
  },
  {
    id: "df-2",
    name: "Recovery Runs",
    description: "Sprint to recover defensive position after being beaten. Set up scenarios where you start ahead of the 'attacker' line and must recover to goal-side.",
    coachingPoints: [
      "Sprint at full speed",
      "Get goal-side first",
      "Check your shoulder",
      "Adjust body shape as you arrive"
    ],
    equipment: ["Cones", "Ball"],
    category: "defending",
    difficulty: "intermediate",
    estimatedMinutes: 10,
    positionRelevance: ["RB", "CB", "RWB"],
  },
  {
    id: "df-3",
    name: "Pressing Triggers",
    description: "Practice recognizing and reacting to pressing triggers: bad touch, backwards pass, player receiving with back to goal.",
    coachingPoints: [
      "Explode when you see the trigger",
      "Curved run to show them one way",
      "Close down with controlled aggression",
      "Don't overcommit if they turn"
    ],
    equipment: ["Cones", "Ball"],
    category: "defending",
    difficulty: "intermediate",
    estimatedMinutes: 10,
    positionRelevance: ["CB", "CDM"],
  },
  // Speed & Agility
  {
    id: "sp-1",
    name: "Ladder Drills",
    description: "Perform agility ladder patterns: in-in-out-out, ickey shuffle, single leg hops, and lateral runs.",
    coachingPoints: [
      "Quick feet, light contacts",
      "Pump your arms",
      "Stay on the balls of your feet",
      "Quality over speed initially"
    ],
    equipment: ["Agility Ladder"],
    videoUrl: "https://www.youtube.com/watch?v=hlJW5q8s2z0",
    category: "speed",
    difficulty: "beginner",
    estimatedMinutes: 8,
    positionRelevance: ["RB", "CB", "CDM", "RWB"],
  },
  {
    id: "sp-2",
    name: "Cone Shuttle Sprints",
    description: "Set up cones at 5, 10, 15, and 20 yards. Sprint to each cone and back. Focus on explosive starts and sharp deceleration.",
    coachingPoints: [
      "Low start position",
      "Drive with your arms",
      "Decelerate under control",
      "Touch the ground at each cone"
    ],
    equipment: ["4 Cones"],
    category: "speed",
    difficulty: "intermediate",
    estimatedMinutes: 10,
    positionRelevance: ["RB", "CB", "CDM", "RWB"],
  },
  {
    id: "sp-3",
    name: "Reaction Sprints",
    description: "Start in various positions (sitting, lying, backwards). On a signal, spring up and sprint 10 yards to a target cone.",
    coachingPoints: [
      "Explosive first step",
      "Quick transition to sprint posture",
      "Stay low for the first 3 steps",
      "Full recovery between reps"
    ],
    equipment: ["Cones"],
    category: "speed",
    difficulty: "intermediate",
    estimatedMinutes: 8,
    positionRelevance: ["RB", "CB", "CDM", "RWB"],
  },
  // Scanning
  {
    id: "sc-1",
    name: "Shoulder Check Practice",
    description: "Receive a pass from a wall, but before controlling, check over both shoulders. Say out loud what you 'see' (open space, defender closing).",
    coachingPoints: [
      "Scan BEFORE the ball arrives",
      "Quick head movement",
      "Verbalize what you see",
      "Already know your next action"
    ],
    equipment: ["Ball", "Wall/Rebounder"],
    videoUrl: "https://www.youtube.com/watch?v=A7YR73ALZ1s",
    category: "scanning",
    difficulty: "beginner",
    estimatedMinutes: 10,
    positionRelevance: ["CB", "CDM", "RWB"],
    touchCount: 100,
  },
  {
    id: "sc-2",
    name: "Head Up Dribbling",
    description: "Dribble through a cone course while a partner holds up fingers. Call out the number while maintaining ball control.",
    coachingPoints: [
      "Peripheral vision",
      "Soft touches to keep ball close",
      "Glance down only briefly",
      "Trust your touch"
    ],
    equipment: ["Ball", "Cones"],
    category: "scanning",
    difficulty: "intermediate",
    estimatedMinutes: 8,
    positionRelevance: ["CDM", "RWB"],
    touchCount: 80,
  },
  // Positioning
  {
    id: "po-1",
    name: "Shadow Positioning",
    description: "Watch a tactical video and mirror the defensive positioning on a mini field. Focus on distances, angles, and body shape.",
    coachingPoints: [
      "Maintain correct distances from teammates",
      "Adjust based on ball position",
      "Stay compact when defending",
      "Expand when in possession"
    ],
    equipment: ["Cones"],
    category: "positioning",
    difficulty: "intermediate",
    estimatedMinutes: 15,
    positionRelevance: ["RB", "CB", "CDM", "RWB"],
  },
  {
    id: "po-2",
    name: "Overlap Runs (RB/RWB)",
    description: "Practice timing overlap runs. Start from the fullback position, time your run to arrive wide as the ball reaches the winger zone.",
    coachingPoints: [
      "Timing is everything",
      "Accelerate past the winger line",
      "Stay wide to stretch the defense",
      "Recover quickly if possession is lost"
    ],
    equipment: ["Ball", "Cones"],
    category: "positioning",
    difficulty: "intermediate",
    estimatedMinutes: 10,
    positionRelevance: ["RB", "RWB"],
  },
  // Finishing
  {
    id: "fn-1",
    name: "Finishing Under Pressure",
    description: "Receive a pass, take a touch, and shoot within 2 seconds. Set up cones as imaginary defenders to create pressure.",
    coachingPoints: [
      "Prepare body shape early",
      "First touch sets up the shot",
      "Pick your spot before shooting",
      "Follow through on target"
    ],
    equipment: ["Ball", "Goal/Target", "Cones"],
    category: "finishing",
    difficulty: "intermediate",
    estimatedMinutes: 12,
    positionRelevance: ["CDM", "RWB"],
    touchCount: 50,
  },
  // Strength
  {
    id: "st-1",
    name: "Bodyweight Circuit",
    description: "Complete a circuit of: squats (15), lunges (10 each leg), push-ups (10), plank (30s), mountain climbers (20). Repeat 2-3 times.",
    coachingPoints: [
      "Proper form over speed",
      "Full range of motion",
      "Controlled breathing",
      "Rest 60 seconds between circuits"
    ],
    equipment: [],
    category: "strength",
    difficulty: "beginner",
    estimatedMinutes: 15,
    positionRelevance: ["RB", "CB", "CDM", "RWB"],
  },
  {
    id: "st-2",
    name: "Single Leg Balance Work",
    description: "Stand on one leg on an unstable surface. Practice receiving and passing with a partner while maintaining balance.",
    coachingPoints: [
      "Engage your core",
      "Slight bend in the standing knee",
      "Use arms for balance",
      "Progress to closing your eyes"
    ],
    equipment: ["Balance pad (optional)", "Ball"],
    category: "strength",
    difficulty: "intermediate",
    estimatedMinutes: 10,
    positionRelevance: ["RB", "CB", "CDM", "RWB"],
  },
  // Dribbling
  {
    id: "dr-1",
    name: "Cone Weave Dribbling",
    description: "Set up 8-10 cones in a line, 2 yards apart. Dribble through using inside and outside of both feet.",
    coachingPoints: [
      "Close control through the cones",
      "Use both feet",
      "Accelerate between cones",
      "Keep the ball within playing distance"
    ],
    equipment: ["Ball", "8-10 Cones"],
    videoUrl: "https://www.youtube.com/watch?v=vnngDOCy9C8",
    category: "ball-mastery",
    difficulty: "beginner",
    estimatedMinutes: 8,
    positionRelevance: ["RB", "CB", "CDM", "RWB"],
    touchCount: 200,
  },
];

export const drillCategories: { value: DrillCategory; label: string; icon: string }[] = [
  { value: "ball-mastery", label: "Ball Mastery", icon: "⚽" },
  { value: "defending", label: "Defending", icon: "🛡️" },
  { value: "passing", label: "Passing", icon: "🎯" },
  { value: "speed", label: "Speed & Agility", icon: "⚡" },
  { value: "finishing", label: "Finishing", icon: "🥅" },
  { value: "scanning", label: "Scanning", icon: "👀" },
  { value: "positioning", label: "Positioning", icon: "📍" },
  { value: "strength", label: "Strength", icon: "💪" },
];

export function getDrillById(id: string): Drill | undefined {
  return drills.find((d) => d.id === id);
}

export function getDrillsByCategory(category: DrillCategory): Drill[] {
  return drills.filter((d) => d.category === category);
}

export function getDrillsByPosition(position: Position): Drill[] {
  return drills.filter((d) => d.positionRelevance.includes(position));
}
