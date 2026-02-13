import { useState } from "react";
import { motion } from "framer-motion";
import { Brain, Cpu, Play, RotateCcw, CheckCircle2, AlertTriangle, Sparkles } from "lucide-react";

interface ReasoningStrategy {
  id: string;
  name: string;
  description: string;
  status: "idle" | "running" | "complete" | "warning";
  factsInferred: number;
  lastRun?: string;
}

const STRATEGIES: ReasoningStrategy[] = [
  {
    id: "rdfs",
    name: "RDFS",
    description: "Class & property transitivity",
    status: "complete",
    factsInferred: 1247,
    lastRun: "2m ago",
  },
  {
    id: "owl-rl",
    name: "OWL-RL",
    description: "Symmetric, transitive & inverse properties",
    status: "complete",
    factsInferred: 834,
    lastRun: "2m ago",
  },
  {
    id: "materialization",
    name: "Materialization",
    description: "Persist inferred facts to graph",
    status: "idle",
    factsInferred: 0,
  },
];

const statusConfig = {
  idle: { icon: Cpu, color: "text-muted-foreground", bg: "bg-muted/50" },
  running: { icon: RotateCcw, color: "text-primary", bg: "bg-primary/10" },
  complete: { icon: CheckCircle2, color: "text-success", bg: "bg-success/10" },
  warning: { icon: AlertTriangle, color: "text-warning", bg: "bg-warning/10" },
};

const ReasoningPanel = () => {
  const [strategies, setStrategies] = useState(STRATEGIES);

  const runStrategy = (id: string) => {
    setStrategies((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: "running" as const } : s))
    );
    setTimeout(() => {
      setStrategies((prev) =>
        prev.map((s) =>
          s.id === id
            ? {
                ...s,
                status: "complete" as const,
                factsInferred: s.factsInferred + Math.floor(Math.random() * 200) + 50,
                lastRun: "just now",
              }
            : s
        )
      );
    }, 2000);
  };

  const runAll = () => {
    strategies.forEach((s, i) => {
      setTimeout(() => runStrategy(s.id), i * 700);
    });
  };

  return (
    <div className="flex flex-col h-full gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain className="w-4 h-4 text-accent" />
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Reasoning Engine
          </span>
        </div>
        <button
          onClick={runAll}
          className="flex items-center gap-1.5 px-2.5 py-1.5 text-[10px] font-mono uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 rounded-md hover:bg-primary/20 transition-all"
        >
          <Sparkles className="w-3 h-3" />
          Run All
        </button>
      </div>

      <div className="space-y-2 flex-1">
        {strategies.map((strategy, i) => {
          const StatusIcon = statusConfig[strategy.status].icon;
          return (
            <motion.div
              key={strategy.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-muted/30 border border-border rounded-md p-3 hover:border-primary/15 transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div
                    className={`p-1 rounded ${statusConfig[strategy.status].bg}`}
                  >
                    <StatusIcon
                      className={`w-3 h-3 ${statusConfig[strategy.status].color} ${
                        strategy.status === "running" ? "animate-spin" : ""
                      }`}
                    />
                  </div>
                  <div>
                    <span className="text-xs font-bold font-mono text-foreground">
                      {strategy.name}
                    </span>
                    <p className="text-[10px] text-muted-foreground">
                      {strategy.description}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => runStrategy(strategy.id)}
                  disabled={strategy.status === "running"}
                  className="p-1.5 rounded-md border border-border hover:border-primary/30 hover:bg-primary/5 transition-all disabled:opacity-30"
                >
                  <Play className="w-3 h-3 text-muted-foreground" />
                </button>
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground">
                <span>
                  Facts inferred:{" "}
                  <span className="text-primary">{strategy.factsInferred.toLocaleString()}</span>
                </span>
                {strategy.lastRun && <span>{strategy.lastRun}</span>}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ReasoningPanel;
