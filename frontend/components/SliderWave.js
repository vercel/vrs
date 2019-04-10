/**
 * Created by shu on 7/5/2017.
 */

import { Component } from 'react'
import 'react-dom'
import throttle from 'lodash/throttle'

const PI_2 = Math.PI * 2
const X_CNT = 30, Y_CNT = 30, SCALE = 200

// source: three.js official demo
// modified by shu

class SliderWave extends Component {
  constructor() {
    super()

    this.animate = this.animate.bind(this)
    this.tick = this.tick.bind(this)
    this.initThree = this.initThree.bind(this)
  }

  componentDidMount() {
    this.initThree()
    this.animate()
  }

  componentWillUnmount() {
    this.stop = true
  }

  animate() {
    if (!this.stop) {
      requestAnimationFrame(this.animate)
    }
    this.tick()
  }

  tick() {
    let {x, y} = this
    let t = this.time
    this.camera.position.x += (x - this.camera.position.x) * .05
    this.camera.position.y += (-y - this.camera.position.y) * .05
    this.camera.lookAt(this.scene.position)

    for (let i = 0; i < X_CNT; ++i) {
      for (let j = 0; j < Y_CNT; ++j) {
        let dot = this.dots[i * X_CNT + j]
        dot.position.y = Math.sin((i + t) * .5) * 50 + Math.sin((j + t) * .5) * 50
        dot.scale.x = dot.scale.y = Math.sin((i + t) * .3) * 4 + Math.sin((j + t) * .5) * 4 + 8
      }
    }

    this.renderer.render(this.scene, this.camera)
    this.time += 0.1
  }

  initThree() {
    this.x = window.innerWidth / 2
    this.y = -window.innerHeight / 2
    this.time = 0

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000)
    this.camera.position.z = 1000

    this.scene = new THREE.Scene()

    this.dots = []

    this.material = new THREE.SpriteCanvasMaterial({
      color: 0xffffff,
      program: context => {
        context.beginPath()
        context.arc(0, 0, .3, 0, PI_2, true)
        context.fill()
      }
    })

    for (let i = 0; i < X_CNT; ++i) {
      for (let j = 0; j < Y_CNT; ++j) {
        let dot = new THREE.Sprite(this.material)
        dot.position.x = (i - X_CNT / 2) * SCALE
        dot.position.z = (j - Y_CNT / 2) * SCALE
        this.dots.push(dot)

        this.scene.add(dot)
      }
    }

    this.renderer = new THREE.CanvasRenderer({ canvas: this.canvas })
    this.renderer.setPixelRatio(1)
    this.renderer.setSize(window.innerWidth, window.innerHeight)

    let widthHalf = window.innerWidth / 2
    let heightHalf = window.innerWidth / 2
    window.addEventListener('resize', throttle(() => {
      widthHalf = window.innerWidth / 2
      heightHalf = window.innerWidth / 2

      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(window.innerWidth, window.innerHeight)
    }, 100, false), false)
    window.document.addEventListener('mousemove', ev => {
      this.x = ev.pageX - widthHalf
      this.y = ev.pageY - heightHalf - window.scrollY
    }, false)
  }

  render() {
    return <canvas key="slider-wave" ref={canvas => this.canvas = canvas}/>
  }
}

export default SliderWave
