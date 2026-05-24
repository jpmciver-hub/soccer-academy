"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { drills, drillCategories } from "@/data/drills";
import { DrillCategory, DifficultyLevel, Position } from "@/types";
import {
  Search,
  Clock,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Filter,
} from "lucide-react";

export function DrillLibraryPage() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<DrillCategory | "all">("all");
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyLevel | "all">("all");
  const [positionFilter, setPositionFilter] = useState<Position | "all">("all");
  const [expandedDrill, setExpandedDrill] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return drills.filter((drill) => {
      if (search && !drill.name.toLowerCase().includes(search.toLowerCase()) &&
          !drill.description.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }
      if (categoryFilter !== "all" && drill.category !== categoryFilter) return false;
      if (difficultyFilter !== "all" && drill.difficulty !== difficultyFilter) return false;
      if (positionFilter !== "all" && !drill.positionRelevance.includes(positionFilter)) return false;
      return true;
    });
  }, [search, categoryFilter, difficultyFilter, positionFilter]);

  const difficultyColors: Record<string, string> = {
    beginner: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    intermediate: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    advanced: "text-red-400 bg-red-400/10 border-red-400/20",
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white">Drill Library</h1>
        <p className="text-zinc-400 mt-1">{drills.length} drills across {drillCategories.length} categories</p>
      </div>

      {/* Search & Filter */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search drills..."
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
          />
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white"
        >
          <Filter className="h-4 w-4" />
          Filters
          {showFilters ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
        </button>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pb-2">
                <div>
                  <label className="text-xs text-zinc-500 font-medium block mb-1.5">Category</label>
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value as DrillCategory | "all")}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  >
                    <option value="all">All Categories</option>
                    {drillCategories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.icon} {cat.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-zinc-500 font-medium block mb-1.5">Difficulty</label>
                  <select
                    value={difficultyFilter}
                    onChange={(e) => setDifficultyFilter(e.target.value as DifficultyLevel | "all")}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  >
                    <option value="all">All Levels</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-zinc-500 font-medium block mb-1.5">Position</label>
                  <select
                    value={positionFilter}
                    onChange={(e) => setPositionFilter(e.target.value as Position | "all")}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  >
                    <option value="all">All Positions</option>
                    <option value="CB">Centre Back</option>
                    <option value="RB">Right Back</option>
                    <option value="RWB">Right Wing Back</option>
                    <option value="CDM">CDM</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Results count */}
      <p className="text-sm text-zinc-500">{filtered.length} drills found</p>

      {/* Drill Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filtered.map((drill) => {
          const isExpanded = expandedDrill === drill.id;
          const catInfo = drillCategories.find((c) => c.value === drill.category);

          return (
            <Card
              key={drill.id}
              className="bg-zinc-900 border-zinc-800 overflow-hidden"
            >
              <button
                onClick={() => setExpandedDrill(isExpanded ? null : drill.id)}
                className="w-full text-left p-4 hover:bg-zinc-800/30 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span>{catInfo?.icon}</span>
                    <h3 className="font-semibold text-white">{drill.name}</h3>
                  </div>
                  <Badge className={`text-xs ${difficultyColors[drill.difficulty]}`}>
                    {drill.difficulty}
                  </Badge>
                </div>
                <p className="text-sm text-zinc-400 mt-2 line-clamp-2">{drill.description}</p>
                <div className="flex items-center gap-3 mt-3 text-xs text-zinc-500">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {drill.estimatedMinutes} min
                  </span>
                  {drill.touchCount && <span>{drill.touchCount} touches</span>}
                  <span>{catInfo?.label}</span>
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
                    <div className="px-4 pb-4 space-y-4 border-t border-zinc-800 pt-4">
                      {drill.coachingPoints.length > 0 && (
                        <div>
                          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Coaching Points</p>
                          <ul className="space-y-1.5">
                            {drill.coachingPoints.map((point, i) => (
                              <li key={i} className="text-sm text-zinc-400 flex items-start gap-2">
                                <span className="text-emerald-400 mt-1">&#8226;</span>
                                {point}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {drill.equipment.length > 0 && (
                        <div>
                          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Equipment</p>
                          <div className="flex flex-wrap gap-1.5">
                            {drill.equipment.map((item) => (
                              <Badge key={item} variant="outline" className="border-zinc-700 text-zinc-400 text-xs">
                                {item}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      <div>
                        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Position Relevance</p>
                        <div className="flex gap-1.5">
                          {drill.positionRelevance.map((pos) => (
                            <Badge key={pos} variant="outline" className="border-emerald-500/30 text-emerald-400 text-xs">
                              {pos}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {drill.videoUrl && (
                        <a
                          href={drill.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm text-emerald-400 hover:text-emerald-300 font-medium"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          Watch Demo Video
                        </a>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-zinc-500">No drills match your filters. Try adjusting your search.</p>
        </div>
      )}
    </div>
  );
}
