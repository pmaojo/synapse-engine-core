import { motion } from "framer-motion";

interface StatusIndicatorProps {
  status: "online" | "degraded" | "offline";
  label?: string;
}

const statusConfig = {
  online: { color: "bg-success", text: "text-success", label: "Online" },
  degraded: { color: "bg-warning", text: "text-warning", label: "Degraded" },
  offline: { color: "bg-destructive", text: "text-destructive", label: "Offline" },
};

const StatusIndicator = ({ status, label }: StatusIndicatorProps) => {
  const config = statusConfig[status];
  return (
    <div className="flex items-center gap-2">
      <span className="relative flex h-2 w-2">
        <motion.span
          animate={{ scale: [1, 1.5, 1], opacity: [0.7, 0, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
          className={`absolute inline-flex h-full w-full rounded-full ${config.color} opacity-75`}
        />
        <span className={`relative inline-flex rounded-full h-2 w-2 ${config.color}`} />
      </span>
      <span className={`text-[10px] font-mono uppercase tracking-wider ${config.text}`}>
        {label || config.label}
      </span>
    </div>
  );
};

export default StatusIndicator;
