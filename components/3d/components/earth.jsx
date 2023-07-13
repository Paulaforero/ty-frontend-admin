import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { motion } from 'framer-motion-3d'
import { forwardRef } from 'react'

export default forwardRef(function Earth(props, ref) {
  const { nodes, materials } = useGLTF('/3d-models/earth-transformed.glb')

  return (
    <motion.group {...props} dispose={null} ref={ref}>
      <motion.mesh
        geometry={nodes.earth4_blinn1_0.geometry}
        material={materials.blinn1}
      />
      <motion.mesh
        geometry={nodes.earth4_lambert1_0.geometry}
        material={materials.lambert1}
      />
    </motion.group>
  )
})

useGLTF.preload('/3d-models/earth-transformed.glb')
