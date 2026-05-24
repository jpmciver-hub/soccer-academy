"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Player, Position } from "@/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const positions: { value: Position; label: string; description: string }[] = [
  { value: "CB", label: "Centre Back", description: "The defensive leader. Read the game, organize the backline." },
  { value: "RB", label: "Right Back", description: "Defend wide, overlap, and deliver crosses." },
  { value: "RWB", label: "Right Wing Back", description: "Attack from deep. Speed and stamina are your weapons." },
  { value: "CDM", label: "CDM", description: "Control the midfield. Break up play and distribute." },
];

const avatarOptions = ["⚽", "🏆", "🦁", "🐺", "🦅", "🔥", "⚡", "🌟"];

interface SetupScreenProps {
  onComplete: (player: Partial<Player>) => void;
}

export function SetupScreen({ onComplete }: SetupScreenProps) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [position, setPosition] = useState<Position>("CB");
  const [avatar, setAvatar] = useState("⚽");

  const handleComplete = () => {
    onComplete({
      name,
      primaryPosition: position,
      avatarEmoji: avatar,
      startDate: new Date().toISOString().split("T")[0],
    });
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <motion.div
        key={step}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="w-full max-w-lg"
      >
        {step === 0 && (
          <div className="text-center space-y-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="text-7xl"
            >
              ⚽
            </motion.div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Soccer Academy</h1>
              <p className="text-zinc-400 text-lg">90-Day Pre-Academy Development Program</p>
            </div>
            <div className="space-y-3 text-sm text-zinc-500">
              <p>Build your technical foundation</p>
              <p>Track 1000+ daily touches</p>
              <p>Position-specific training</p>
              <p>Professional athlete development</p>
            </div>
            <Button
              onClick={() => setStep(1)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-6 text-lg rounded-xl"
            >
              Get Started
            </Button>
          </div>
        )}

        {step === 1 && (
          <Card className="bg-zinc-900 border-zinc-800 p-6 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white">What&apos;s your name?</h2>
              <p className="text-zinc-400 text-sm mt-1">This is your academy profile</p>
            </div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              autoFocus
            />
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(0)} className="border-zinc-700 text-zinc-300">
                Back
              </Button>
              <Button
                onClick={() => setStep(2)}
                disabled={!name.trim()}
                className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white"
              >
                Next
              </Button>
            </div>
          </Card>
        )}

        {step === 2 && (
          <Card className="bg-zinc-900 border-zinc-800 p-6 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white">Choose your position</h2>
              <p className="text-zinc-400 text-sm mt-1">Training will adapt to your primary position</p>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {positions.map((pos) => (
                <button
                  key={pos.value}
                  onClick={() => setPosition(pos.value)}
                  className={`text-left p-4 rounded-lg border transition-all ${
                    position === pos.value
                      ? "border-emerald-500 bg-emerald-500/10"
                      : "border-zinc-700 bg-zinc-800/50 hover:border-zinc-600"
                  }`}
                >
                  <p className="font-semibold text-white">{pos.label}</p>
                  <p className="text-sm text-zinc-400 mt-1">{pos.description}</p>
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(1)} className="border-zinc-700 text-zinc-300">
                Back
              </Button>
              <Button
                onClick={() => setStep(3)}
                className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white"
              >
                Next
              </Button>
            </div>
          </Card>
        )}

        {step === 3 && (
          <Card className="bg-zinc-900 border-zinc-800 p-6 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white">Pick your avatar</h2>
              <p className="text-zinc-400 text-sm mt-1">Choose an icon for your profile</p>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {avatarOptions.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => setAvatar(emoji)}
                  className={`text-3xl p-4 rounded-lg border transition-all ${
                    avatar === emoji
                      ? "border-emerald-500 bg-emerald-500/10"
                      : "border-zinc-700 bg-zinc-800/50 hover:border-zinc-600"
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(2)} className="border-zinc-700 text-zinc-300">
                Back
              </Button>
              <Button
                onClick={handleComplete}
                className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white"
              >
                Start Training
              </Button>
            </div>
          </Card>
        )}
      </motion.div>
    </div>
  );
}
