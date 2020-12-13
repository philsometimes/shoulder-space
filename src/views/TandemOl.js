import { Scene, Matrix4 } from 'three'
import React, { useRef, useMemo, useState } from 'react'
import { Canvas, useFrame, useThree, createPortal } from 'react-three-fiber'
import { OrbitControls, OrthographicCamera, PerspectiveCamera, useCamera } from 'drei'

const Tandem = ({children}) => {
  const { gl, scene, camera, size } = useThree()
  const mainCam = useRef()
  return (
    <mesh position={[0, 0, 0]}>
      <mesh position={[0, 0, 0]}>
        {children[0]}
      </mesh>
      <ambientLight />
      <OrthographicCamera ref={mainCam} makeDefault={true} position={[0, 0, 100]} zoom={1} />
      <Clone>{children[1]}</Clone>
    </mesh>
  )
}

const Clone = ({children}) => {
  const { gl, scene, camera, size } = useThree()
  const virtualScene = useMemo(() => new Scene(), [])
  const virtualCam = useRef()
  const ref = useRef()
  const [hover, set] = useState(null)
  const matrix = new Matrix4()

  useFrame(() => {
    matrix.copy(camera.matrix).invert()
    ref.current.quaternion.setFromRotationMatrix(matrix)
    gl.autoClear = true
    gl.render(scene, camera)
    gl.autoClear = false
    gl.clearDepth()
    gl.render(virtualScene, virtualCam.current)
  }, 1)

  return createPortal(
    <>
      <OrthographicCamera ref={virtualCam} makeDefault={false} position={[0, 0, 100]} zoom={1} />
      <mesh
        ref={ref}
        raycast={useCamera(virtualCam)}
        position={[size.width / 4 - 80, 0, 0]}>
        {children}
      </mesh>
      <ambientLight />
    </>,
    virtualScene
  )
}

export default Tandem
