// IoT devices sending traffic to an on-site edge node, which forwards a trickle to the cloud.
const DEVICES = [
  [40, 40],
  [30, 110],
  [60, 170],
  [150, 30],
  [150, 180]
];
const EDGE = [230, 105];
const CLOUD = [360, 105];

export function EdgeViz() {
  return (
    <svg viewBox="0 0 400 210" className="w-full" role="img" aria-label="Illustration of IoT devices connected to an edge node">
      <defs>
        <radialGradient id="edgeGlow">
          <stop offset="0" stopColor="#7C5CFF" stopOpacity="0.6" />
          <stop offset="1" stopColor="#7C5CFF" stopOpacity="0" />
        </radialGradient>
      </defs>
      {DEVICES.map(([x, y], i) => (
        <g key={i}>
          <line x1={x} y1={y} x2={EDGE[0]} y2={EDGE[1]} stroke="rgba(198,181,255,0.18)" />
          <line
            x1={x}
            y1={y}
            x2={EDGE[0]}
            y2={EDGE[1]}
            stroke="#C6B5FF"
            className="flow"
            style={{ animationDelay: `${i * -0.3}s` }}
          />
          <circle cx={x} cy={y} r="7" fill="#141024" stroke="#C6B5FF" strokeOpacity="0.6" />
          <circle cx={x} cy={y} r="2.5" fill="#C6B5FF" />
        </g>
      ))}
      <line x1={EDGE[0]} y1={EDGE[1]} x2={CLOUD[0]} y2={CLOUD[1]} stroke="rgba(255,111,216,0.2)" />
      <line x1={EDGE[0]} y1={EDGE[1]} x2={CLOUD[0]} y2={CLOUD[1]} stroke="#FF6FD8" strokeWidth="1.2" className="flow" style={{ animationDuration: "3s" }} />
      <circle cx={EDGE[0]} cy={EDGE[1]} r="46" fill="url(#edgeGlow)" />
      <rect x={EDGE[0] - 22} y={EDGE[1] - 22} width="44" height="44" rx="12" fill="#1E1836" stroke="#7C5CFF" />
      <text x={EDGE[0]} y={EDGE[1] + 4} fill="#EEEAF7" fontSize="10" textAnchor="middle" fontFamily="var(--font-mono)">
        edge
      </text>
      <text x={CLOUD[0]} y={CLOUD[1] + 4} fill="#A7A1BC" fontSize="10" textAnchor="middle" fontFamily="var(--font-mono)">
        cloud
      </text>
      <circle cx={CLOUD[0]} cy={CLOUD[1]} r="20" fill="none" stroke="rgba(255,255,255,0.15)" strokeDasharray="2 3" />
    </svg>
  );
}
