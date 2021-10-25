import React from 'react'
import Particles from 'react-particles-js'
import particlesConfig from './config/particles-config'

export default function ParticlesBackground() {
    return (
        <Particles params={particlesConfig}> </Particles>
    )
}
