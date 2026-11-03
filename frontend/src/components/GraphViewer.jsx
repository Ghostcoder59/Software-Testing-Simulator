import React from 'react';

export default function GraphViewer({ graphData, title }) {
  if (!graphData || !graphData.nodes || graphData.nodes.length === 0) {
    return (
      <div className="cfg-canvas-wrapper" style={{ minHeight: '260px', color: 'var(--text-muted)' }}>
        No graph structure available to display.
      </div>
    );
  }

  // Calculate bounding box for SVG
  const xs = graphData.nodes.map((n) => n.x);
  const ys = graphData.nodes.map((n) => n.y);
  const minX = Math.min(...xs, 40) - 40;
  const maxX = Math.max(...xs, 360) + 40;
  const minY = Math.min(...ys, 40) - 30;
  const maxY = Math.max(...ys, 300) + 40;
  const width = Math.max(380, maxX - minX);
  const height = Math.max(300, maxY - minY);

  const nodeMap = {};
  graphData.nodes.forEach((n) => {
    nodeMap[n.id] = n;
  });

  return (
    <div className="cfg-canvas-wrapper">
      <svg
        viewBox={`${minX} ${minY} ${width} ${height}`}
        className="cfg-svg"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Arrowhead marker - Monochrome black */}
          <marker
            id="arrowhead"
            markerWidth="8"
            markerHeight="6"
            refX="7"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 8 3, 0 6" fill="#09090b" />
          </marker>
        </defs>

        {/* Directed Edges */}
        {graphData.edges.map((edge, idx) => {
          const source = nodeMap[edge.source];
          const target = nodeMap[edge.target];
          if (!source || !target) return null;

          // Shorten vector slightly so marker doesn't overlap node circle
          const dx = target.x - source.x;
          const dy = target.y - source.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const radius = 22;

          let sx = source.x;
          let sy = source.y;
          let tx = target.x;
          let ty = target.y;

          if (dist > radius * 2) {
            sx = source.x + (dx / dist) * radius;
            sy = source.y + (dy / dist) * radius;
            tx = target.x - (dx / dist) * radius;
            ty = target.y - (dy / dist) * radius;
          }

          // Compute midpoint for label
          const midX = (sx + tx) / 2;
          const midY = (sy + ty) / 2;

          // If loopback or self-edge
          const isCurve = dx === 0 && Math.abs(dy) > 100;
          let pathD = `M ${sx} ${sy} L ${tx} ${ty}`;
          if (isCurve) {
            const curveOffset = dy > 0 ? 40 : -40;
            pathD = `M ${sx} ${sy} Q ${sx + curveOffset} ${(sy + ty) / 2} ${tx} ${ty}`;
          }

          return (
            <g key={`edge-${idx}`}>
              <path
                d={pathD}
                stroke="#09090b"
                strokeWidth="1.75"
                fill="none"
                markerEnd="url(#arrowhead)"
              />
              {edge.label && (
                <text
                  x={midX + (isCurve ? 22 : 8)}
                  y={midY - 4}
                  fill="#52525b"
                  fontSize="10"
                  fontFamily="var(--font-mono)"
                  fontWeight="600"
                >
                  {edge.label}
                </text>
              )}
            </g>
          );
        })}

        {/* Graph Nodes */}
        {graphData.nodes.map((node) => {
          const isDecision = node.type === 'decision';
          const isStart = node.type === 'start';
          const isEnd = node.type === 'end';

          return (
            <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
              {isDecision ? (
                // Decision node: Diamond shape
                <polygon
                  points="0,-20 20,0 0,20 -20,0"
                  fill="#ffffff"
                  stroke="#09090b"
                  strokeWidth="2"
                />
              ) : (
                // Statement / Start / End: Circle
                <circle
                  r="19"
                  fill={isStart || isEnd ? '#09090b' : '#ffffff'}
                  stroke="#09090b"
                  strokeWidth="2"
                />
              )}

              {/* Node ID / Label */}
              <text
                textAnchor="middle"
                dy=".35em"
                fill={isStart || isEnd ? '#ffffff' : '#09090b'}
                fontSize="11"
                fontWeight="700"
                fontFamily="var(--font-mono)"
              >
                {node.id}
              </text>

              {/* External descriptive caption */}
              {node.label && (
                <text
                  x="24"
                  y="4"
                  fill="#09090b"
                  fontSize="10"
                  fontFamily="var(--font-mono)"
                  fontWeight="500"
                >
                  {node.label}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

