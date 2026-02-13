import { useState } from "react";
import { Database, ChevronDown } from "lucide-react";

const NAMESPACES = [
  { id: "work", label: "work", triples: 2847, color: "bg-primary" },
  { id: "personal", label: "personal", triples: 1523, color: "bg-accent" },
  { id: "default", label: "default", triples: 4102, color: "bg-secondary" },
  { id: "research", label: "research", triples: 891, color: "bg-warning" },
];

const NamespaceSelector = () => {
  const [selected, setSelected] = useState("work");
  const [open, setOpen] = useState(false);

  const current = NAMESPACES.find((n) => n.id === selected)!;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-border bg-muted/30 hover:border-primary/30 transition-all text-xs font-mono"
      >
        <Database className="w-3 h-3 text-muted-foreground" />
        <span className={`w-1.5 h-1.5 rounded-full ${current.color}`} />
        <span className="text-foreground">{current.label}</span>
        <ChevronDown className="w-3 h-3 text-muted-foreground" />
      </button>

      {open && (
        <div className="absolute top-full mt-1 left-0 z-50 bg-card border border-border rounded-md shadow-lg min-w-[180px] py-1">
          {NAMESPACES.map((ns) => (
            <button
              key={ns.id}
              onClick={() => {
                setSelected(ns.id);
                setOpen(false);
              }}
              className={`w-full flex items-center justify-between gap-2 px-3 py-2 text-xs font-mono hover:bg-muted/50 transition-colors ${
                ns.id === selected ? "text-primary" : "text-foreground"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full ${ns.color}`} />
                {ns.label}
              </div>
              <span className="text-[10px] text-muted-foreground">
                {ns.triples.toLocaleString()}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default NamespaceSelector;
