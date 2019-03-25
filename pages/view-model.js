/**
 * Created by shu on 7/5/2017.
 */

import { Component } from 'react'
import Head from 'next/head'

import Link from 'next/link'
import Router from 'next/router'

import Layout from '../components/Layout'
import Footer from '../components/Footer'

import viewStyles from '../styles/view.less'

class ViewModel extends Component {
  constructor() {
    super()
    this.state = {
      grid: false
    }

    this.tick = this.tick.bind(this)
    this.toggleGrid = this.toggleGrid.bind(this)
  }
  componentDidMount() {
    this.width = Math.min(window.innerWidth, 800)
    this.height = ~~(this.width / 16 * 9)

    this.initResources()
    this.initThree()
    this.loadModel()
      .then(scene => {
        this.scene = scene

        let bBox = new THREE.Box3().setFromObject(this.scene)
        let height = bBox.getSize().y
        let dist = height / (2 * Math.tan(this.camera.fov * Math.PI / 360))
        let pos = scene.position
        pos = pos.clone()
        pos.y += height / 2

        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement)
        this.controls.addEventListener('change', this.tick)
        this.controls.enableZoom = true
        this.controls.target.set(pos.x, pos.y, pos.z)

        this.camera.position.set(pos.x, pos.y, dist * 1.2)
        this.camera.lookAt(pos)

        // add light
        let light = new THREE.DirectionalLight(0x666666)
        light.position.set(50, 50, 50)
        this.scene.add(light)

        this.scene.add(new THREE.AmbientLight(0xbbbbbb))

        // let effect = new THREE.RenderPass(this.scene, this.camera)
        // this.composer.addPass(effect)
        //
        // effect = new THREE.ShaderPass(THREE.EdgeShader)
        // effect.uniforms.aspect.value = new THREE.Vector2(800, 800)
        // effect.renderToScreen = true
        // this.composer.addPass(effect)

        this.wireFrameMaterial = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true})
        this.defaultMaterials = []

        let index = 0
        scene.children[0].traverse((child) => {
          if (child instanceof THREE.Mesh){
            this.defaultMaterials[index++] = child.material
          }
          scene.children[0].needsUpdate = true
        })

        this.tick()
      })
  }
  initResources() {
    // to be refactored
    this.id = Router.query.id
    this.model = `/static/models/${this.id}/data.json`
  }
  initThree() {
    let {width, height} = this

    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, alpha: true })
    this.renderer.setClearColor(0xffffff, 0)
    this.renderer.setPixelRatio(1)//window.devicePixelRatio)
    this.renderer.setSize(width, height)

    this.composer = new THREE.EffectComposer(this.renderer)

    this.camera = new THREE.PerspectiveCamera(5, width / height, 1, 10000)
    this.camera.position.z = 100
  }
  loadModel() {
    const loader = new THREE.ObjectLoader()

    // TODO: error handling
    return new Promise(resolve => {
      loader.load(this.model, (scene) => resolve(scene))
    })
  }
  tick() {
    // render one frame
    this.renderer.render(this.scene, this.camera)
  }

  toggleGrid() {
    this.grid = !this.state.grid

    let index = 0
    this.scene.children[0].traverse((child) => {
      if (child instanceof THREE.Mesh){
        if (this.grid) {
          child.material = this.wireFrameMaterial
        } else {
          child.material = this.defaultMaterials[index++]
        }
      }
      this.scene.children[0].needsUpdate = true
    })

    this.tick()

    this.setState({ grid: !this.state.grid })
  }

  render() {
    return <Layout>
      <Head>
        <style dangerouslySetInnerHTML={{ __html: viewStyles }} />
      </Head>

      <article className="pt5 bg-white ph3">
        <div className="tc flex viewer-container">
          <div className="sidebar ph3">
            <a className={`no-underline black hover-gray inline-flex items-center tc pa3 mb3 ba ${this.state.vr ? '' : 'b--transparent'}`} href="javascript:;" title="Show wireframe">
              <i className="material-icons">3d_rotation</i>
              <span className="f6 ml3 pr2">{ this.state.vr ? 'Turn off' : 'Turn on'} VR mode (TODO)</span>
            </a>
            <a className={`no-underline black hover-gray inline-flex items-center tc pa3 mb3 ba ${this.state.grid ? '' : 'b--transparent'}`} href="javascript:;" title="Show wireframe" onClick={this.toggleGrid}>
              <i className="material-icons">grid_on</i>
              <span className="f6 ml3 pr2">{ this.state.grid ? 'Hide' : 'Show'} wireframe</span>
            </a>
          </div>
          <canvas
            ref={canvas => this.canvas = canvas}
            className="mw-100 h-auto view-canvas mb3"/>
          <div className="sidebar purchase ph3 tc flex flex-column">
            <dl className="db dib-l w-auto-l lh-title tc">
              <dd className="f6 fw4 ml0">Model (DEMO!)</dd>
              <dd className="f2 f-subheadline-l fw6 ml0">$35</dd>
            </dl>
            <div className="mv4">- - -</div>
            <a className="no-underline black hover-gray inline-flex items-center tc pa3 mb3" href="javascript:;" title="Share">
              <i className="material-icons">share</i>
              <span className="f6 ml3 pr2">Share</span>
            </a>
            <a className="no-underline near-white bg-red hover-bg-transparent hover-red inline-flex items-center tc pa3 mb3" href="javascript:;" title="Add to cart">
              <i className="material-icons">shopping_cart</i>
              <span className="f6 ml3 pr2">Add to cart</span>
            </a>
          </div>
        </div>
        <p className="tc"><span className="bg-light-yellow ph2"><i className="material-icons">mouse</i> Use mouse to rotate / scale / select</span></p>
        <hr/>
        <div>
          <h2>Discussion</h2>
        </div>
        <br/>
      </article>
      <Footer/>
    </Layout>
  }
}

export default ViewModel
