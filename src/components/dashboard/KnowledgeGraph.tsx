import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

interface GraphNode {
  id: string;
  label: string;
  x: number;
  y: number;
  type: "entity" | "concept" | "relation" | "ontology";
  namespace?: string;
}

interface GraphEdge {
  source: string;
  target: string;
  label: string;
  strength: number;
}

const NODE_COLORS: Record<string, string> = {
  entity: "hsl(187, 100%, 50%)",
  concept: "hsl(262, 100%, 65%)",
  relation: "hsl(168, 100%, 37%)",
  ontology: "hsl(38, 92%, 50%)",
};

const MOCK_NODES: GraphNode[] = [
  { id: "1", label: "Pelayo", x: 400, y: 200, type: "entity", namespace: "work" },
  { id: "2", label: "Neuro-symbolic AI", x: 250, y: 120, type: "concept" },
  { id: "3", label: "Knowledge Graph", x: 550, y: 130, type: "concept" },
  { id: "4", label: "Synapse Engine", x: 400, y: 350, type: "entity", namespace: "work" },
  { id: "5", label: "OWL-RL", x: 180, y: 280, type: "ontology" },
  { id: "6", label: "RDFS", x: 300, y: 380, type: "ontology" },
  { id: "7", label: "Vector RAG", x: 550, y: 300, type: "concept" },
  { id: "8", label: "MCP Protocol", x: 620, y: 220, type: "relation" },
  { id: "9", label: "Oxigraph", x: 500, y: 400, type: "entity" },
  { id: "10", label: "SPARQL", x: 150, y: 180, type: "relation" },
  { id: "11", label: "Embeddings", x: 650, y: 370, type: "concept" },
  { id: "12", label: "Schema.org", x: 100, y: 350, type: "ontology" },
];

const MOCK_EDGES: GraphEdge[] = [
  { source: "1", target: "2", label: "expertIn", strength: 0.9 },
  { source: "1", target: "4", label: "created", strength: 1.0 },
  { source: "4", target: "3", label: "implements", strength: 0.95 },
  { source: "4", target: "5", label: "uses", strength: 0.8 },
  { source: "4", target: "6", label: "uses", strength: 0.8 },
  { source: "4", target: "7", label: "combines", strength: 0.85 },
  { source: "4", target: "8", label: "supports", strength: 0.7 },
  { source: "4", target: "9", label: "poweredBy", strength: 0.9 },
  { source: "2", target: "3", label: "relatedTo", strength: 0.7 },
  { source: "7", target: "11", label: "uses", strength: 0.8 },
  { source: "5", target: "12", label: "extends", strength: 0.6 },
  { source: "10", target: "3", label: "queries", strength: 0.75 },
  { source: "6", target: "5", label: "subsetOf", strength: 0.5 },
];

const KnowledgeGraph = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState({ width: 780, height: 480 });

  useEffect(() => {
    const updateDimensions = () => {
      if (svgRef.current?.parentElement) {
        const { width, height } = svgRef.current.parentElement.getBoundingClientRect();
        setDimensions({ width: Math.max(400, width), height: Math.max(300, height - 10) });
      }
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const scaledNodes = MOCK_NODES.map((n) => ({
    ...n,
    x: (n.x / 780) * dimensions.width,
    y: (n.y / 480) * dimensions.height,
  }));

  const getNode = useCallback(
    (id: string) => scaledNodes.find((n) => n.id === id),
    [scaledNodes]
  );

  const isConnected = (nodeId: string) =>
    MOCK_EDGES.some(
      (e) =>
        (e.source === hoveredNode && e.target === nodeId) ||
        (e.target === hoveredNode && e.source === nodeId)
    );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative w-full h-full min-h-[300px]"
    >
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        className="overflow-visible"
      >
        <defs>
          {Object.entries(NODE_COLORS).map(([type, color]) => (
            <radialGradient key={type} id={`glow-${type}`}>
              <stop offset="0%" stopColor={color} stopOpacity="0.6" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </radialGradient>
          ))}
          <filter id="blur-glow">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>

        {/* Edges */}
        {MOCK_EDGES.map((edge, i) => {
          const source = getNode(edge.source);
          const target = getNode(edge.target);
          if (!source || !target) return null;
          const isHighlighted =
            hoveredNode === edge.source || hoveredNode === edge.target;
          return (
            <g key={i}>
              <line
                x1={source.x}
                y1={source.y}
                x2={target.x}
                y2={target.y}
                stroke={isHighlighted ? "hsl(187, 100%, 50%)" : "hsl(220, 20%, 18%)"}
                strokeWidth={isHighlighted ? 1.5 : 0.8}
                strokeDasharray={isHighlighted ? "none" : "4 4"}
                opacity={hoveredNode && !isHighlighted ? 0.15 : 0.6}
                className={isHighlighted ? "animate-edge-flow" : ""}
                style={{
                  transition: "all 0.3s ease",
                  strokeDasharray: isHighlighted ? "8 4" : "4 4",
                }}
              />
              {isHighlighted && (
                <text
                  x={(source.x + target.x) / 2}
                  y={(source.y + target.y) / 2 - 6}
                  textAnchor="middle"
                  fontSize="9"
                  fill="hsl(200, 20%, 70%)"
                  fontFamily="JetBrains Mono, monospace"
                >
                  {edge.label}
                </text>
              )}
            </g>
          );
        })}

        {/* Nodes */}
        {scaledNodes.map((node) => {
          const color = NODE_COLORS[node.type];
          const isHovered = hoveredNode === node.id;
          const isSelected = selectedNode === node.id;
          const connected = hoveredNode ? isConnected(node.id) : false;
          const dimmed = hoveredNode && !isHovered && !connected;
          const radius = isHovered || isSelected ? 8 : 5;

          return (
            <g
              key={node.id}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              onClick={() => setSelectedNode(isSelected ? null : node.id)}
              className="cursor-pointer"
              style={{ transition: "all 0.3s ease" }}
            >
              {/* Glow */}
              <circle
                cx={node.x}
                cy={node.y}
                r={isHovered ? 24 : 16}
                fill={`url(#glow-${node.type})`}
                opacity={dimmed ? 0.1 : 0.5}
              />
              {/* Core */}
              <circle
                cx={node.x}
                cy={node.y}
                r={radius}
                fill={color}
                opacity={dimmed ? 0.2 : 1}
                stroke={isSelected ? "white" : "none"}
                strokeWidth={isSelected ? 1.5 : 0}
              >
                {!dimmed && (
                  <animate
                    attributeName="r"
                    values={`${radius};${radius + 1.5};${radius}`}
                    dur="3s"
                    repeatCount="indefinite"
                  />
                )}
              </circle>
              {/* Label */}
              <text
                x={node.x}
                y={node.y + (isHovered ? -14 : 16)}
                textAnchor="middle"
                fontSize={isHovered ? "11" : "9"}
                fontWeight={isHovered ? "600" : "400"}
                fill={dimmed ? "hsl(200, 15%, 30%)" : "hsl(200, 20%, 80%)"}
                fontFamily="Inter, sans-serif"
                style={{ transition: "all 0.3s ease" }}
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="absolute bottom-2 left-2 flex gap-3 text-[10px] font-mono text-muted-foreground">
        {Object.entries(NODE_COLORS).map(([type, color]) => (
          <div key={type} className="flex items-center gap-1">
            <span
              className="inline-block w-2 h-2 rounded-full"
              style={{ backgroundColor: color }}
            />
            {type}
          </div>
        ))}
      </div>

      {/* Selected info */}
      {selectedNode && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-2 right-2 bg-card/90 backdrop-blur-md border border-border rounded-md p-3 text-xs font-mono max-w-[200px]"
        >
          <div className="text-primary font-semibold mb-1">
            {scaledNodes.find((n) => n.id === selectedNode)?.label}
          </div>
          <div className="text-muted-foreground">
            type: {scaledNodes.find((n) => n.id === selectedNode)?.type}
          </div>
          <div className="text-muted-foreground">
            edges:{" "}
            {MOCK_EDGES.filter(
              (e) => e.source === selectedNode || e.target === selectedNode
            ).length}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default KnowledgeGraph;
