import { Scene, Matrix4 } from 'three'
import React, { useRef, useMemo, useState } from 'react'
import { Canvas, useFrame, useThree, createPortal } from 'react-three-fiber'
import { OrbitControls, OrthographicCamera, PerspectiveCamera, useCamera } from 'drei'

const Tandem = ({children, viewCube}) => {
  const { gl, scene, camera, size } = useThree()
  const virtualScene1 = useRef(new Scene())
  const virtualCam1 = useRef()
  const ref1 = useRef()
  const virtualScene2 = useRef(new Scene())
  const virtualCam2 = useRef()
  const ref2 = useRef()
  const virtualSceneCube = useRef(viewCube ? new Scene() : null)
  const virtualCamCube = useRef()
  const cubeRef = useRef()
  const [hover, setHover] = useState(null)
  const matrix = new Matrix4()

  useFrame(() => {
    virtualCam1.current.zoom = camera.zoom
    virtualCam2.current.zoom = camera.zoom
    const w = size.width
    const h = size.height
    virtualCam1.current.setViewOffset(w, h, w*3/8, h/4, w/2, h/2)
    virtualCam2.current.setViewOffset(w, h, w/8, h/4, w/2, h/2)
    matrix.copy(camera.matrix).invert()
    ref1.current.quaternion.setFromRotationMatrix(matrix)
    ref2.current.quaternion.setFromRotationMatrix(matrix)
    if (viewCube) {
      cubeRef.current.quaternion.setFromRotationMatrix(matrix)
    }
    gl.autoClear = true
    gl.render(scene, camera)
    gl.autoClear = false
    gl.clearDepth()
    gl.render(virtualScene1.current, virtualCam1.current)
    gl.clearDepth()
    gl.render(virtualScene2.current, virtualCam2.current)
    if (viewCube) {
      gl.clearDepth()
      gl.render(virtualSceneCube.current, virtualCamCube.current)
    }
  }, 1)

  const Portal = React.forwardRef((props, ref) => {
    const { meshRef, cameraRef} = ref
    return createPortal(
      <>
        <OrthographicCamera ref={cameraRef} makeDefault={false} position={[0, 0, 100]} zoom={1} />
        <mesh
          ref={meshRef}
          raycast={useCamera(cameraRef.current)}
          position={[props.x ? props.x : 0, props.y ? props.y : 0, 0]}>
          {props.children}
        </mesh>
        <ambientLight />
      </>,
      props.virtualScene
    )
  })

  return (
    <>
      <Portal ref={{meshRef:ref1,cameraRef:virtualCam1}} virtualScene={virtualScene1.current} >{children[0]}</Portal>
      <Portal ref={{meshRef:ref2,cameraRef:virtualCam2}} virtualScene={virtualScene2.current} >{children[1]}</Portal>
      {viewCube &&
        <Portal ref={{meshRef:cubeRef,cameraRef:virtualCamCube}} y={size.height/3} virtualScene={virtualSceneCube.current}>
          <mesh
            onPointerOut={(e) => setHover(null)}
            onPointerMove={(e) => console.log(e.faceIndex / 2)}>
            {[...Array(6)].map((_, index) => (
              <meshLambertMaterial attachArray="material" key={index} color={hover === index ? 'hotpink' : 'white'} />
            ))}
            <boxBufferGeometry attach="geometry" args={[60, 60, 60]} />
            <pointLight position={[10, 10, 10]} intensity={0.5} />
          </mesh>
        </Portal>
      }
    </>
  )
}

export default Tandem