"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, useGLTF } from "@react-three/drei";
import * as THREE from "three";

export interface ProgressSource {
  current: number;
}

interface PartChoreography {
  name: string;
  start: number;
  end: number;
  offset: [number, number, number];
  rotation: [number, number, number];
}

const PARTS: PartChoreography[] = [
  { name: "LeftLeg", start: 0.15, end: 0.35, offset: [-0.42, -1.0, 0.12], rotation: [-0.2, 0, 0.38] },
  { name: "RightLeg", start: 0.17, end: 0.37, offset: [0.42, -1.0, -0.06], rotation: [0.15, 0, -0.38] },
  { name: "LeftArm", start: 0.35, end: 0.56, offset: [-1.1, 0.38, 0.05], rotation: [0, 0.32, 0.55] },
  { name: "RightArm", start: 0.38, end: 0.58, offset: [1.05, 0.28, 0.38], rotation: [0.32, 0, -0.55] },
  { name: "Head", start: 0.58, end: 0.76, offset: [0, 1.1, 0], rotation: [0, 0.55, 0.16] },
  { name: "TopHat", start: 0.76, end: 0.92, offset: [0.48, 1.55, 0], rotation: [0, 1.25, 0.32] },
  { name: "Accessory1", start: 0.78, end: 0.92, offset: [-0.55, 0.95, 0.22], rotation: [0.2, -0.5, 0.3] },
  { name: "HeadAccessory", start: 0.8, end: 0.93, offset: [0.32, 1.25, -0.12], rotation: [-0.25, 0.6, 0] },
];

function smoothstep(t: number) {
  const x = Math.min(1, Math.max(0, t));
  return x * x * (3 - 2 * x);
}

function easeOutBack(t: number) {
  const c1 = 1.30158;
  const c3 = c1 + 1;
  const x = t - 1;
  return 1 + c3 * x * x * x + c1 * x * x;
}

function assembleEase(t: number) {
  if (t <= 0) return 0;
  if (t >= 1) return 1;
  if (t < 0.6) return 0.88 * smoothstep(t / 0.6);
  return 0.88 + 0.12 * easeOutBack((t - 0.6) / 0.4);
}

const IDENTITY_QUAT = new THREE.Quaternion();

function R6Model({ progress }: { progress: ProgressSource }) {
  const gltf = useGLTF("/models/Mr_Miaw_Web.glb");

  const rig = useMemo(() => {
    const scene = gltf.scene;
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const height = size.y || 1;
    const scale = 2.4 / height;
    const nodes = PARTS.map((part) => {
      const node = scene.getObjectByName(part.name);
      const exploded = new THREE.Vector3(
        part.offset[0] * height,
        part.offset[1] * height,
        part.offset[2] * height,
      );
      const explodedQuat = new THREE.Quaternion().setFromEuler(
        new THREE.Euler(part.rotation[0], part.rotation[1], part.rotation[2]),
      );
      return { part, node, exploded, explodedQuat };
    }).filter((entry) => entry.node !== undefined);
    return { nodes, scale, centerY: center.y };
  }, [gltf]);

  const keyLight = useRef<THREE.DirectionalLight>(null);

  useFrame(({ camera, size }) => {
    const p = Math.min(1, Math.max(0, progress.current));
    for (const { part, node, exploded, explodedQuat } of rig.nodes) {
      if (!node) continue;
      const local = (p - part.start) / Math.max(0.0001, part.end - part.start);
      const eased = assembleEase(local);
      const rest = 1 - eased;
      node.position.copy(exploded).multiplyScalar(rest);
      node.quaternion.slerpQuaternions(IDENTITY_QUAT, explodedQuat, rest);
    }
    const settle = smoothstep((p - 0.92) / 0.08);
    const aspect = size.width / Math.max(1, size.height);
    const baseDistance = aspect < 0.8 ? 8.6 : 6.6;
    const perspective = camera as THREE.PerspectiveCamera;
    perspective.position.set(0.4 - 0.4 * settle, 0.5, baseDistance - 0.5 * settle);
    perspective.lookAt(0, -0.1, 0);
    if (keyLight.current) {
      keyLight.current.intensity = 2.1 + 0.7 * settle;
    }
  });

  return (
    <group scale={rig.scale} position={[0, -rig.centerY * rig.scale, 0]}>
      <primitive object={gltf.scene} />
      <directionalLight
        ref={keyLight}
        position={[3.5, 4.5, 4]}
        intensity={2.1}
        color="#ffd977"
      />
      <directionalLight position={[-4, 2.5, -3]} intensity={1.15} color="#e6c552" />
      <directionalLight position={[0, 1.5, 5]} intensity={0.35} color="#f4f0e5" />
      <ambientLight intensity={0.35} color="#f4f0e5" />
    </group>
  );
}

export function R6Scene({ progress, running }: { progress: ProgressSource; running: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      frameloop={running ? "always" : "never"}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ fov: 38, position: [0.4, 0.5, 6.6] }}
      role="img"
      aria-label="MrMiaw Roblox character assembling from separated parts as you scroll"
    >
      <Suspense fallback={null}>
        <R6Model progress={progress} />
        <ContactShadows position={[0, -1.24, 0]} opacity={0.55} scale={6} blur={2.4} far={3} color="#000000" />
      </Suspense>
    </Canvas>
  );
}

export function preloadR6Model() {
  useGLTF.preload("/models/Mr_Miaw_Web.glb");
}
