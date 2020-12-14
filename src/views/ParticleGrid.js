import { Scene, Matrix4 } from 'three'
import React, { useRef, useEffect, useMemo, useState } from 'react'
import { Canvas, useFrame, useThree, createPortal } from 'react-three-fiber'
import { Line, OrbitControls, OrthographicCamera, PerspectiveCamera, useCamera } from 'drei'
import * as d3 from "d3";

const ParticleGrid = () => {
  const xs = [...Array(1000).keys()].map((_, i) => i*10)
  const ys = [...Array(1000).keys()].map((_, i) => i*10)
  console.log(d3.axisTop());

  return (
    <></>
  )
}

export default ParticleGrid
