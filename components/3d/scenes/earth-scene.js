import { motion } from 'framer-motion-3d'
import Earth from '../components/earth'
import { Canvas } from '@react-three/fiber'
import { useRef } from 'react'
import { useAnimationFrame } from 'framer-motion'

export function EarthScene({ isOn, setIsOn }) {
  const earthRef = useRef(null)

  useAnimationFrame((time, delta) => {
    if (earthRef.current) earthRef.current.rotation.y += delta * 0.0008
  })

  return (
    <Canvas>
      <Earth
        initial={{ scale: 0 }}
        animate={{ scale: isOn ? 0.25 : 0.2 }}
        rotation={[0, 0, 0]}
        ref={earthRef}
        isOn={isOn}
        setIsOn={setIsOn}
      />
      <motion.pointLight animate={{ z: 8, x: -10, y: 7 }} />
      <motion.ambientLight animate={{ intensity: isOn ? 0.5 : 0.1 }} />
    </Canvas>
  )
}
