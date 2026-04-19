import { Canvas, useFrame } from "@react-three/fiber"
import { Stars, OrbitControls } from "@react-three/drei"
import { EffectComposer, Bloom } from "@react-three/postprocessing"
import { useRef } from "react"
import * as THREE from "three"

function FloatingCube({ position }) {
  const mesh = useRef()

  useFrame(({ clock }) => {
    mesh.current.position.y =
      position[1] + Math.sin(clock.elapsedTime + position[0]) * 0.4
    mesh.current.rotation.y += 0.01
    mesh.current.rotation.x += 0.005
  })

  return (
    <mesh ref={mesh} position={position}>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial
        color="#00ffff"
        emissive="#00ffff"
        emissiveIntensity={1.2}
        roughness={0.1}
        metalness={1}
      />
    </mesh>
  )
}

function Scene() {
  return (
    <>
      {/* Lights */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={2} />
      <pointLight position={[0, 0, 5]} intensity={3} color="#00ffff" />

      {/* Floating Cubes */}
      <FloatingCube position={[-3, 0, 0]} />
      <FloatingCube position={[0, 0, 0]} />
      <FloatingCube position={[3, 0, 0]} />

      {/* Starfield */}
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        fade
        speed={1}
      />

      {/* Glow Effect */}
      <EffectComposer>
        <Bloom
          intensity={1.5}
          luminanceThreshold={0}
          luminanceSmoothing={0.9}
        />
      </EffectComposer>

      <OrbitControls enableZoom={false} />
    </>
  )
}

export default function App() {
  return (
    <div style={{ height: "100vh", background: "radial-gradient(circle at center, #0a0f2c 0%, #000000 70%)" }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <Scene />
      </Canvas>

      {/* Overlay Text */}
      <div style={{
        position: "absolute",
        top: "15%",
        width: "100%",
        textAlign: "center",
        fontSize: "4rem",
        fontWeight: "bold",
        color: "white",
        textShadow: "0 0 20px #00ffff",
        letterSpacing: "8px"
      }}>
        PRINCE
      </div>
    </div>
  )
}