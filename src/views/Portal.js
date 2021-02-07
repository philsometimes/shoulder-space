import { Scene, Matrix4 } from 'three'
import React, { useContext, useState, useRef, useEffect, useMemo } from 'react'
import { Canvas, useFrame, useThree, createPortal } from 'react-three-fiber'
import { OrbitControls, OrthographicCamera, useCamera } from 'drei'
import useRaycasterOffset from '../hooks/useRaycasterOffset'
import getMouseOffset from '../helpers/offsetPointer'

const Box = (props) => {
  const offset = useRaycasterOffset('right')
  const mesh = useRef()
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  const coords = [100, 200]
  return (
    <mesh
     {...props}
     ref={mesh}
     scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
     onClick={(event) => setActive(!active)}
     onPointerOver={(event) => {setHover(true); getMouseOffset(event, offset.x, offset.y)}}
     onPointerOut={(event) => setHover(false)}>
     <boxBufferGeometry args={[1, 1, 1]} />
     <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
   </mesh>
  )
}

const GridPlane = ({plane, ...props}) => {
  const mesh = useRef()
  const rotationArray = (plane) => {
    switch(plane){
      case 'x':
        return [Math.PI/2,0,0];
      case 'y':
        return [0,Math.PI/2,0];
      case 'z':
        return [0,0,Math.PI/2];
      default:
        return [0,0,0];
    }
  }
  return (
    <mesh
      {...props}
      ref={mesh}
      rotation={rotationArray(plane)}
      >
      <gridHelper args={[5, 100, 0x444444, 0xCCCCCC]}/>
    </mesh>
  )
}

const Origin = ({rotation, ...props}) => {
  const mesh = useRef()
  return (
    <mesh
      {...props}
      ref={mesh}
      rotation={rotation}
      >
      <axesHelper args={[props.size]}/>
    </mesh>
  )
}

const Portal = () => {
  return(
    <>
      <Box position={[0, 0, 0]} />
      <GridPlane plane='x' position={[0, 0, 0]}/>
      <GridPlane plane='y' position={[0, 0, 0]}/>
      <GridPlane plane='z' position={[0, 0, 0]}/>
      <Origin size={1} />
    </>
  )
}

export default Portal
