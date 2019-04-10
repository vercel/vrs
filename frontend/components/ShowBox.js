/**
 * Created by shu on 7/5/2017.
 */

import { Component } from 'react'

export default class ShowBox extends Component {
  constructor() {
    super()

    this.initThree = this.initThree.bind(this)
    this.tick = this.tick.bind(this)
  }
  componentDidMount() {
    this.initThree()
    this.tick()
  }
  componentWillUnmount() {
    this.stop = true
  }
  initThree() {
    let {width, height} = this.props

    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, alpha: true })
    this.renderer.setClearColor(0x000000, 0)
    // for backgrounds, just use 1:1 pixel ratio for the perf reason
    this.renderer.setPixelRatio(1)//window.devicePixelRatio)
    this.renderer.setSize(width, height)

    this.camera = new THREE.PerspectiveCamera(70, width / height, 1, 1000)
    this.camera.position.z = 400

    this.scene = new THREE.Scene()
    // this.scene.fog = new THREE.Fog(0x000000, 1, 1000)

    this.object = new THREE.Object3D()

    this.scene.add(this.object)

    let geometry = new THREE.SphereGeometry(3, 4, 4)
    let material = new THREE.MeshPhongMaterial({color: 0xeeeeee, shading: THREE.FlatShading})

    let mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(0, 0, 0)
    mesh.rotation.set(1, 1, 2)
    mesh.scale.x = mesh.scale.y = mesh.scale.z = 50
    this.object.add(mesh)

    this.scene.add(new THREE.AmbientLight(0x222222))

    let light = new THREE.DirectionalLight(0xeeeeee)
    light.position.set(1, 1, 1)

    this.scene.add(light)

    // postprocessing
    this.composer = new THREE.EffectComposer(this.renderer)
    this.props.composer && this.props.composer.call(this)
  }
  tick() {
    if (!this.stop) {
      requestAnimationFrame(this.tick)
    }
    this.object.rotation.x += 0.005
    this.object.rotation.y += 0.01
    this.renderer.clear()
    this.composer.render()
  }
  render () {
    return <canvas ref={canvas => this.canvas = canvas}/>
  }
}
