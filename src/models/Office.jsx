import React, { useRef } from "react";
import { Html, PivotControls, useGLTF } from "@react-three/drei";
import Desktop from "../components/Desktop";

export function Model(props) {
  const { nodes, materials } = useGLTF('/computer_desk/scene.glb')
  return (
    <group {...props} dispose={null}>
      <group position={[-0.005, 0.975, -0.045]} rotation={[0, 0.469, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.DeskLamp_DeskLamp_0.geometry}
          material={materials.DeskLamp}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.DeskLamp_Alpha_0.geometry}
          material={materials.Alpha}
        />
      </group>
      <group position={[-0.218, 0.974, -0.142]} rotation={[Math.PI, -1.03, Math.PI]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.StationeryCup_StationeryCup_0.geometry}
          material={materials.StationeryCup}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Scissors001_StationeryCup_0.geometry}
          material={materials.StationeryCup}
          position={[-0.031, 0.121, 0.01]}
          rotation={[0, 0, 0.198]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Pencel001_StationeryCup_0.geometry}
          material={materials.StationeryCup}
          position={[0, 0.136, -0.031]}
          rotation={[-0.125, -0.052, 0.004]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Pen02001_StationeryCup_0.geometry}
          material={materials.StationeryCup}
          position={[0.017, 0.072, 0.013]}
          rotation={[0.71, 1.183, -0.672]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Pen01001_StationeryCup_0.geometry}
          material={materials.StationeryCup}
          position={[0.017, 0.07, -0.017]}
          rotation={[0.007, 1.055, -0.219]}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Desk_Desk_0.geometry}
        material={materials.Desk}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Drawer03_Desk_0.geometry}
        material={materials.Desk}
        position={[-0.83, 0.139, 0.282]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Drawer02_Desk_0.geometry}
        material={materials.Desk}
        position={[-0.83, 0.39, 0.387]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Drawer01_Desk_0.geometry}
        material={materials.Desk}
        position={[-0.83, 0.64, 0.321]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Book01_Book01_0.geometry}
        material={materials.Book01}
        position={[-0.473, 1, 0.024]}
        rotation={[0, 0.621, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Book02_Book02_0.geometry}
        material={materials.Book02}
        position={[-0.509, 0.974, 0.004]}
        rotation={[0, 0.409, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Chair_Chair_0.geometry}
        material={materials.Chair}
        position={[0.002, 0, 0.699]}
        rotation={[-1.541, 0.021, 2.192]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Computer_Computer_0.geometry}
        material={materials.Computer}
        position={[0.869, 0.112, -0.02]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cup_Cup_0.geometry}
        material={materials.material}
        position={[-0.225, 0.974, 0.065]}
        rotation={[Math.PI, -0.68, Math.PI]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Keyboard_Keyboard_0.geometry}
        material={materials.Keyboard}
        position={[0.333, 0.975, 0.235]}
        rotation={[-Math.PI / 2, 0, -0.459]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Loudspeaker01_Loudspeaker01_0.geometry}
        material={materials.Loudspeaker01}
        position={[0.194, 0.975, -0.156]}
        rotation={[-Math.PI / 2, 0, -0.225]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Loudspeaker02_Loudspeaker02_0.geometry}
        material={materials.Loudspeaker02}
        position={[0.853, 0.975, 0.175]}
        rotation={[-Math.PI / 2, 0, -0.718]}
      />
      <mesh
        geometry={nodes.Monitor_Monitor_0.geometry}
        material={materials.Monitor}
        position={[0.548, 0.975, -0.029]}
        rotation={[0, -0.445, 0]}
        onClick={(event) => {
          event.stopPropagation();
          props.onMonitorClick();
        }}
      />

      {/* SCREEN — hosts the live Desktop UI, aligned using real geometry data */}
      <mesh
        geometry={nodes.screen.geometry}
        position={[0.564693, 0.971952, -0.017801]}
        rotation={[0, -0.445, 0]}
        onClick={(event) => {
          event.stopPropagation();
          props.onMonitorClick();
        }}
      >
        <meshStandardMaterial
          color="#000000"
          emissive="#ffffff"
          emissiveIntensity={0.15}
          toneMapped={true}
        />
        <Html
          transform
          position={[-0.023, 0.2315, 0.02]}
          rotation={[-0.12, 0, 0]}
          scale={0.015}
          zIndexRange={[1, 0]}
          occlude
        >
          <div
            onClick={(event) => {
              // The Desktop is HTML, so it must trigger the zoom itself.
              if (!props.insideComputer) {
                event.preventDefault();
                event.stopPropagation();
                props.onMonitorClick();
              }
            }}
            style={{
              width: '100%',
              height: '100%',
              cursor: props.insideComputer ? 'default' : 'pointer',
              pointerEvents: 'auto',
            }}
          >
            <Desktop
              onExit={props.onExitComputer}
              zoomedIn={props.insideComputer}
            />
          </div>
        </Html>
      </mesh>

      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mouse_Mouse_0.geometry}
        material={materials.Mouse}
        position={[0.704, 0.976, 0.367]}
        rotation={[0, 0.172, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mat_Mouse_0.geometry}
        material={materials.Mouse}
        position={[0.727, 0.974, 0.376]}
        rotation={[0, -0.281, 0]}
      />
    </group>
  )
}

useGLTF.preload('/computer_desk/scene.gltf')