import React from 'react'
import { OrthographicCamera } from 'drei'
import ThreeCanvas from './ThreeCanvas'
import Tandem from './views/Tandem'

const App = () => {
  return (
    <ThreeCanvas>
      <OrthographicCamera makeDefault={true} position={[0, 0, 100]} zoom={1} />
      <Tandem viewCube={true}>
        <mesh>
          <torusBufferGeometry attach="geometry" args={[60, 30, 32, 100]} />
          <meshNormalMaterial attach="material" />
        </mesh>
        <mesh>
          <torusBufferGeometry attach="geometry" args={[60, 30, 32, 100]} />
          <meshNormalMaterial attach="material" />
        </mesh>
      </Tandem>
    </ThreeCanvas>
  )
}

export default App
