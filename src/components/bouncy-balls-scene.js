import * as React from "react"
import { Canvas } from "@react-three/fiber"
import {
  CuboidCollider,
  Physics,
  RigidBody,
  useAfterPhysicsStep,
} from "@react-three/rapier"

const BALL_COUNT = 18
const BOX = {
  x: 5.2,
  y: 2.85,
  z: 2.35,
}
const WALL_THICKNESS = 0.16

const BALL_COLORS = ["#2ed133", "#ffffff", "#807f82", "#eb0514", "#e0f2fe"]

const randomRange = (min, max) => min + Math.random() * (max - min)

const normalizeVector = vector => {
  const length = Math.hypot(vector.x, vector.y, vector.z) || 1
  return {
    x: vector.x / length,
    y: vector.y / length,
    z: vector.z / length,
  }
}

const randomDirection = () =>
  normalizeVector({
    x: randomRange(-1, 1),
    y: randomRange(-0.75, 0.75),
    z: randomRange(-1, 1),
  })

const createBalls = count => {
  const columns = [-2.9, 0, 2.9]
  const rows = [-1.55, 0, 1.55]
  const depths = [-0.95, 0.95]

  return Array.from({ length: count }, (_, index) => {
    const layer = Math.floor(index / 9)
    const row = Math.floor((index % 9) / 3)
    const column = index % 3
    const radius = randomRange(0.18, 0.3)
    const direction = randomDirection()
    const speed = randomRange(0.9, 1.45)

    return {
      index,
      color: BALL_COLORS[index % BALL_COLORS.length],
      position: [
        columns[column] + randomRange(-0.38, 0.38),
        rows[row] + randomRange(-0.26, 0.26),
        depths[layer] + randomRange(-0.18, 0.18),
      ],
      radius,
      linearVelocity: [
        direction.x * speed,
        direction.y * speed,
        direction.z * speed,
      ],
    }
  })
}

const useBackdropEnabled = () => {
  const [enabled, setEnabled] = React.useState(false)

  React.useEffect(() => {
    const update = () => {
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches
      const wideEnough = window.innerWidth >= 960

      setEnabled(!reducedMotion && wideEnough)
    }

    update()
    window.addEventListener("resize", update)
    window.addEventListener("orientationchange", update)

    return () => {
      window.removeEventListener("resize", update)
      window.removeEventListener("orientationchange", update)
    }
  }, [])

  return enabled
}

const randomImpulse = magnitude => {
  const direction = randomDirection()
  const scale = magnitude * randomRange(0.8, 1.2)

  return {
    x: direction.x * scale,
    y: direction.y * scale,
    z: direction.z * scale,
  }
}

const BouncyBallField = () => {
  const balls = React.useMemo(() => createBalls(BALL_COUNT), [])
  const bodyRefs = React.useRef([])
  const lastBoostRef = React.useRef(Array.from({ length: BALL_COUNT }, () => 0))

  useAfterPhysicsStep(
    React.useCallback(() => {
      const now = performance.now()

      bodyRefs.current.forEach((body, index) => {
        if (!body) {
          return
        }

        const velocity = body.linvel()
        const speedSq =
          velocity.x * velocity.x +
          velocity.y * velocity.y +
          velocity.z * velocity.z

        if (speedSq > 0.42 * 0.42) {
          return
        }

        if (now - lastBoostRef.current[index] < 1100) {
          return
        }

        body.applyImpulse(randomImpulse(0.055), true)
        lastBoostRef.current[index] = now
      })
    }, []),
  )

  return (
    <>
      <RigidBody type="fixed" colliders={false}>
        <CuboidCollider
          args={[BOX.x + WALL_THICKNESS, WALL_THICKNESS, BOX.z + WALL_THICKNESS]}
          position={[0, -BOX.y - WALL_THICKNESS, 0]}
          restitution={0.96}
          friction={0.02}
        />
        <CuboidCollider
          args={[BOX.x + WALL_THICKNESS, WALL_THICKNESS, BOX.z + WALL_THICKNESS]}
          position={[0, BOX.y + WALL_THICKNESS, 0]}
          restitution={0.96}
          friction={0.02}
        />
        <CuboidCollider
          args={[WALL_THICKNESS, BOX.y + WALL_THICKNESS, BOX.z + WALL_THICKNESS]}
          position={[-BOX.x - WALL_THICKNESS, 0, 0]}
          restitution={0.96}
          friction={0.02}
        />
        <CuboidCollider
          args={[WALL_THICKNESS, BOX.y + WALL_THICKNESS, BOX.z + WALL_THICKNESS]}
          position={[BOX.x + WALL_THICKNESS, 0, 0]}
          restitution={0.96}
          friction={0.02}
        />
        <CuboidCollider
          args={[BOX.x + WALL_THICKNESS, BOX.y + WALL_THICKNESS, WALL_THICKNESS]}
          position={[0, 0, -BOX.z - WALL_THICKNESS]}
          restitution={0.96}
          friction={0.02}
        />
        <CuboidCollider
          args={[BOX.x + WALL_THICKNESS, BOX.y + WALL_THICKNESS, WALL_THICKNESS]}
          position={[0, 0, BOX.z + WALL_THICKNESS]}
          restitution={0.96}
          friction={0.02}
        />
      </RigidBody>

      {balls.map(ball => (
        <RigidBody
          key={ball.index}
          ref={node => {
            bodyRefs.current[ball.index] = node
          }}
          canSleep={false}
          ccd
          colliders="ball"
          friction={0.01}
          gravityScale={0}
          linearDamping={0}
          angularDamping={0}
          restitution={0.98}
          type="dynamic"
          position={ball.position}
          linearVelocity={ball.linearVelocity}
        >
          <mesh>
            <sphereGeometry args={[ball.radius, 20, 20]} />
            <meshStandardMaterial
              color={ball.color}
              emissive={ball.color}
              emissiveIntensity={0.08}
              roughness={0.2}
              metalness={0.04}
              transparent
              opacity={0.99}
              depthWrite={false}
            />
          </mesh>
        </RigidBody>
      ))}
    </>
  )
}

const BouncyBallsBackdrop = () => {
  const enabled = useBackdropEnabled()

  if (!enabled) {
    return null
  }

  return (
    <div style={styles.backdrop} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0.1, 9], fov: 35 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
      >
        <fog attach="fog" args={["#0f172a", 6, 14]} />
        <ambientLight intensity={0.72} />
        <directionalLight position={[4, 6, 7]} intensity={1.1} color="#eff6ff" />
        <pointLight position={[-4, -1.5, 5]} intensity={0.45} color="#67e8f9" />
        <React.Suspense fallback={null}>
          <Physics gravity={[0, 0, 0]} colliders={false} timeStep={1 / 60}>
            <BouncyBallField />
          </Physics>
        </React.Suspense>
      </Canvas>
    </div>
  )
}

const styles = {
  backdrop: {
    position: "absolute",
    inset: 0,
    zIndex: 0,
    pointerEvents: "none",
    opacity: 0.46,
    overflow: "hidden",
    filter: "saturate(0.88)",
  },
}

export default BouncyBallsBackdrop
