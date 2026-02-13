import { motion } from "framer-motion";
import { Brain, Wifi } from "lucide-react";
import StatusIndicator from "./StatusIndicator";
import NamespaceSelector from "./NamespaceSelector";

const DashboardHeader = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-border"
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center glow-primary-sm">
            <Brain className="w-5 h-5 text-primary" />
          </div>
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-tight">
            <span className="text-gradient-primary">Synapse</span>
            <span className="text-muted-foreground font-light ml-1.5">Engine</span>
          </h1>
          <div className="flex items-center gap-3 mt-0.5">
            <span className="text-[10px] font-mono text-muted-foreground">v0.5.5</span>
            <StatusIndicator status="online" />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <NamespaceSelector />
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-border bg-muted/30 text-[10px] font-mono text-muted-foreground">
          <Wifi className="w-3 h-3 text-success" />
          MCP Connected
        </div>
      </div>
    </motion.header>
  );
};

export default DashboardHeader;
