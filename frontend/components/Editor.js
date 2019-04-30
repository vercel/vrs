/**
 * Created by shu on 10/5/2017.
 */

import Head from "next/head";
import Router from "next/router";
import TWEEN from "tween.js";

import { Component } from "react";
import throttle from "lodash/throttle";

import editorStyles from "../styles/editor.less";
import EditorSidebar from "./EditorSidebar";

// utils
const traverse = (object, callback) => {
  if (object && typeof object.children !== "undefined") {
    for (let i = 0; i < object.children.length; ++i) {
      traverse(object.children[i], callback);
    }
  }
  if (object) {
    callback(object);
  }
};

const objectFocus = object => {
  let materials =
    object.material instanceof Array ? object.material : [object.material];
  materials.forEach(material => {
    material.wireframe = true;
    // material.opacity = 0.8
    // material.transparent = true
    // material.colorBk = material.color
    // material.color = {r: 1.4, g: 1.4, b: 1.4}
  });
};

const objectBlur = object => {
  let materials =
    object.material instanceof Array ? object.material : [object.material];
  materials.forEach(material => {
    material.wireframe = false;
    // material.opacity = 1
    // material.transparent = false
    // material.color = material.colorBk
  });
};

// end utils

THREE.FilmShader.fragmentShader = [
  "#include <common>",
  "uniform float time;",
  "uniform bool grayscale;",
  "uniform float nIntensity;",
  "uniform float sIntensity;",
  "uniform float sCount;",
  "uniform sampler2D tDiffuse;",
  "varying vec2 vUv;",
  "void main() {",
  "vec4 cTextureScreen = texture2D( tDiffuse, vUv );",
  "float dx = rand( vUv + time );",
  "vec3 cResult = cTextureScreen.rgb + cTextureScreen.rgb * clamp( 0.1 + dx, 0.0, 1.0 );",
  "vec2 sc = vec2( sin( vUv.y * sCount ), cos( vUv.y * sCount ) );",
  "cResult += cTextureScreen.rgb * vec3( sc.x, sc.x, sc.x ) * sIntensity;", // use single color
  "cResult = cTextureScreen.rgb + clamp( nIntensity, 0.0,1.0 ) * ( cResult - cTextureScreen.rgb );",
  "if( grayscale ) {",
  "cResult = vec3( cResult.r * 0.3 + cResult.g * 0.59 + cResult.b * 0.11 );",
  "}",
  "gl_FragColor =  vec4( cResult, cTextureScreen.a );",
  "}"
].join("\n");

THREE.StereoEffect = function(renderer, composer, renderPass) {
  var _stereo = new THREE.StereoCamera();
  _stereo.aspect = 0.5;
  this.setEyeSeparation = function(eyeSep) {
    _stereo.eyeSep = eyeSep;
  };
  this.setSize = function(width, height) {
    renderer.setSize(width, height);
  };
  this.render = function(scene, camera) {
    scene.updateMatrixWorld();
    if (camera.parent === null) camera.updateMatrixWorld();
    _stereo.update(camera);
    let size = renderer.getSize();
    if (renderer.autoClear) renderer.clear();
    renderer.setScissorTest(true);
    renderer.setScissor(0, 0, size.width / 2, size.height);
    renderer.setViewport(0, 0, size.width / 2, size.height);
    renderPass.camera = _stereo.cameraL;
    // renderer.render(scene, _stereo.cameraL)
    // renderer.compile(scene, _stereo.cameraL)
    composer.render(0.01);

    renderer.setScissor(size.width / 2, 0, size.width / 2, size.height);
    renderer.setViewport(size.width / 2, 0, size.width / 2, size.height);
    renderPass.camera = _stereo.cameraR;
    // renderer.render(scene, _stereo.cameraR)
    // renderer.compile(scene, _stereo.cameraR)
    composer.render(0.01);
  };
};

// the main component which renders a highly customized threejs model viewer

class Editor extends Component {
  constructor(props) {
    super(props);

    this.three = {};
    this.materials = {};

    this.objects = [];
    this.wireframeObjects = [];
    this.shapeObjects = [];

    this.wireframe = false;
    this.pointOpacity = 0;

    this.addToCart = this.addToCart.bind(this);
    this.renderThree = this.renderThree.bind(this);
    this.rotateToLeftView = this.rotateToLeftView.bind(this);
    this.rotateToFrontView = this.rotateToFrontView.bind(this);
    this.rotateToTopView = this.rotateToTopView.bind(this);
    this.switchToWireframe = this.switchToWireframe.bind(this);
    this.switchToModel = this.switchToModel.bind(this);
    this.switchToVR = this.switchToVR.bind(this);
    this.renderLoop = this.renderLoop.bind(this);
    this.selectObject = this.selectObject.bind(this);
    this.changeObjectColor = this.changeObjectColor.bind(this);
    this.handleResize = throttle(this.handleResize.bind(this), 100, false);
    this.hoverObject = throttle(this.hoverObject.bind(this), 100, false);
  }
  componentDidMount() {
    console.log("MODEL PROPS:", this.props);
    window.addEventListener("resize", this.handleResize);

    this.isMob = window.DeviceOrientationEvent ? true : false;

    this.initThree(window.innerWidth, window.innerHeight);
    this.initScene();
    this.initMaterials();

    this.initEffects();
    this.initModel().then(() => {
      this.renderLoop();
      this.loaded = true;
      this.setState({});
    });
  }
  componentWillUnmount() {
    this.renderLoop = () => {};
  }

  // user event handlers
  handleResize() {
    const { renderer, camera } = this.three;

    let width = window.innerWidth,
      height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);

    if (this.stereoEffect) {
      this.stereoEffect.setSize(width, height);
    }
  }

  addToCart() {
    capturescreen().then(url => {
      this.props.addToCart({ ...this.props.details, url });
    });
  }

  // initializations
  initThree(width, height) {
    const renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
      preserveDrawingBuffer: true
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(1); //window.devicePixelRatio || 1)
    renderer.setSize(width, height);
    // renderer.shadowMap.enabled = true
    // renderer.shadowMap.cascade = true
    // renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.gammaInput = true;
    renderer.gammaOutput = true;

    const camera = new THREE.PerspectiveCamera(50, width / height, 1, 10000);
    camera.lookAt(new THREE.Vector3());

    let controls;

    controls = new THREE.OrbitControls(camera, this.canvas);
    controls.enableZoom = true;
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.rotateSpeed = 0.12;

    /*
    if (this.isMob) {
      controls = new THREE.DeviceOrientationControls(camera);
    } else {
    
    controls = new THREE.OrbitControls(camera, this.canvas);
    controls.enableZoom = true;
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.rotateSpeed = 0.12;

    }
    */

    const raycaster = new THREE.Raycaster();

    window.capturescreen = () => {
      return new Promise(resolve => {
        fetch(renderer.domElement.toDataURL("image/jpeg"))
          .then(data => data.blob())
          .then(blob => {
            let blobURL = URL.createObjectURL(blob);
            console.log(blobURL);
            resolve(blobURL);
          });
      });
    };

    this.three.renderer = renderer;
    this.three.camera = camera;
    this.three.controls = controls;
    this.three.raycaster = raycaster;
  }
  initMaterials() {
    const shapeMaterial = new THREE.ShaderMaterial({
      name: "shapeMaterial",
      uniforms: {},
      vertexShader: `
      attribute vec3 center;
      varying vec3 vCenter;
      varying vec3 vNormal;
      void main() {
				vCenter = center;
        vNormal = normalize(normalMatrix * normal);
				gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);
      }
      `,
      fragmentShader: `
      varying vec3 vCenter;
      varying vec3 vNormal;
      float edgeFactorTri() {
				vec3 d = fwidth(vCenter.xyz);
				vec3 a3 = smoothstep(vec3(0.0), d * 1.3, vCenter.xyz);
				return min(min(a3.x, a3.y), a3.z);
      }
      void main() {
        float intensity = pow(0.7 - dot(vNormal, vec3(0.5, 0.5, 0.5)), 1.1) + 0.6;
				gl_FragColor.rgb = mix(vec3(1.0), vec3(0.2), edgeFactorTri()) * intensity;
				gl_FragColor.a = 1.0;
      }
      `,
      side: THREE.DoubleSide
    });
    shapeMaterial.extensions.derivatives = true;

    const wireframeMaterial = new THREE.MeshDepthMaterial({
      name: "wireframeMaterial",
      wireframe: true,
      opacity: 0,
      transparent: true,
      blending: THREE.MultiplyBlending
    });

    let textureLoader = new THREE.TextureLoader();
    let sprite = textureLoader.load(`/static/images/1.png`);
    const pointsMaterial = new THREE.PointsMaterial({
      size: 18, // / (window.devicePixelRatio || 1),
      sizeAttenuation: false,
      map: sprite,
      transparent: true,
      opacity: this.pointOpacity,
      blending: THREE.NormalBlending
    });
    // pointsMaterial.color.setRGB(.5, 1.0, .5)
    pointsMaterial.color.setRGB(1, 1, 1);

    this.materials.shapeMaterial = shapeMaterial;
    this.materials.wireframeMaterial = wireframeMaterial;
    this.materials.pointsMaterial = pointsMaterial;
  }
  initScene() {
    const { renderer } = this.three;
    const scene = new THREE.Scene();

    scene.background = new THREE.Color(0x000000, 0);

    scene.add(new THREE.GridHelper(100, 100, 0xcccccc, 0x444444));
    // scene.add(new THREE.AxisHelper(20))

    const light = new THREE.DirectionalLight(0xbbbbbb);
    light.position.set(50, 50, 10);
    light.castShadow = true;
    scene.add(light);
    scene.add(new THREE.AmbientLight(0x555555));

    let hemiLight = new THREE.HemisphereLight(0xcccccc, 0xffffff, 0.5);
    hemiLight.groundColor.setHSL(1, 0, 0.5);
    hemiLight.position.set(0, 500, 100);
    scene.add(hemiLight);

    const groundMirror = new THREE.Mirror(100, 100, {
      clipBias: 0.1,
      textureWidth: window.innerWidth,
      textureHeight: window.innerHeight,
      color: 0x333333
    });
    groundMirror.rotateX(-Math.PI / 2);
    groundMirror.translateZ(-0.1);
    scene.add(groundMirror);

    scene.fog = new THREE.FogExp2(0x050505, 0.03);
    renderer.setClearColor(scene.fog.color);

    this.three.scene = scene;
  }
  initEffects() {
    const { scene, camera, renderer } = this.three;

    renderer.setScissor(0, 0, window.innerWidth, window.innerHeight);
    const composer = new THREE.EffectComposer(renderer);

    let effect;

    const renderPass = new THREE.RenderPass(scene, camera);
    composer.addPass(renderPass);

    effect = new THREE.UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.2,
      1,
      0.95
    );
    composer.addPass(effect);

    let hblur = new THREE.ShaderPass(THREE.HorizontalTiltShiftShader);
    let vblur = new THREE.ShaderPass(THREE.VerticalTiltShiftShader);
    let blur = 1;
    hblur.uniforms["h"].value = blur / window.innerWidth;
    vblur.uniforms["v"].value = blur / window.innerHeight;
    hblur.uniforms["r"].value = vblur.uniforms["r"].value = 0.55;
    composer.addPass(vblur);
    composer.addPass(hblur);

    // effect = new THREE.ShaderPass(THREE.ColorCorrectionShader)
    // composer.addPass(effect)

    //
    // effect = new THREE.ShaderPass(THREE.SSAOShader)
    // effect.uniforms['tDepth'].value = depthTarget
    // effect.uniforms['size'].value.set(window.innerWidth, window.innerHeight)
    // effect.uniforms['cameraNear'].value = camera.near
    // effect.uniforms['cameraFar'].value = camera.far
    // effect.uniforms['fogEnabled'].value = 0
    // effect.uniforms['aoClamp'].value = 0.5
    // effect.uniforms['lumInfluence'].value = 0.59
    // effect.material.defines = { "FLOAT_DEPTH": true }
    // // renderer.addEffect( effect, "tDepth" )
    // composer.addPass(effect)

    // effect = new THREE.ShaderPass(THREE.VerticalBlurShader)
    // effect.uniforms["v"].value = 1 / 4096
    // effect.renderToScreen = true
    // composer.addPass(effect)

    if (this.wireframe || this.vr) {
      effect = new THREE.ShaderPass(THREE.RGBShiftShader);
      effect.uniforms.amount.value = 0.0007;
      composer.addPass(effect);
    }

    if (this.wireframe || this.vr) {
      effect = new THREE.FilmPass(0.25, 0.4, 1500, false);
      composer.addPass(effect);
    }

    // const outlineEffect = new THREE.OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera)
    // outlineEffect.renderToScreen = true
    // composer.addPass(outlineEffect)

    effect = new THREE.ShaderPass(THREE.FXAAShader);
    effect.uniforms["resolution"].value = new THREE.Vector2(
      1 / window.innerWidth,
      1 / window.innerHeight
    );
    composer.addPass(effect);

    effect = new THREE.ShaderPass(THREE.VignetteShader);
    effect.uniforms["offset"].value = 0.5;
    effect.uniforms["darkness"].value = this.vr ? 6 : 4;
    effect.renderToScreen = true;
    composer.addPass(effect);

    if (this.vr) {
      const stereoEffect = new THREE.StereoEffect(
        renderer,
        composer,
        renderPass
      );
      stereoEffect.setSize(window.innerWidth, window.innerHeight);
      this.stereoEffect = stereoEffect;
    }

    // composer.addPass(effect)

    // let outlinePass = new THREE.OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera)
    // outlinePass.edgeStrength = 3.0
    // outlinePass.edgeGlow = 0.5
    // outlinePass.edgeThickness = 1.0
    // // outlinePass.renderToScreen = true
    // composer.addPass(outlinePass)

    // effect = new THREE.GlitchPass(1)
    // effect.renderToScreen = true
    // composer.addPass(effect)

    // effect = new THREE.ShaderPass(THREE.EdgeShader)
    // effect.uniforms.aspect.value = new THREE.Vector2(100000, 100000)
    // effect.renderToScreen = true
    // composer.addPass(effect)

    // effect = new THREE.DotScreenPass(new THREE.Vector2(0, 0), 0.1, 0.1)
    // composer.addPass(effect)

    // effect = new THREE.ShaderPass(THREE.BleachBypassShader)
    // effect.uniforms[ "opacity" ].value = 0.1
    // effect.renderToScreen = true
    // composer.addPass(effect)

    // const bokehPass = new THREE.BokehPass(scene, camera, {
    //   focus: 		0.9,
    //   aperture:	0.01,
    //   maxblur:	40.0,
    //   width: window.innerWidth,
    //   height: window.innerHeight
    // })
    // bokehPass.renderToScreen = true
    // composer.addPass(bokehPass)

    // this.bokehPass = bokehPass
    // this.outlinePass = outlinePass
    // this.outlineEffect = outlineEffect

    this.three.composer = composer;
  }
  initModel() {
    const loader = new THREE.ObjectLoader();

    const id =
      new URL(window.location.href).searchParams.get("id") ||
      Router.query.id ||
      this.props.details.id;
    const modelPath = `/static/models/${id}/data.js`;

    return new Promise(resolve => {
      loader.load(modelPath, result => {
        if (result instanceof THREE.Scene) {
          this.initModelScene(result);
        } else {
          if (result.scene) {
            this.initModelScene(result);
          } else {
            this.initModelObject(result);
          }
        }
        resolve();
      });
    });
  }
  initModelControls() {
    // compute the rotation center from camera's target
    let { camera, controls } = this.three;
    let camDirection = camera.getWorldDirection();
    let y =
      camera.position.y - (camera.position.x / camDirection.x) * camDirection.y;

    if (controls.target) {
      controls.target.set(0, y, 0);
    } else {
      controls.alphaOffsetAngle = 3;
    }
    controls.update();
  }
  initModelScene(scene) {
    // set an initial scale for camera/controls
    const { camera } = this.three;
    let bBox = new THREE.Box3().setFromObject(scene);
    let { y: height, x: width, z: depth } = bBox.getSize();
    let modelSize = Math.max(height, width, depth);
    let scaleRatio = 10 / modelSize;
    height *= scaleRatio;

    let dist = 4 / Math.tan((camera.fov * Math.PI) / 360);
    let pos = scene.position.clone();
    pos.setY(pos.y - bBox.min.y);

    pos.setY(height / 2);
    camera.position.set(pos.x + dist * 0.1, pos.y + dist * 0.1, -dist * 0.5);
    camera.lookAt(pos);
    camera.zoom = 0.8;
    camera.updateProjectionMatrix();

    // easing animation at the very beginning
    new TWEEN.Tween(camera.position)
      .easing(TWEEN.Easing.Exponential.Out)
      .to(
        {
          x: pos.x + dist * 0.3,
          y: pos.y + dist * 0.3,
          z: -dist * 1.5
        },
        1200
      )
      .start();

    this.initialScale = scaleRatio;
    this.initialPosition = new THREE.Vector3(
      pos.x + dist * 0.3,
      pos.y + dist * 0.3,
      -dist * 1.5
    );
    this.initModelControls();

    // parse the model scene and push all objects to the current scene
    let group = new THREE.Group();
    while (scene.children.length) {
      let object = scene.children.pop();
      if (object) {
        object.position.setY(object.position.y - bBox.min.y);
        object.position.setX(
          object.position.x - (bBox.max.x + bBox.min.x) * 0.5
        );
        object.castShadow = true;
        object.receiveShadow = false;
        group.add(object);

        if (object instanceof THREE.PerspectiveCamera) {
          this.initModelCamera(object, scaleRatio);
        }
      }
    }
    // move y-axis, normalize size
    group.rotation.copy(scene.rotation);
    group.scale.set(scaleRatio, scaleRatio, scaleRatio);
    this.modelGroup = group;
    this.initModelObject(group);
  }
  initModelCamera(object, scaleRatio) {
    const { camera } = this.three;

    camera.fov = object.fov;
    camera.far = object.far;
    camera.focus = object.focus;
    camera.zoom = 0.6;
    object.position.multiplyScalar(scaleRatio);
    camera.position.copy(object.position);
    camera.rotation.copy(object.rotation);
    camera.updateProjectionMatrix();
    this.initialPosition = camera.position.clone();
    this.initialRotation = camera.rotation.clone();

    this.initModelControls();
  }
  initModelObject(object) {
    // push an object from the model file to the current scene

    const { scene } = this.three;

    let verticesCnt = 0;
    let wireframeClone = object.clone();
    traverse(wireframeClone, child => {
      if (child instanceof THREE.Mesh) {
        let pointsGeo = new THREE.Geometry();
        pointsGeo.dynamic = true;
        for (let i = 0; i < child.geometry.vertices.length; ++i) {
          pointsGeo.vertices.push(child.geometry.vertices[i]);
          ++verticesCnt;
        }
        child.material = this.materials.wireframeMaterial;

        let points = new THREE.Points(pointsGeo, this.materials.pointsMaterial);
        child.add(points);
      }
    });
    this.pointOpacity = Math.min(Math.max(500 / verticesCnt, 0.12), 1);
    this.materials.pointsMaterial.opacity = this.pointOpacity;

    this.wireframeObjects.push(wireframeClone);
    // scene.add(wireframeClone)

    let shapeClone = object.clone();
    shapeClone.traverse(child => {
      if (child instanceof THREE.Mesh) {
        let geometry = new THREE.BufferGeometry().fromGeometry(child.geometry);

        let vectors = [
          new THREE.Vector3(1, 0, 0),
          new THREE.Vector3(0, 1, 0),
          new THREE.Vector3(0, 0, 1)
        ];
        let position = geometry.attributes.position;
        let centers = new Float32Array(position.count * 3);
        for (let i = 0, l = position.count; i < l; i++) {
          vectors[i % 3].toArray(centers, i * 3);
        }

        geometry.addAttribute("center", new THREE.BufferAttribute(centers, 3));

        child.geometry = geometry;
        child.material = this.materials.shapeMaterial;
      }
    });
    this.shapeObjects.push(shapeClone);
    // scene.add(shapeClone)

    let changeMaterial = material => {
      material.name = "objectMaterial";
      material.polygonOffset = true;
      material.polygonOffsetFactor = -0.1;
      material.vertexColors = THREE.FaceColors;
      material.transparent = true;
      material.opacity = 1;
    };
    object.traverse(child => {
      if (child instanceof THREE.Mesh) {
        if (child.material instanceof Array) {
          child.material.forEach(changeMaterial);
        } else {
          changeMaterial(child.material);
        }
      }
    });
    this.objects.push(object);
    scene.add(object);
  }

  // updating
  rotateToLeftView() {
    const { camera } = this.three;
    const initialPosition = this.initialPosition;

    new TWEEN.Tween(camera.position)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .to(
        {
          x: -initialPosition.z,
          y: initialPosition.y,
          z: 0
        },
        800
      )
      .start();
  }
  rotateToFrontView() {
    const { camera } = this.three;
    const initialPosition = this.initialPosition;

    new TWEEN.Tween(camera.position)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .to(
        {
          x: 0,
          y: initialPosition.y,
          z: initialPosition.z
        },
        800
      )
      .start();
  }
  rotateToTopView() {
    const { camera } = this.three;
    const initialPosition = this.initialPosition;

    new TWEEN.Tween(camera.position)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .to(
        {
          x: 0,
          y: initialPosition.y * 2.5,
          z: initialPosition.z * 0.1
        },
        800
      )
      .start();
  }
  switchToWireframe(ev = {}) {
    if (!this.wireframe || this.vr || ev.forceVR) {
      this.wireframe = true;
      this.vr = !!ev.forceVR;

      let { scene } = this.three;

      let changeMaterial = material => {
        material.transparent = true;
        material.opacity = 0;
      };
      this.objects.forEach(object => {
        object.traverse(child => {
          if (child instanceof THREE.Mesh) {
            if (child.material instanceof Array) {
              child.material.forEach(changeMaterial);
            } else {
              changeMaterial(child.material);
            }
          }
        });
      });
      this.materials.pointsMaterial.color.setRGB(0.5, 1.0, 0.5);
      this.materials.pointsMaterial.opacity = 1;
      this.wireframeObjects.forEach(object => scene.add(object));
      this.shapeObjects.forEach(object => scene.add(object));

      this.initEffects();
      this.handleResize();
      this.setState({});
    }
  }
  switchToModel(ev = {}) {
    if (this.wireframe || this.vr || ev.forceVR) {
      this.wireframe = false;
      this.vr = !!ev.forceVR;

      let { scene } = this.three;

      let changeMaterial = material => {
        material.opacity = 1;
      };
      this.objects.forEach(object => {
        object.traverse(child => {
          if (child instanceof THREE.Mesh) {
            if (child.material instanceof Array) {
              child.material.forEach(changeMaterial);
            } else {
              changeMaterial(child.material);
            }
          }
        });
      });
      // this.materials.pointsMaterial.color.setRGB(1, 1, 1)
      // this.materials.pointsMaterial.opacity = this.pointOpacity
      this.wireframeObjects.forEach(object => scene.remove(object));
      this.shapeObjects.forEach(object => scene.remove(object));

      this.initEffects();
      this.handleResize();
      this.setState({});
    }
  }
  switchToVR() {
    if (!this.vr) {
      // this.switchToWireframe({forceVR: true})
      this.switchToModel({ forceVR: true });
    }
  }
  // autofocus(ev) {
  //   const { camera, raycaster, scene } = this.three
  //   const mouse = { x: (ev.pageX / window.innerWidth) * 2 - 1, y: -(ev.pageY / window.innerHeight) * 2 + 1 }
  //
  //   raycaster.setFromCamera(mouse, camera)
  //
  //   let intersects = raycaster.intersectObjects([scene], true)
  //   let selectedObject = null
  //
  //   for (let i = 0; i < intersects.length; ++i) {
  //     if (!selectedObject) {
  //       selectedObject = intersects[i]
  //     } else {
  //       if (intersects[i].distance < selectedObject.distance) {
  //         selectedObject = intersects[i]
  //       }
  //     }
  //   }
  //
  //   // 0.516859288707892 -> 0.05
  //   // 1.0860931634363653 -> 0.3
  //   // 1.222386828277837 -> 0.9
  //   // inf -> 1.0
  //
  //   if (selectedObject) {
  //     // let f = Math.log(selectedObject.distance + 1) / Math.log()
  //     let f = 1 - Math.exp(-selectedObject.distance)
  //     console.log(f)
  //     this.bokehPass.uniforms.focus.value = f || 1.0 //1.0
  //   } else {
  //     this.bokehPass.uniforms.focus.value = 1
  //   }
  // }
  selectObject(ev) {
    if (this.mousemoved) {
      return;
    }
    if (this.selectedObject) {
      // this.outlineEffect.selectedObjects = []
    }
    if (!this.hoveredObjectData) {
      this.selectedObject = null;
      this.selectedObjectData = null;
      this.selected = false;
      this.setState({});
      return;
    }
    this.selectedObject = this.highlightedObject;
    this.selectedObjectData = this.hoveredObjectData;
    this.selected = true;
    // this.outlineEffect.selectedObjects = [this.selectedObject]
    this.setState({});
  }
  hoverObject(ev) {
    if (this.vr || this.wireframe) {
      if (this.hoveredObjectData) {
        this.hoveredObjectData = null;
        this.setState({});
      }
      return;
    }

    ev.persist();
    const { camera, raycaster, scene } = this.three;
    const mouse = {
      x: (ev.pageX / window.innerWidth) * 2 - 1,
      y: -(ev.pageY / window.innerHeight) * 2 + 1
    };

    raycaster.setFromCamera(mouse, camera);

    let intersects = raycaster.intersectObjects([scene], true);
    let selectedObject = null;

    for (let i = 0; i < intersects.length; ++i) {
      if (
        intersects[i].object instanceof THREE.Points ||
        intersects[i].object instanceof THREE.GridHelper
      ) {
        continue;
      }
      if (intersects[i].object.geometry instanceof THREE.BufferGeometry) {
        continue;
      }
      if (
        intersects[i].object instanceof THREE.Mesh &&
        !(intersects[i].object.material instanceof Array) &&
        intersects[i].object.material.name !== "objectMaterial"
      ) {
        continue;
      }
      if (!selectedObject) {
        selectedObject = intersects[i];
      } else {
        if (intersects[i].distance < selectedObject.distance) {
          selectedObject = intersects[i];
        }
      }
    }

    if (selectedObject) {
      if (selectedObject.object instanceof THREE.Mesh) {
        document.body.style.cursor = "pointer";
        // if (selectedObject.face !== this.highlightedFace) {
        //   if (this.highlightedFace) {
        //     this.highlightedObject.geometry.colorsNeedUpdate = true
        //     this.highlightedFace.color.setRGB(1, 1, 1)
        //   }
        //   this.highlightedFace = selectedObject.face
        //   this.highlightedObject = selectedObject.object
        //   selectedObject.face.color.setRGB(2, 2, 2)
        //   selectedObject.object.geometry.colorsNeedUpdate = true
        // }

        let { material } = selectedObject.object;

        if (selectedObject.object !== this.highlightedObject) {
          if (this.highlightedObject) {
            this.highlightedObject.geometry.colorsNeedUpdate = true;
            objectBlur(this.highlightedObject);
          }
          this.highlightedObject = selectedObject.object;
          objectFocus(this.highlightedObject);
        }

        if (!(material instanceof Array)) {
          material = [material];
        }

        let textures = [],
          colors = [],
          refractionRatios = [],
          shininesses = [],
          name = "";

        material.forEach(mt => {
          if (mt.map instanceof THREE.Texture) {
            textures.push(mt.map.image.src);
          }
          if (mt.color) {
            colors.push(mt.color);
          }
          refractionRatios.push(mt.refractionRatio || 0);
          shininesses.push(mt.shininess || 0);
        });
        if (this.highlightedObject.name) {
          name = this.highlightedObject.name;
        }

        this.hoveredObjectData = {
          textures,
          colors,
          name,
          refractionRatios,
          shininesses,
          uuid: this.highlightedObject.uuid
        };
        this.setState({});
      } else {
        document.body.style.cursor = "";
      }
      // addSelectedObject(selectedObject)
      // if (typeof selectedObject === THREE.Mesh)
    } else {
      document.body.style.cursor = "";
      if (this.highlightedObject) {
        this.highlightedObject.geometry.colorsNeedUpdate = true;
        objectBlur(this.highlightedObject);
        this.highlightedObject = null;
      }
      if (this.hoveredObjectData) {
        this.hoveredObjectData = null;
        this.setState({});
      }
    }
  }
  changeObjectColor(color, index) {
    // TODO
    if (this.selectedObject) {
      this.selectedObject.geometry.colorsNeedUpdate = true;
      let { material } = this.selectedObject;
      if (!(material instanceof Array)) {
        material = [material];
      }
      material[index].color = {
        r: color.rgb.r / 255,
        g: color.rgb.g / 255,
        b: color.rgb.b / 255
      };
    }
  }

  // rendering
  renderThree() {
    const { scene, renderer, camera, composer, controls } = this.three;

    scene.updateMatrixWorld();

    TWEEN.update();

    controls.update();

    if (this.vr) {
      this.stereoEffect.render(scene, camera);
    } else {
      renderer.clear();
      composer.render(0.01);
    }
  }
  renderLoop() {
    requestAnimationFrame(this.renderLoop);
    this.renderThree();
  }

  render() {
    let { selectedObjectData } = this;
    return (
      <div style={{ display: "flex" }}>
        <Head>
          <style dangerouslySetInnerHTML={{ __html: editorStyles }} />
        </Head>

        {!this.loaded && (
          <div className="absolute w-100 h-100 flex white items-center justify-center">
            <i className="material-icons mr2">hourglass_full</i>loading model...
          </div>
        )}

        <div className="description-container">
          <h1>{this.props.details.name}</h1>
          <p>{this.props.details.description}</p>
        </div>

        <canvas
          className="view-canvas"
          ref={canvas => (this.canvas = canvas)}
          onClick={this.selectObject}
          onMouseDown={() => (this.mousemoved = false)}
          onMouseMove={ev => {
            ev.persist();
            this.mousemoved = true;
            this.hoverObject(ev);
          }}
        />

        {!this.isMob && selectedObjectData && (
          <div className="absolute setting-panel white pa1">
            <h2 className="f6 ma0 mb2 ttu">Customize component</h2>
            <EditorSidebar
              data={selectedObjectData}
              changeColor={this.changeObjectColor}
            />
          </div>
        )}

        <div
          className="control-bar fixed bottom-0 left-0 white w-100 z-999 mb3 ph4 flex items-end content-end justify-around flex-wrap"
          onTouchMove={ev => ev.preventDefault()}
          style={{ height: 0 }}
        >
          <div className="key-info flex items-end ml4">
            <div className="relative">
              <a
                className="hover-gray absolute pointer left--2"
                onClick={this.rotateToLeftView}
              >
                <i className="material-icons">arrow_forward</i>
              </a>
              <a
                className="hover-gray absolute pointer top--2"
                onClick={this.rotateToTopView}
              >
                <i className="material-icons">arrow_downward</i>
              </a>
              <a
                className="hover-gray pointer"
                onClick={this.rotateToFrontView}
              >
                <i className="material-icons">accessibility</i>
              </a>
            </div>
          </div>

          <div className="flex items-center">
            <a
              className={`hover-gray pointer mr2 flex justify-center items-center flex-column br-100 w3 h3 ba ${
                this.wireframe || this.vr ? "b--transparent" : ""
              }`}
              onClick={this.switchToModel}
            >
              <i className="material-icons">brightness_1</i>
              <span className="ttu f7 mb1">Body</span>
            </a>
            <a
              className={`hover-gray pointer mr2 flex justify-center items-center flex-column br-100 w3 h3 ba ${
                this.wireframe && !this.vr ? "" : "b--transparent"
              }`}
              onClick={this.switchToWireframe}
            >
              <i className="material-icons">blur_circular</i>
              <span className="ttu f7 mb1">Frame</span>
            </a>
            <a
              className={`hover-gray pointer mr2 flex justify-center items-center flex-column br-100 w3 h3 ba ${
                !this.vr ? "b--transparent" : ""
              }`}
              onClick={this.switchToVR}
            >
              <i className="material-icons">vignette</i>
              <span className="ttu f7 mb1">VR</span>
            </a>
          </div>

          <div className="v-mid mb3 mt4 nowrap pointer dib add-to-cart-btn">
            <a className="pa1" onClick={this.addToCart}>
              <i className="material-icons v-mid">add_circle_outline</i>{" "}
              <span className="v-mid">Add to cart</span>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Editor;
