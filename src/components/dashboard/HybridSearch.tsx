import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Zap, GitBranch, Layers, Clock } from "lucide-react";

interface SearchResult {
  id: string;
  label: string;
  type: string;
  score: number;
  source: "vector" | "graph" | "hybrid";
  namespace: string;
  snippet: string;
}

const MOCK_RESULTS: SearchResult[] = [
  {
    id: "1",
    label: "Pelayo → expertIn → Neuro-symbolic AI",
    type: "triple",
    score: 0.95,
    source: "hybrid",
    namespace: "work",
    snippet: "Direct knowledge graph match with high semantic similarity",
  },
  {
    id: "2",
    label: "Synapse Engine architecture notes",
    type: "document",
    score: 0.89,
    source: "vector",
    namespace: "work",
    snippet: "Neuro-symbolic approach combining vector embeddings with formal ontology reasoning...",
  },
  {
    id: "3",
    label: "OWL-RL → implements → TransitiveProperty",
    type: "triple",
    score: 0.82,
    source: "graph",
    namespace: "default",
    snippet: "Inferred via RDFS transitivity chain through reasoning engine",
  },
  {
    id: "4",
    label: "Knowledge representation survey",
    type: "document",
    score: 0.76,
    source: "vector",
    namespace: "research",
    snippet: "Comparative analysis of symbolic vs. connectionist memory systems...",
  },
];

const sourceIcon = {
  vector: Layers,
  graph: GitBranch,
  hybrid: Zap,
};

const sourceColor = {
  vector: "text-accent",
  graph: "text-secondary",
  hybrid: "text-primary",
};

const HybridSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsSearching(true);
    setHasSearched(true);
    setTimeout(() => {
      setResults(MOCK_RESULTS);
      setIsSearching(false);
    }, 800);
  };

  return (
    <div className="flex flex-col h-full">
      <form onSubmit={handleSearch} className="relative mb-3">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Hybrid semantic search..."
          className="w-full bg-muted/50 border border-border rounded-md py-2.5 pl-10 pr-4 text-sm font-mono text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-all"
        />
        {query && (
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded border border-border">
            ↵
          </kbd>
        )}
      </form>

      <div className="flex gap-2 mb-3 text-[10px] font-mono">
        {["all", "vector", "graph", "hybrid"].map((filter) => (
          <button
            key={filter}
            className="px-2 py-1 rounded border border-border bg-muted/30 text-muted-foreground hover:border-primary/30 hover:text-foreground transition-all uppercase tracking-wider"
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 min-h-0">
        <AnimatePresence mode="wait">
          {isSearching ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-8 gap-3"
            >
              <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
              <span className="text-xs text-muted-foreground font-mono">
                Searching across vector + graph...
              </span>
            </motion.div>
          ) : results.length > 0 ? (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-2"
            >
              {results.map((result, i) => {
                const SourceIcon = sourceIcon[result.source];
                return (
                  <motion.div
                    key={result.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="bg-muted/30 border border-border rounded-md p-3 hover:border-primary/20 transition-all cursor-pointer group"
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2 min-w-0">
                        <SourceIcon
                          className={`w-3.5 h-3.5 shrink-0 ${sourceColor[result.source]}`}
                        />
                        <span className="text-xs font-medium text-foreground truncate">
                          {result.label}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-primary shrink-0">
                        {(result.score * 100).toFixed(0)}%
                      </span>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed ml-5">
                      {result.snippet}
                    </p>
                    <div className="flex items-center gap-2 mt-2 ml-5">
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-muted text-muted-foreground border border-border">
                        {result.namespace}
                      </span>
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-muted text-muted-foreground border border-border">
                        {result.type}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : hasSearched ? (
            <div className="text-center py-8 text-xs text-muted-foreground font-mono">
              No results found
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 gap-2 text-muted-foreground/40">
              <Search className="w-8 h-8" />
              <span className="text-xs font-mono">Enter a query to search</span>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HybridSearch;
