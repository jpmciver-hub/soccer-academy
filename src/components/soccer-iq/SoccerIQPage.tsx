"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp, BookOpen, PlayCircle } from "lucide-react";
import { YouTubeEmbed } from "@/components/ui/youtube-embed";

interface Concept {
  id: string;
  title: string;
  category: string;
  description: string;
  keyPoints: string[];
  videoUrl?: string;
  diagram?: string;
}

const concepts: Concept[] = [
  {
    id: "9v9-spacing",
    title: "9v9 Spacing & Shape",
    category: "Formation",
    description: "In 9v9, the team shape typically uses a 3-2-3 or 3-4-1. Spacing between lines should be 10-15 yards. Width should stretch the full pitch. When in possession, the team expands. Out of possession, the team compresses.",
    keyPoints: [
      "Defensive line should be 10-15 yards from midfield",
      "Midfield stays compact - max 15 yards between widest players",
      "When your team has the ball, push up and get wide",
      "When defending, squeeze the space and stay tight",
      "Goalkeeper acts as an extra outfield player in build-up",
    ],
    videoUrl: "https://www.youtube.com/watch?v=vb95htEzTvk",
  },
  {
    id: "build-out",
    title: "Building Out from the Back",
    category: "Possession",
    description: "Building out means playing short passes from your goalkeeper and defenders to move the ball up the field under control. The goal is to attract the press, then play through or around it.",
    keyPoints: [
      "GK starts with CBs split wide",
      "Fullbacks push higher to create passing angles",
      "CDM drops between or in front of CBs to offer a central option",
      "Use the GK as a reset — go back to go forward",
      "If the press is tight, look for the switch or go long",
      "Body shape: always open to the field, never face your own goal",
    ],
    videoUrl: "https://www.youtube.com/watch?v=BjZ6oNk9Dnw",
  },
  {
    id: "defensive-compactness",
    title: "Defensive Compactness",
    category: "Defending",
    description: "When defending, the team must stay compact — reducing space between the lines and limiting gaps for the opponent to play through. The defensive block should shift as a unit based on ball position.",
    keyPoints: [
      "Stay within 2-3 body lengths of your nearest teammate",
      "Shift across as a unit when the ball moves wide",
      "Drop together — never let one player be higher than the line",
      "Force play to one side of the field",
      "The ball-side players press, the far-side tucks in",
      "Communication is key: talk to each other constantly",
    ],
  },
  {
    id: "transitions",
    title: "Transition Moments",
    category: "Transitions",
    description: "Transitions are the moments when possession changes. The first 3-5 seconds after winning or losing the ball are the most important. Quick reactions here create or prevent goal-scoring opportunities.",
    keyPoints: [
      "When you WIN the ball: first look forward immediately",
      "Counter-press if you LOSE the ball — react within 3 seconds",
      "After winning, decide: play quick forward or secure possession",
      "After losing, nearest players press, others recover shape",
      "CBs and CDMs: recover goal-side immediately on turnovers",
      "RB/RWB: track back immediately if caught high up",
    ],
  },
  {
    id: "pressing-triggers",
    title: "When to Press",
    category: "Defending",
    description: "You don't press every ball. Good defenders read pressing triggers — moments when the opponent is vulnerable and pressing will be effective.",
    keyPoints: [
      "Press when the opponent has a bad first touch",
      "Press when they receive with their back to goal",
      "Press on a backwards or sideways pass",
      "Press when they're near the touchline (trapped)",
      "Don't press into a 1v2 — hold your position",
      "Curved run: show them where you want them to go",
    ],
  },
  {
    id: "cb-positioning",
    title: "Centre Back Positioning",
    category: "Position Specific",
    description: "As a CB, your primary job is to protect the space in front of your goal. Positioning is about reading the game and being in the right place before the ball arrives.",
    keyPoints: [
      "Stay goal-side of your attacker at all times",
      "Watch the ball, not just the player",
      "Step up to intercept — don't wait for the ball to come to you",
      "Cover for the fullback when they push forward",
      "Communicate with your GK and partner CB",
      "In build-up: split wide, be brave on the ball",
    ],
  },
  {
    id: "cdm-role",
    title: "CDM: The Screen",
    category: "Position Specific",
    description: "The CDM sits in front of the back line and controls the tempo of the game. You're the link between defense and attack, and the first line of defense when the team loses the ball.",
    keyPoints: [
      "Position yourself to see the whole field (body open)",
      "Screen passing lanes — don't chase the ball",
      "Receive on the half-turn to play forward quickly",
      "Scan constantly — know where space and pressure are",
      "In defense: protect the gap between the CBs",
      "In attack: keep the ball moving with simple, quick passes",
    ],
  },
  {
    id: "rb-overlaps",
    title: "Fullback Overlaps & Underlaps",
    category: "Position Specific",
    description: "As an RB or RWB, overlaps and underlaps are your key attacking weapons. Timing your run is everything — arrive too early and you're offside or marked. Too late and the moment is gone.",
    keyPoints: [
      "Overlap: run OUTSIDE the winger, hug the touchline",
      "Underlap: run INSIDE the winger, cut into the half-space",
      "Communication: shout 'hold' or 'go' to the winger",
      "Time your run: start accelerating as the winger receives",
      "If the winger drives inside, overlap is on",
      "Recovery: sprint back immediately if the move breaks down",
    ],
  },
  {
    id: "scanning",
    title: "Scanning: See the Game",
    category: "Game Intelligence",
    description: "Elite players scan 6-8 times in the 10 seconds before receiving the ball. Scanning means checking your shoulders to understand where space, teammates, and opponents are BEFORE the ball arrives.",
    keyPoints: [
      "Scan BEFORE you receive, not after",
      "Quick head movements — glance, don't stare",
      "Check both shoulders, not just one",
      "Already know your next pass before the ball arrives",
      "In a game, scan every 3-4 seconds",
      "Practice: have someone hold up fingers behind you while you control a ball",
    ],
    videoUrl: "https://www.youtube.com/watch?v=FXG5ZRVyXVU",
  },
];

export function SoccerIQPage() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const categories = [...new Set(concepts.map((c) => c.category))];
  const filtered = categoryFilter === "all"
    ? concepts
    : concepts.filter((c) => c.category === categoryFilter);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
          <BookOpen className="h-7 w-7 text-emerald-400" />
          Soccer IQ
        </h1>
        <p className="text-zinc-400 mt-1">Tactical concepts, positioning, and game intelligence</p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setCategoryFilter("all")}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
            categoryFilter === "all"
              ? "bg-emerald-500/20 text-emerald-400"
              : "bg-zinc-800 text-zinc-400 hover:text-white"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              categoryFilter === cat
                ? "bg-emerald-500/20 text-emerald-400"
                : "bg-zinc-800 text-zinc-400 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Concepts */}
      <div className="space-y-3">
        {filtered.map((concept) => {
          const isExpanded = expanded === concept.id;

          return (
            <Card key={concept.id} className="bg-zinc-900 border-zinc-800 overflow-hidden">
              <button
                onClick={() => setExpanded(isExpanded ? null : concept.id)}
                className="w-full text-left p-4 md:p-5 hover:bg-zinc-800/30 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="border-zinc-700 text-zinc-400 text-xs">
                        {concept.category}
                      </Badge>
                      {concept.videoUrl && (
                        <Badge variant="outline" className="border-blue-500/30 text-blue-400 text-xs">
                          <PlayCircle className="h-3 w-3 mr-1" />
                          Video
                        </Badge>
                      )}
                    </div>
                    <h3 className="font-semibold text-white text-lg">{concept.title}</h3>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="h-5 w-5 text-zinc-500 shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-zinc-500 shrink-0" />
                  )}
                </div>
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 md:px-5 pb-5 space-y-4 border-t border-zinc-800 pt-4">
                      <p className="text-sm text-zinc-300 leading-relaxed">{concept.description}</p>

                      <div>
                        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Key Points</p>
                        <ul className="space-y-2">
                          {concept.keyPoints.map((point, i) => (
                            <li key={i} className="text-sm text-zinc-400 flex items-start gap-2">
                              <span className="text-emerald-400 font-bold mt-0.5">{i + 1}.</span>
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {concept.videoUrl && (
                        <div className="pt-2">
                          <YouTubeEmbed url={concept.videoUrl} title={concept.title} />
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
