import React from "react";
import { useCurrentFrame, interpolate, random } from "remotion";
import { COLORS } from "../config/theme";

interface Node {
  x: number;
  y: number;
  size: number;
  delay: number;
}

interface Edge {
  from: number;
  to: number;
  delay: number;
}

interface NetworkGraphProps {
  width?: number;
  height?: number;
  nodeCount?: number;
  startFrame?: number;
}

export const NetworkGraph: React.FC<NetworkGraphProps> = ({
  width = 500,
  height = 400,
  nodeCount = 12,
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - startFrame;

  // Generate deterministic nodes
  const nodes: Node[] = React.useMemo(() => {
    return Array.from({ length: nodeCount }, (_, i) => {
      const seed = `node-${i}`;
      const angle = (i / nodeCount) * Math.PI * 2 + random(seed) * 0.5;
      const radius = 120 + random(seed + "-r") * 60;

      return {
        x: width / 2 + Math.cos(angle) * radius,
        y: height / 2 + Math.sin(angle) * radius,
        size: 8 + random(seed + "-s") * 8,
        delay: i * 5,
      };
    });
  }, [nodeCount, width, height]);

  // Add center node
  const centerNode: Node = {
    x: width / 2,
    y: height / 2,
    size: 20,
    delay: 0,
  };

  const allNodes = [centerNode, ...nodes];

  // Generate edges (connect to center and some neighbors)
  const edges: Edge[] = React.useMemo(() => {
    const result: Edge[] = [];

    // Connect all to center
    for (let i = 1; i < allNodes.length; i++) {
      result.push({
        from: 0,
        to: i,
        delay: 20 + i * 3,
      });
    }

    // Some neighbor connections
    for (let i = 1; i < allNodes.length; i++) {
      if (random(`edge-${i}`) > 0.5) {
        const neighbor = ((i - 1 + 1) % (allNodes.length - 1)) + 1;
        result.push({
          from: i,
          to: neighbor,
          delay: 40 + i * 2,
        });
      }
    }

    return result;
  }, [allNodes.length]);

  // Data pulse animation
  const pulsePhase = (relativeFrame * 0.05) % (Math.PI * 2);

  return (
    <svg width={width} height={height}>
      {/* Background glow */}
      <defs>
        <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={COLORS.accentGreen} stopOpacity="0.3" />
          <stop offset="100%" stopColor={COLORS.accentGreen} stopOpacity="0" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <circle cx={width / 2} cy={height / 2} r={180} fill="url(#centerGlow)" />

      {/* Edges */}
      {edges.map((edge, i) => {
        const edgeOpacity = interpolate(
          relativeFrame - edge.delay,
          [0, 15],
          [0, 0.6],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        const fromNode = allNodes[edge.from];
        const toNode = allNodes[edge.to];

        // Data packet traveling along edge
        const packetProgress =
          ((relativeFrame * 0.02 + i * 0.3) % 1) * edgeOpacity;
        const packetX =
          fromNode.x + (toNode.x - fromNode.x) * packetProgress;
        const packetY =
          fromNode.y + (toNode.y - fromNode.y) * packetProgress;

        return (
          <g key={`edge-${i}`}>
            <line
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              stroke={COLORS.accentGreen}
              strokeWidth={1.5}
              opacity={edgeOpacity}
              filter="url(#glow)"
            />
            {/* Data packet */}
            {edgeOpacity > 0.3 && (
              <circle
                cx={packetX}
                cy={packetY}
                r={3}
                fill={COLORS.white}
                opacity={0.8}
              />
            )}
          </g>
        );
      })}

      {/* Nodes */}
      {allNodes.map((node, i) => {
        const nodeOpacity = interpolate(
          relativeFrame - node.delay,
          [0, 20],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        const nodeScale = interpolate(
          relativeFrame - node.delay,
          [0, 20],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        // Pulse effect for nodes
        const pulse = 1 + Math.sin(pulsePhase + i * 0.5) * 0.1;

        const isCenter = i === 0;
        const nodeColor = isCenter ? COLORS.accentGreen : COLORS.primaryLight;

        return (
          <g key={`node-${i}`}>
            {/* Outer glow */}
            <circle
              cx={node.x}
              cy={node.y}
              r={node.size * pulse * nodeScale * 1.5}
              fill={nodeColor}
              opacity={nodeOpacity * 0.3}
              filter="url(#glow)"
            />
            {/* Main node */}
            <circle
              cx={node.x}
              cy={node.y}
              r={node.size * nodeScale}
              fill={nodeColor}
              opacity={nodeOpacity}
              filter="url(#glow)"
            />
            {/* Inner highlight */}
            <circle
              cx={node.x - node.size * 0.2}
              cy={node.y - node.size * 0.2}
              r={node.size * nodeScale * 0.3}
              fill={COLORS.white}
              opacity={nodeOpacity * 0.5}
            />
          </g>
        );
      })}
    </svg>
  );
};
