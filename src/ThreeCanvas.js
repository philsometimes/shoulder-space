import { Canvas } from 'react-three-fiber'
import { OrbitControls } from 'drei'

const ThreeCanvas = ({children}) => {
  return (
    <Canvas colorManagement>
      <OrbitControls
        screenSpacePanning = {true}
        autoRotate = {true} autoRotateSpeed = {1.0}
        enableZoom = {true} maxZoom = {2.5} minZoom = {0.5}
        />
      {children}
    </Canvas>
  )
}

export default ThreeCanvas
