import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Copy, Terminal, ChevronDown } from "lucide-react";

const SAMPLE_QUERY = `SELECT ?subject ?predicate ?object
WHERE {
  ?subject ?predicate ?object .
  FILTER(CONTAINS(STR(?subject), "Pelayo"))
}
LIMIT 20`;

const MOCK_RESULTS = [
  { subject: "syn:Pelayo", predicate: "syn:expertIn", object: "syn:NeuroSymbolicAI" },
  { subject: "syn:Pelayo", predicate: "syn:created", object: "syn:SynapseEngine" },
  { subject: "syn:Pelayo", predicate: "schema:name", object: '"Pelayo Maojo"' },
  { subject: "syn:Pelayo", predicate: "foaf:knows", object: "syn:OpenClawTeam" },
];

const QueryEditor = () => {
  const [query, setQuery] = useState(SAMPLE_QUERY);
  const [results, setResults] = useState<typeof MOCK_RESULTS | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const runQuery = () => {
    setIsRunning(true);
    setTimeout(() => {
      setResults(MOCK_RESULTS);
      setIsRunning(false);
    }, 600);
  };

  return (
    <div className="flex flex-col h-full gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-primary" />
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            SPARQL Console
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => navigator.clipboard.writeText(query)}
            className="p-1.5 rounded-md border border-border hover:border-primary/30 transition-all"
          >
            <Copy className="w-3 h-3 text-muted-foreground" />
          </button>
          <button
            onClick={runQuery}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-[10px] font-mono uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 rounded-md hover:bg-primary/20 transition-all disabled:opacity-50"
          >
            <Play className="w-3 h-3" />
            {isRunning ? "Running..." : "Execute"}
          </button>
        </div>
      </div>

      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-shrink-0 bg-muted/30 border border-border rounded-md p-3 font-mono text-xs text-foreground resize-none focus:outline-none focus:border-primary/30 focus:ring-1 focus:ring-primary/10 transition-all leading-relaxed"
        rows={5}
        spellCheck={false}
      />

      {results && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 overflow-auto min-h-0"
        >
          <div className="text-[10px] font-mono text-muted-foreground mb-2">
            {results.length} results · 0.023s
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[11px] font-mono">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-1.5 px-2 text-muted-foreground font-medium">
                    ?subject
                  </th>
                  <th className="text-left py-1.5 px-2 text-muted-foreground font-medium">
                    ?predicate
                  </th>
                  <th className="text-left py-1.5 px-2 text-muted-foreground font-medium">
                    ?object
                  </th>
                </tr>
              </thead>
              <tbody>
                {results.map((row, i) => (
                  <motion.tr
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="border-b border-border/50 hover:bg-muted/20"
                  >
                    <td className="py-1.5 px-2 text-primary">{row.subject}</td>
                    <td className="py-1.5 px-2 text-secondary">{row.predicate}</td>
                    <td className="py-1.5 px-2 text-foreground">{row.object}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default QueryEditor;
