"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const BRAND_DARK = 0x060b16;
const BRAND_BLUE = 0x00538b;
const BRAND_CYAN = 0x0090cc;

const VERTEX_SHADER = `
  uniform float uTime;

  varying float vElevation;
  varying float vDepth;

  float wave(vec2 p, float amp, float freq, float speed, float dir) {
    return amp * sin(dot(p, vec2(cos(dir), sin(dir))) * freq + uTime * speed);
  }

  void main() {
    vec3 pos = position;

    float e = wave(uv, 0.16, 1.4, 1.3, 0.8)
            + wave(uv, 0.10, 2.6, 1.8, 2.1)
            + wave(uv.xy, 0.05, 5.2, 2.4, 3.7);
    pos.y += e;

    pos.x += wave(uv.yx, 0.05, 1.6, 1.0, 1.2);
    pos.z += wave(uv, 0.04, 2.0, 0.7, 4.2);

    vElevation = e / 0.31;
    vDepth = uv.y;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  varying float vElevation;
  varying float vDepth;

  void main() {
    vec3 deep = vec3(0.039, 0.102, 0.180);
    vec3 glow = vec3(0.027, 0.486, 0.671);
    vec3 crest = vec3(0.0, 0.564, 0.8);

    vec3 col = mix(glow, deep, smoothstep(0.0, 1.0, vDepth));
    col += crest * pow(max(vElevation, 0.0), 4.0) * 0.65;
    col *= 0.55 + 0.45 * (1.0 - vDepth);

    gl_FragColor = vec4(col, 0.86);
  }
`;

function makeGlowTexture(): THREE.Texture {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const gradient = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2,
  );
  gradient.addColorStop(0, "rgba(0, 144, 204, 0.9)");
  gradient.addColorStop(0.35, "rgba(0, 144, 204, 0.35)");
  gradient.addColorStop(1, "rgba(0, 144, 204, 0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

function buildParticles(count: number): {
  geometry: THREE.BufferGeometry;
  base: Float32Array;
} {
  const positions = new Float32Array(count * 3);
  const base = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const x = (Math.random() - 0.5) * 30;
    const y = 0.4 + Math.random() * 6.5;
    const z = -12 + Math.random() * 22;
    base[i3] = x;
    base[i3 + 1] = y;
    base[i3 + 2] = z;
    positions[i3] = x;
    positions[i3 + 1] = y;
    positions[i3 + 2] = z;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute(
    "base",
    new THREE.BufferAttribute(base, 3),
  );
  return { geometry, base };
}

export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (!container.isConnected) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }

    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    const canvas = renderer.domElement;
    canvas.style.position = "absolute";
    canvas.style.inset = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    canvas.style.pointerEvents = "none";
    container.appendChild(canvas);

    const isMobile =
      typeof window !== "undefined" && window.innerWidth < 768;
    const pixelRatio = Math.min(
      typeof window !== "undefined" ? window.devicePixelRatio : 1,
      isMobile ? 1.5 : 2,
    );
    renderer.setPixelRatio(pixelRatio);

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(BRAND_DARK, 8, 26);

    const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 80);
    const cameraBase = new THREE.Vector3(0, 1.9, 7.2);
    const lookTarget = new THREE.Vector3(0, 1.0, -4);

    const ocean = new THREE.Mesh(
      new THREE.PlaneGeometry(42, 26, isMobile ? 48 : 90, isMobile ? 30 : 56),
      new THREE.ShaderMaterial({
        vertexShader: VERTEX_SHADER,
        fragmentShader: FRAGMENT_SHADER,
        transparent: true,
        depthWrite: false,
        uniforms: { uTime: { value: 0 } },
      }),
    );
    ocean.rotation.x = -Math.PI / 2;
    ocean.position.y = 0;
    ocean.position.z = 0.5;
    scene.add(ocean);

    const grid = new THREE.GridHelper(34, 34, BRAND_CYAN, BRAND_BLUE);
    const gridMaterial = grid.material as THREE.LineBasicMaterial;
    gridMaterial.transparent = true;
    gridMaterial.opacity = 0.22;
    grid.position.y = 0.02;
    scene.add(grid);

    const particleCount = isMobile ? 650 : 1300;
    const { geometry: particleGeometry, base: basePositions } =
      buildParticles(particleCount);
    const particleMaterial = new THREE.PointsMaterial({
      color: BRAND_CYAN,
      size: 0.09,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    const glow = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: makeGlowTexture(),
        transparent: true,
        opacity: 0.55,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    glow.scale.set(16, 6, 1);
    glow.position.set(0, 1.4, -11);
    scene.add(glow);

    const reducedMotion =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    function resize() {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width === 0 || height === 0) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    let rafId = 0;
    let running = true;

    function onVisibilityChange() {
      if (document.hidden) {
        cancelAnimationFrame(rafId);
        running = false;
      } else if (!running) {
        running = true;
        rafId = requestAnimationFrame(animate);
      }
    }

    function animate(now: number) {
      if (!running) return;
      const t = now / 1000;

      (ocean.material as THREE.ShaderMaterial).uniforms.uTime.value = t;

      camera.position.set(
        cameraBase.x + Math.sin(t * 0.18) * 0.35,
        cameraBase.y + Math.sin(t * 0.23) * 0.12,
        cameraBase.z,
      );
      camera.lookAt(lookTarget);

      const attr = particleGeometry.getAttribute("position") as THREE.BufferAttribute;
      const pos = attr.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        pos[i3 + 1] =
          basePositions[i3 + 1] + Math.sin(t * 0.4 + i * 0.7) * 0.18;
        const drift = (t * (0.2 + (i % 5) * 0.11)) % 24;
        pos[i3 + 2] = basePositions[i3 + 2] + drift;
        if (pos[i3 + 2] > 12) pos[i3 + 2] = -12;
      }
      attr.needsUpdate = true;

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    }

    if (reducedMotion) {
      renderer.render(scene, camera);
    } else {
      document.addEventListener("visibilitychange", onVisibilityChange);
      rafId = requestAnimationFrame(animate);
    }

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      ocean.geometry.dispose();
      (ocean.material as THREE.ShaderMaterial).dispose();
      gridMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      glow.material.dispose();
      glow.material.map?.dispose();
      renderer?.dispose();
      canvas.remove();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
    />
  );
}