import React from 'react'
import { OrthographicCamera } from 'drei'
import ThreeCanvas from './ThreeCanvas'
import Tandem from './views/Tandem'
import Portal from './views/Portal'

import ParticleGrid from './views/ParticleGrid'

const App = () => {
  return (
    <ThreeCanvas>
      <OrthographicCamera makeDefault={true} position={[0, 0, 100]} zoom={50} />
      <Tandem viewCube={true}>
        <mesh>
          <torusBufferGeometry attach="geometry" args={[1.5, 0.5, 32, 100]} />
          <meshNormalMaterial attach="material" />
        </mesh>
        <mesh>
          <Portal />
        </mesh>
      </Tandem>

    </ThreeCanvas>
  )
}

export default App
