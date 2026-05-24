"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AppState, CoachNote } from "@/types";
import { getWeekForDay, getPhaseForDay, phaseInfo } from "@/data/training-plans";
import {
  ClipboardList,
  TrendingUp,
  AlertTriangle,
  MessageSquare,
  Star,
  Plus,
} from "lucide-react";

interface CoachViewPageProps {
  state: AppState;
  onAddNote: (note: CoachNote) => void;
}

export function CoachViewPage({ state, onAddNote }: CoachViewPageProps) {
  const { progress, completions, coachNotes, player, currentDay } = state;
  const week = getWeekForDay(currentDay);
  const phase = getPhaseForDay(currentDay);

  const [showNoteForm, setShowNoteForm] = useState(false);
  const [noteContent, setNoteContent] = useState("");
  const [attitude, setAttitude] = useState<1 | 2 | 3 | 4 | 5>(3);
  const [effort, setEffort] = useState<1 | 2 | 3 | 4 | 5>(3);
  const [confidence, setConfidence] = useState<1 | 2 | 3 | 4 | 5>(3);
  const [improving, setImproving] = useState("");
  const [needsFocus, setNeedsFocus] = useState("");

  const weekStart = (week - 1) * 7 + 1;
  const weekEnd = week * 7;
  let weekCompleted = 0;
  for (let d = weekStart; d <= weekEnd; d++) {
    if (completions[d]) weekCompleted++;
  }

  const handleSubmitNote = () => {
    const note: CoachNote = {
      id: `note-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      content: noteContent,
      attitude,
      effort,
      confidence,
      areasImproving: improving.split(",").map((s) => s.trim()).filter(Boolean),
      areasNeedingFocus: needsFocus.split(",").map((s) => s.trim()).filter(Boolean),
    };
    onAddNote(note);
    setShowNoteForm(false);
    setNoteContent("");
    setImproving("");
    setNeedsFocus("");
  };

  const RatingStars = ({
    value,
    onChange,
    label,
  }: {
    value: number;
    onChange: (v: 1 | 2 | 3 | 4 | 5) => void;
    label: string;
  }) => (
    <div className="flex items-center justify-between">
      <span className="text-sm text-zinc-400">{label}</span>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <button
            key={i}
            onClick={() => onChange(i as 1 | 2 | 3 | 4 | 5)}
            className={`p-0.5 ${i <= value ? "text-amber-400" : "text-zinc-700"}`}
          >
            <Star className="h-4 w-4" fill={i <= value ? "currentColor" : "none"} />
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
            <ClipboardList className="h-7 w-7 text-emerald-400" />
            Coach View
          </h1>
          <p className="text-zinc-400 mt-1">{player.name}&apos;s development overview</p>
        </div>
        <Badge variant="outline" className="border-zinc-700 text-zinc-400">
          Phase {phase} &middot; Week {week}
        </Badge>
      </div>

      {/* Weekly Summary */}
      <Card className="bg-zinc-900 border-zinc-800 p-5">
        <h3 className="font-semibold text-white mb-4">This Week&apos;s Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-zinc-500 mb-1">Sessions Completed</p>
            <p className="text-xl font-bold text-white">{weekCompleted}/7</p>
            <Progress value={(weekCompleted / 7) * 100} className="h-1 bg-zinc-800 mt-2" />
          </div>
          <div>
            <p className="text-xs text-zinc-500 mb-1">Current Streak</p>
            <p className="text-xl font-bold text-white">{progress.currentStreak} days</p>
          </div>
          <div>
            <p className="text-xs text-zinc-500 mb-1">Weekly Touches</p>
            <p className="text-xl font-bold text-white">
              {Object.entries(completions)
                .filter(([day]) => {
                  const d = parseInt(day);
                  return d >= weekStart && d <= weekEnd;
                })
                .reduce((sum, [, c]) => sum + (c.touchLog?.total || 0), 0)
                .toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-xs text-zinc-500 mb-1">Overall Progress</p>
            <p className="text-xl font-bold text-white">
              {Math.round((progress.completedSessions / 91) * 100)}%
            </p>
          </div>
        </div>
      </Card>

      {/* Areas Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-zinc-900 border-zinc-800 p-5">
          <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-emerald-400" />
            Areas Improving
          </h3>
          {coachNotes.length > 0 ? (
            <ul className="space-y-2">
              {[...new Set(coachNotes.flatMap((n) => n.areasImproving))].slice(0, 5).map((area, i) => (
                <li key={i} className="text-sm text-zinc-400 flex items-center gap-2">
                  <span className="text-emerald-400">+</span> {area}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-zinc-500">Add coach notes to track improvement areas</p>
          )}
        </Card>

        <Card className="bg-zinc-900 border-zinc-800 p-5">
          <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-400" />
            Areas Needing Focus
          </h3>
          {coachNotes.length > 0 ? (
            <ul className="space-y-2">
              {[...new Set(coachNotes.flatMap((n) => n.areasNeedingFocus))].slice(0, 5).map((area, i) => (
                <li key={i} className="text-sm text-zinc-400 flex items-center gap-2">
                  <span className="text-amber-400">!</span> {area}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-zinc-500">Add coach notes to track focus areas</p>
          )}
        </Card>
      </div>

      {/* Add Note */}
      <Card className="bg-zinc-900 border-zinc-800 p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-white flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-blue-400" />
            Coach Notes
          </h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowNoteForm(!showNoteForm)}
            className="border-zinc-700 text-zinc-300"
          >
            <Plus className="h-3 w-3 mr-1" />
            Add Note
          </Button>
        </div>

        {showNoteForm && (
          <div className="space-y-4 border-t border-zinc-800 pt-4 mb-4">
            <textarea
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              placeholder="Session observations, feedback, encouragement..."
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 min-h-[80px]"
            />

            <div className="space-y-3">
              <RatingStars value={attitude} onChange={setAttitude} label="Attitude" />
              <RatingStars value={effort} onChange={setEffort} label="Effort" />
              <RatingStars value={confidence} onChange={setConfidence} label="Confidence" />
            </div>

            <div>
              <label className="text-xs text-zinc-500 font-medium block mb-1.5">Areas Improving (comma separated)</label>
              <input
                type="text"
                value={improving}
                onChange={(e) => setImproving(e.target.value)}
                placeholder="e.g., First touch, Positioning"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              />
            </div>

            <div>
              <label className="text-xs text-zinc-500 font-medium block mb-1.5">Areas Needing Focus (comma separated)</label>
              <input
                type="text"
                value={needsFocus}
                onChange={(e) => setNeedsFocus(e.target.value)}
                placeholder="e.g., Weak foot, Communication"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              />
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowNoteForm(false)}
                className="border-zinc-700 text-zinc-300"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmitNote}
                disabled={!noteContent.trim()}
                className="bg-emerald-600 hover:bg-emerald-500 text-white"
              >
                Save Note
              </Button>
            </div>
          </div>
        )}

        {/* Existing Notes */}
        <div className="space-y-3">
          {coachNotes.length === 0 ? (
            <p className="text-sm text-zinc-500">No notes yet. Add your first observation above.</p>
          ) : (
            [...coachNotes].reverse().map((note) => (
              <div key={note.id} className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-zinc-500">{note.date}</span>
                  <div className="flex items-center gap-3 text-xs text-zinc-500">
                    <span>Attitude: {"★".repeat(note.attitude)}</span>
                    <span>Effort: {"★".repeat(note.effort)}</span>
                  </div>
                </div>
                <p className="text-sm text-zinc-300">{note.content}</p>
                {(note.areasImproving.length > 0 || note.areasNeedingFocus.length > 0) && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {note.areasImproving.map((a) => (
                      <Badge key={a} variant="outline" className="border-emerald-500/30 text-emerald-400 text-xs">
                        +{a}
                      </Badge>
                    ))}
                    {note.areasNeedingFocus.map((a) => (
                      <Badge key={a} variant="outline" className="border-amber-500/30 text-amber-400 text-xs">
                        !{a}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}
