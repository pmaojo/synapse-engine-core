import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: { value: number; label: string };
  color?: "cyan" | "teal" | "violet" | "amber";
  delay?: number;
}

const colorMap = {
  cyan: "text-primary border-primary/20",
  teal: "text-secondary border-secondary/20",
  violet: "text-accent border-accent/20",
  amber: "text-warning border-warning/20",
};

const glowMap = {
  cyan: "glow-primary-sm",
  teal: "",
  violet: "",
  amber: "",
};

const MetricCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  color = "cyan",
  delay = 0,
}: MetricCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.1, duration: 0.4 }}
      className={`bg-card border ${colorMap[color]} rounded-lg p-4 border-glow-hover transition-all duration-300`}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
          {title}
        </span>
        <div className={`p-1.5 rounded-md bg-muted ${glowMap[color]}`}>
          <Icon className={`w-3.5 h-3.5 ${colorMap[color].split(" ")[0]}`} />
        </div>
      </div>
      <div className={`text-2xl font-bold font-mono ${colorMap[color].split(" ")[0]}`}>
        {typeof value === "number" ? value.toLocaleString() : value}
      </div>
      <div className="flex items-center justify-between mt-1.5">
        {subtitle && (
          <span className="text-[10px] text-muted-foreground">{subtitle}</span>
        )}
        {trend && (
          <span
            className={`text-[10px] font-mono ${
              trend.value > 0 ? "text-success" : "text-destructive"
            }`}
          >
            {trend.value > 0 ? "+" : ""}
            {trend.value}% {trend.label}
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default MetricCard;
