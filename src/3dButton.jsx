import React from "react"
import { Sphere, MeshDistortMaterial } from "@react-three/drei"

export const AddButton = (props) => {

  return (
    <>
      {/* Animated Sphere */}
      <Sphere visible args={[-1.8, 100, 200]} scale={1.5}>
        <MeshDistortMaterial
          color="#3d155f"
          attach="material"
          distort={0.3}
          speed={1}
          roughness={0}
        />
      </Sphere>

      {/* Plus Icon */}
      <mesh onClick={props.connectWallet} rotation={[Math.PI / 2, 0, 0]}>
        <boxBufferGeometry attach="geometry" args={[0.42, 0.42, 2.2]} />
        <MeshDistortMaterial
          color="#B3A5CA"
          attach="material"
          distort={0.2}
          speed={1}
          roughness={0}
          
        />
      </mesh>

      <mesh onClick={props.connectWallet} rotation={[0, Math.PI / 2, 0]}>
        <boxBufferGeometry attach="geometry" args={[0.42, 0.42, 2.2]} />
        <MeshDistortMaterial
          color="#B3A5CA"
          attach="material"
          distort={0.2}
          speed={1}
          roughness={2}
        />
      </mesh>
    </>
  )
}
