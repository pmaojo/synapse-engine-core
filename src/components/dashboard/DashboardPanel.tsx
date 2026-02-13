import { motion } from "framer-motion";
import { ReactNode } from "react";

interface DashboardPanelProps {
  title?: string;
  children: ReactNode;
  className?: string;
  delay?: number;
  noPadding?: boolean;
}

const DashboardPanel = ({
  title,
  children,
  className = "",
  delay = 0,
  noPadding = false,
}: DashboardPanelProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.1, duration: 0.4 }}
      className={`bg-card border border-border rounded-lg overflow-hidden border-glow-hover transition-all duration-300 ${className}`}
    >
      {title && (
        <div className="px-4 py-2.5 border-b border-border">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            {title}
          </span>
        </div>
      )}
      <div className={noPadding ? "" : "p-4"}>{children}</div>
    </motion.div>
  );
};

export default DashboardPanel;
