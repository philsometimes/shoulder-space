import { Canvas } from 'react-three-fiber'
import { OrbitControls } from 'drei'

const ThreeCanvas = ({children}) => {
  return (
    <Canvas colorManagement>
      <OrbitControls
        screenSpacePanning = {true}
        autoRotate = {true} autoRotateSpeed = {1.0}
        enableZoom = {true} maxZoom = {100} minZoom = {25}
        />
      {children}
    </Canvas>
  )
}

export default ThreeCanvas
