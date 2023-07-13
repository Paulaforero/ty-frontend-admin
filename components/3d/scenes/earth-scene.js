import { motion } from 'framer-motion-3d'
import Earth from '../components/earth'
import { Canvas } from '@react-three/fiber'
import { useRef } from 'react'
import { useAnimationFrame } from 'framer-motion'

export function EarthScene() {
  const earthRef = useRef(null)

  useAnimationFrame((time, delta) => {
    if (earthRef.current) earthRef.current.rotation.y += delta * 0.0008
  })

  return (
      <Canvas>
        <Earth scale={0.2} rotation={[0, 0, 0]} ref={earthRef} />
        <motion.pointLight animate={{ z: 7, x: -10, y: 7 }} />
        <motion.ambientLight intensity={0.1} />
      </Canvas>
  )
}
