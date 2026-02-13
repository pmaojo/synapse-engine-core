import { motion } from "framer-motion";
import { GitBranch, Layers, Brain, Database, Upload, Search } from "lucide-react";

interface ActivityItem {
  id: string;
  action: string;
  detail: string;
  time: string;
  type: "ingest" | "query" | "reason" | "search" | "system";
}

const ACTIVITIES: ActivityItem[] = [
  { id: "1", action: "Triple ingested", detail: "Pelayo → expertIn → NeuroSymbolicAI", time: "12s ago", type: "ingest" },
  { id: "2", action: "Hybrid search", detail: '"knowledge graph reasoning"', time: "34s ago", type: "search" },
  { id: "3", action: "OWL-RL inference", detail: "183 new facts materialized", time: "1m ago", type: "reason" },
  { id: "4", action: "SPARQL query", detail: "SELECT ?s WHERE { ?s rdf:type schema:Person }", time: "2m ago", type: "query" },
  { id: "5", action: "Namespace created", detail: "research", time: "5m ago", type: "system" },
  { id: "6", action: "URL ingested", detail: "https://arxiv.org/abs/2401.xxxx", time: "8m ago", type: "ingest" },
];

const typeConfig = {
  ingest: { icon: Upload, color: "text-secondary" },
  query: { icon: Database, color: "text-primary" },
  reason: { icon: Brain, color: "text-accent" },
  search: { icon: Search, color: "text-primary" },
  system: { icon: GitBranch, color: "text-warning" },
};

const ActivityFeed = () => {
  return (
    <div className="space-y-1">
      {ACTIVITIES.map((item, i) => {
        const Icon = typeConfig[item.type].icon;
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
            className="flex items-start gap-2.5 py-2 px-2 rounded hover:bg-muted/20 transition-colors group"
          >
            <Icon className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${typeConfig[item.type].color}`} />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-medium text-foreground">
                  {item.action}
                </span>
                <span className="text-[9px] font-mono text-muted-foreground shrink-0">
                  {item.time}
                </span>
              </div>
              <p className="text-[10px] text-muted-foreground font-mono truncate">
                {item.detail}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ActivityFeed;
