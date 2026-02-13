import {
  GitBranch,
  Database,
  Brain,
  Search,
  Zap,
  Layers,
  Clock,
  Network,
} from "lucide-react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardPanel from "@/components/dashboard/DashboardPanel";
import KnowledgeGraph from "@/components/dashboard/KnowledgeGraph";
import HybridSearch from "@/components/dashboard/HybridSearch";
import ReasoningPanel from "@/components/dashboard/ReasoningPanel";
import QueryEditor from "@/components/dashboard/QueryEditor";
import MetricCard from "@/components/dashboard/MetricCard";
import ActivityFeed from "@/components/dashboard/ActivityFeed";

const Index = () => {
  return (
    <div className="min-h-screen bg-background dot-pattern">
      <div className="min-h-screen bg-background/95">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <DashboardHeader />

          {/* Metrics Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
            <MetricCard
              title="Total Triples"
              value={9363}
              subtitle="across 4 namespaces"
              icon={Database}
              trend={{ value: 12, label: "24h" }}
              color="cyan"
              delay={1}
            />
            <MetricCard
              title="Inferred Facts"
              value={2081}
              subtitle="via reasoning engine"
              icon={Brain}
              trend={{ value: 8, label: "24h" }}
              color="violet"
              delay={2}
            />
            <MetricCard
              title="Queries / min"
              value={24.7}
              subtitle="avg latency 23ms"
              icon={Zap}
              color="teal"
              delay={3}
            />
            <MetricCard
              title="Ontologies"
              value={5}
              subtitle="Schema, PROV, Memory, SKOS, FOAF"
              icon={Layers}
              color="amber"
              delay={4}
            />
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-4">
            {/* Knowledge Graph - Main area */}
            <DashboardPanel
              title="Knowledge Graph — Reasoning Visualization"
              className="lg:col-span-8 min-h-[420px]"
              delay={5}
              noPadding
            >
              <div className="h-[400px] sm:h-[440px]">
                <KnowledgeGraph />
              </div>
            </DashboardPanel>

            {/* Hybrid Search */}
            <DashboardPanel
              title="Hybrid Search"
              className="lg:col-span-4 min-h-[420px]"
              delay={6}
            >
              <HybridSearch />
            </DashboardPanel>

            {/* Reasoning Panel */}
            <DashboardPanel className="lg:col-span-4" delay={7}>
              <ReasoningPanel />
            </DashboardPanel>

            {/* SPARQL Console */}
            <DashboardPanel className="lg:col-span-5 min-h-[300px]" delay={8}>
              <QueryEditor />
            </DashboardPanel>

            {/* Activity Feed */}
            <DashboardPanel
              title="Activity Feed"
              className="lg:col-span-3"
              delay={9}
            >
              <ActivityFeed />
            </DashboardPanel>
          </div>

          {/* Footer */}
          <div className="mt-6 pb-4 flex items-center justify-between text-[10px] font-mono text-muted-foreground/50">
            <span>Synapse Engine v0.5.5 · MIT License</span>
            <span>Neuro-symbolic Memory Layer for Agentic AI</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
