"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import type { SectionId } from "@/content/cv";
import { corpusById, index, sectionLabel } from "@/lib/corpus";
import { embed } from "@/lib/embedding";
import { Heading, prefersReducedMotion, revealEntry, ScrollTrigger } from "@/components/motion/engine";

const COLORS: Record<SectionId, string> = {
  education: "#7CF2C8",
  publications: "#FFD27A",
  research: "#7C5CFF",
  industry: "#FF6FD8",
  teaching: "#9BE7FF",
  projects: "#C6B5FF",
  awards: "#FFB38A",
  skills: "#A7A1BC",
  service: "#F9A8D4"
};
const RADIUS = 4;
const MAX_LABELS = 6;

const vertex = /* glsl */ `
  attribute float aSize;
  attribute float aLit;
  attribute vec3 aColor;
  uniform float uPixelRatio;
  uniform float uTime;
  varying vec3 vColor;
  varying float vLit;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    float pulse = 1.0 + aLit * 0.25 * sin(uTime * 3.0 + position.x * 4.0);
    gl_PointSize = aSize * (1.0 + aLit * 1.2) * pulse * uPixelRatio * (9.0 / -mv.z);
    vColor = mix(aColor, vec3(1.0, 0.82, 0.48), aLit * 0.6);
    vLit = aLit;
  }
`;
const fragment = /* glsl */ `
  varying vec3 vColor;
  varying float vLit;
  uniform float uDim;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float core = smoothstep(0.18, 0.0, d);
    float halo = smoothstep(0.5, 0.0, d) * 0.55;
    float a = (core + halo) * mix(uDim, 1.0, vLit);
    if (a < 0.01) discard;
    gl_FragColor = vec4(vColor * (0.8 + core), a);
  }
`;

export function Universe() {
  const points = useMemo(() => embed(), []);
  const mount = useRef<HTMLDivElement>(null);
  const labels = useRef<(HTMLDivElement | null)[]>([]);
  const tooltip = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [hover, setHover] = useState<string | null>(null);

  const hits = useMemo(() => (query.trim() ? index.search(query).hits.slice(0, MAX_LABELS) : []), [query]);
  const lit = useRef<Map<string, number>>(new Map());
  lit.current = new Map(hits.map((h) => [h.id, h.score]));

  useEffect(() => {
    const el = mount.current!;
    const reduced = prefersReducedMotion();
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.set(0, 0.6, 9);
    camera.lookAt(0, 0, 0);

    const group = new THREE.Group();
    scene.add(group);

    // Entry points
    const n = points.length;
    const pos = new Float32Array(n * 3);
    const col = new Float32Array(n * 3);
    const size = new Float32Array(n);
    const litAttr = new Float32Array(n);
    points.forEach((p, i) => {
      pos.set([p.x * RADIUS, p.y * RADIUS, p.z * RADIUS], i * 3);
      const c = new THREE.Color(COLORS[corpusById.get(p.id)!.section]);
      col.set([c.r, c.g, c.b], i * 3);
      size[i] = p.id.startsWith("skills") || p.id === "service" ? 44 : 58;
    });
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("aColor", new THREE.BufferAttribute(col, 3));
    geo.setAttribute("aSize", new THREE.BufferAttribute(size, 1));
    geo.setAttribute("aLit", new THREE.BufferAttribute(litAttr, 1));
    const uniforms = {
      uPixelRatio: { value: renderer.getPixelRatio() },
      uTime: { value: 0 },
      uDim: { value: 1 }
    };
    const mat = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    const cloud = new THREE.Points(geo, mat);
    group.add(cloud);

    // Nearest-neighbour edges
    const idx = new Map(points.map((p, i) => [p.id, i]));
    const edgePos: number[] = [];
    points.forEach((p, i) =>
      p.neighbors.forEach((nb) => {
        const j = idx.get(nb)!;
        edgePos.push(...pos.slice(i * 3, i * 3 + 3), ...pos.slice(j * 3, j * 3 + 3));
      })
    );
    const edgeGeo = new THREE.BufferGeometry();
    edgeGeo.setAttribute("position", new THREE.Float32BufferAttribute(edgePos, 3));
    const edgeMat = new THREE.LineBasicMaterial({ color: 0xc6b5ff, transparent: true, opacity: 0.14 });
    group.add(new THREE.LineSegments(edgeGeo, edgeMat));

    // Query rays: from the hits' centroid to each hit, rebuilt when the query changes.
    const rayGeo = new THREE.BufferGeometry();
    rayGeo.setAttribute("position", new THREE.Float32BufferAttribute(new Float32Array(MAX_LABELS * 6), 3));
    const rayMat = new THREE.LineBasicMaterial({ color: 0xffd27a, transparent: true, opacity: 0 });
    const rays = new THREE.LineSegments(rayGeo, rayMat);
    group.add(rays);
    const star = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.09),
      new THREE.MeshBasicMaterial({ color: 0xffd27a, transparent: true, opacity: 0 })
    );
    group.add(star);

    // Dust for depth
    const dust = new Float32Array(600 * 3);
    for (let i = 0; i < 600; i++) {
      const r = 7 + Math.random() * 6;
      const t = Math.random() * Math.PI * 2;
      const u = Math.acos(2 * Math.random() - 1);
      dust.set([r * Math.sin(u) * Math.cos(t), r * Math.sin(u) * Math.sin(t), r * Math.cos(u)], i * 3);
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dust, 3));
    const dustPts = new THREE.Points(dustGeo, new THREE.PointsMaterial({ color: 0x6e6887, size: 0.03, transparent: true, opacity: 0.6 }));
    scene.add(dustPts);

    // Rotation with drag + inertia
    let rotY = 0.4;
    let rotX = -0.15;
    let velY = reduced ? 0 : 0.0016;
    let velX = 0;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let moved = 0;
    const onDown = (e: PointerEvent) => {
      dragging = true;
      moved = 0;
      lastX = e.clientX;
      lastY = e.clientY;
      el.setPointerCapture(e.pointerId);
    };
    const onUp = () => (dragging = false);
    const mouse = new THREE.Vector2(-9, -9);
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      mouse.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
      if (!dragging) return;
      moved += Math.abs(e.clientX - lastX) + Math.abs(e.clientY - lastY);
      velY = (e.clientX - lastX) * 0.004;
      velX = (e.clientY - lastY) * 0.003;
      lastX = e.clientX;
      lastY = e.clientY;
    };
    const onLeave = () => mouse.set(-9, -9);
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);

    const raycaster = new THREE.Raycaster();
    raycaster.params.Points = { threshold: 0.18 };
    let hovered: number | null = null;
    const onClick = () => {
      if (hovered !== null && moved < 6) revealEntry(points[hovered].id);
    };
    el.addEventListener("click", onClick);

    const resize = () => {
      const { width, height } = el.getBoundingClientRect();
      renderer.setSize(width, height, false);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      camera.aspect = width / height;
      camera.position.z = width < 640 ? 11.5 : 9;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    resize();

    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(el);

    const v = new THREE.Vector3();
    let raf = 0;
    let lastKey = "";
    const clock = new THREE.Clock();
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!visible || document.hidden) return;
      const dt = Math.min(clock.getDelta(), 0.05);
      uniforms.uTime.value += dt;

      if (!dragging) {
        velY += ((reduced ? 0 : 0.0016) - velY) * 0.02;
        velX *= 0.92;
      }
      rotY += velY;
      rotX = THREE.MathUtils.clamp(rotX + velX, -0.9, 0.9);
      group.rotation.set(rotX, rotY, 0);

      // Highlight state eases toward the current query.
      const active = lit.current;
      uniforms.uDim.value += ((active.size ? 0.28 : 1) - uniforms.uDim.value) * 0.08;
      points.forEach((p, i) => {
        const target = active.has(p.id) ? 1 : hovered === i ? 0.7 : 0;
        litAttr[i] += (target - litAttr[i]) * 0.12;
      });
      geo.attributes.aLit.needsUpdate = true;

      const key = [...active.keys()].join(",");
      if (key !== lastKey) {
        lastKey = key;
        const ids = [...active.keys()];
        const c = new THREE.Vector3();
        ids.forEach((id) => c.add(new THREE.Vector3().fromArray(pos, idx.get(id)! * 3)));
        if (ids.length) c.divideScalar(ids.length);
        star.position.copy(c);
        const arr = rayGeo.attributes.position.array as Float32Array;
        arr.fill(0);
        ids.forEach((id, k) => {
          arr.set([c.x, c.y, c.z], k * 6);
          arr.set(pos.slice(idx.get(id)! * 3, idx.get(id)! * 3 + 3), k * 6 + 3);
        });
        rayGeo.attributes.position.needsUpdate = true;
        rayGeo.setDrawRange(0, ids.length * 2);
      }
      const on = active.size ? 1 : 0;
      rayMat.opacity += (on * 0.7 - rayMat.opacity) * 0.1;
      (star.material as THREE.MeshBasicMaterial).opacity += (on - (star.material as THREE.MeshBasicMaterial).opacity) * 0.1;
      star.rotation.y += dt * 2;
      edgeMat.opacity += ((active.size ? 0.05 : 0.14) - edgeMat.opacity) * 0.1;
      dustPts.rotation.y += dt * 0.01;

      // Hover picking
      raycaster.setFromCamera(mouse, camera);
      const hit = raycaster.intersectObject(cloud)[0];
      const next = hit ? hit.index ?? null : null;
      if (next !== hovered) {
        hovered = next;
        el.style.cursor = next !== null ? "pointer" : dragging ? "grabbing" : "grab";
        setHover(next !== null ? points[next].id : null);
      }

      // HTML labels follow their points
      const { width, height } = el.getBoundingClientRect();
      const project = (i: number) => {
        v.fromArray(pos, i * 3).applyMatrix4(group.matrixWorld).project(camera);
        return [((v.x + 1) / 2) * width, ((1 - v.y) / 2) * height] as const;
      };
      // Labels stack downward when their points are close on screen.
      const ids = [...active.keys()];
      const placed = ids
        .map((id, k) => ({ k, xy: project(idx.get(id)!) }))
        .sort((a, b) => a.xy[1] - b.xy[1]);
      const spots: { x: number; y: number }[] = [];
      const at = new Map<number, [number, number]>();
      for (const { k, xy } of placed) {
        let y = xy[1] - 10;
        for (const s of spots) if (Math.abs(s.x - xy[0]) < 230 && Math.abs(s.y - y) < 44) y = s.y + 44;
        spots.push({ x: xy[0], y });
        at.set(k, [xy[0] + 14, y]);
      }
      labels.current.forEach((label, k) => {
        if (!label) return;
        const pos2 = at.get(k);
        if (!pos2) {
          label.style.opacity = "0";
          return;
        }
        label.style.opacity = "1";
        label.style.transform = `translate(${pos2[0]}px, ${pos2[1]}px)`;
      });
      if (tooltip.current) {
        if (hovered !== null && !active.has(points[hovered].id)) {
          const [x, y] = project(hovered);
          tooltip.current.style.opacity = "1";
          tooltip.current.style.transform = `translate(${x + 14}px, ${y - 14}px)`;
        } else tooltip.current.style.opacity = "0";
      }

      renderer.render(scene, camera);
    };
    loop();
    // This section arrives after first paint; re-measure everything below it.
    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      el.removeEventListener("click", onClick);
      [geo, edgeGeo, rayGeo, dustGeo].forEach((g) => g.dispose());
      mat.dispose();
      renderer.dispose();
      el.removeChild(renderer.domElement);
    };
  }, [points]);

  const hoverItem = hover ? corpusById.get(hover) : null;

  return (
    <section id="explore" className="relative mx-auto max-w-[1400px] px-5 py-24 sm:px-10">
      <div className="grid gap-6 lg:grid-cols-[1fr_24rem] lg:items-end">
        <Heading kicker="Explore">Every entry, embedded</Heading>
        <p className="text-fog-dim">
          Each point is one entry from this site, placed by TF-IDF similarity and projected to 3D with PCA; lines join
          nearest neighbours. Drag to rotate, search to light up matches, click a point to jump to it.
        </p>
      </div>

      <div className="glass relative mt-10 h-[72vh] min-h-[480px] overflow-hidden rounded-[2rem] [touch-action:pan-y]">
        <div ref={mount} className="absolute inset-0 cursor-grab [touch-action:pan-y]" />

        <div className="pointer-events-none absolute inset-0">
          {Array.from({ length: MAX_LABELS }).map((_, k) => {
            const id = hits[k]?.id;
            const item = id ? corpusById.get(id) : null;
            return (
              <div
                key={k}
                ref={(node) => {
                  labels.current[k] = node;
                }}
                className="absolute left-0 top-0 max-w-[16rem] rounded-xl border border-amber/30 bg-night/80 px-2.5 py-1.5 text-xs opacity-0 backdrop-blur transition-opacity"
              >
                {item && (
                  <>
                    <span className="font-mono text-[10px] text-amber">
                      {hits[k].score.toFixed(2)} · {sectionLabel[item.section]}
                    </span>
                    <span className="block truncate font-semibold">{item.title}</span>
                  </>
                )}
              </div>
            );
          })}
          <div
            ref={tooltip}
            className="absolute left-0 top-0 max-w-[16rem] rounded-xl border border-white/10 bg-night/85 px-2.5 py-1.5 text-xs opacity-0 backdrop-blur"
          >
            {hoverItem && (
              <>
                <span className="font-mono text-[10px]" style={{ color: COLORS[hoverItem.section] }}>
                  {sectionLabel[hoverItem.section]}
                </span>
                <span className="block font-semibold">{hoverItem.title}</span>
                {hoverItem.org && <span className="block text-fog-faint">{hoverItem.org}</span>}
              </>
            )}
          </div>
        </div>

        <div className="absolute left-4 top-4 w-[min(22rem,calc(100%-2rem))]">
          <label className="glass flex items-center gap-2 rounded-2xl px-3 py-2.5">
            <svg viewBox="0 0 20 20" className="h-4 w-4 text-amber" aria-hidden="true">
              <circle cx="8.5" cy="8.5" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
              <path d="M13 13l4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <span className="sr-only">Light up entries matching</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Light up: ranking, earthquake, edge…"
              className="w-full bg-transparent text-sm outline-none placeholder:text-fog-faint focus-visible:outline-none"
            />
          </label>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {["ranking", "earthquake", "edge", "exchange", "python"].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setQuery((q) => (q === s ? "" : s))}
                className={`rounded-full border px-2.5 py-1 text-xs transition-colors ${
                  query === s ? "border-amber bg-amber/15 text-amber" : "border-white/10 bg-night/50 text-fog-dim hover:text-fog"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <ul className="absolute bottom-4 left-4 flex max-w-[calc(100%-2rem)] flex-wrap gap-x-3 gap-y-1 text-[11px] text-fog-dim">
          {(Object.keys(COLORS) as SectionId[]).map((s) => (
            <li key={s} className="flex items-center gap-1.5">
              <i className="h-2 w-2 rounded-full" style={{ background: COLORS[s] }} />
              {sectionLabel[s]}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
