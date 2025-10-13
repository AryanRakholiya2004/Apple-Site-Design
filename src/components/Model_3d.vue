<template>
  <section id="container3D" class="fixed h-screen w-screen inset-0 z-50 pointer-events-none"></section>
</template>

<script setup>
import { onMounted } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

onMounted(() => {

  // Camera
  const camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 24);

  // Scene
  const scene = new THREE.Scene();
  scene.position.set(0, 0, 0);
  scene.scale.set(0.8, 0.8, 0.8);
  let iphone;

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
  scene.add(ambientLight);

  const topLight = new THREE.DirectionalLight(0xffffff, 1.6);
  topLight.position.set(50, 50, 50);
  scene.add(topLight);

  const edgeLight = new THREE.DirectionalLight(0xffffff, 10);
  edgeLight.position.set(10, 0, -10);
  scene.add(edgeLight);

  const edgeLight2 = new THREE.DirectionalLight(0xffffff, 10);
  edgeLight2.position.set(-10, 0, -10);
  scene.add(edgeLight2);

  const sideLight = new THREE.DirectionalLight(0xffffff, 0.5);
  sideLight.position.set(0, 50, -50);
  scene.add(sideLight);

  const fillLight = new THREE.DirectionalLight(0xffffff, 1);
  fillLight.position.set(0, 0, 10);
  scene.add(fillLight);
  
  const loader = new GLTFLoader();
  loader.load('@/assets/iPhone_model.glb',
    function (gltf) {
      iphone = gltf.scene;
      iphone.position.set(0, -2, 0);
      var rot_x = 0;
      var rot_y = 230;
      var rot_z = 0;

      iphone.rotation.set((rot_x/180) * Math.PI, (rot_y/180) * Math.PI, (rot_z/180) * Math.PI);
      scene.add(iphone);

      // create a scrubbed timeline driven by page scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#body-section',                       // sync timeline to full page scroll
          start: "top top",                              // start when page hits top
          end: "bottom 0%",                          // end when page hits bottom
          scrub: 6,                                    // smoothing
          // markers: true,                                // set true to debug
          pinSpacing: true,
          fastScrollEnd: true,
          // toggleActions: tl,
        }
      });

      

      // keyframes - will be linearly mapped across the scroll timeline
      let arrPositionModel = [
        {
          id: 'hero-section',
          position: {x: 0, y: -2, z: 0},
          rotation: {x: 0, y: 180, z: 0},
          camera: {x: 0, y: 0, z: 24, mm: 20},
        },
        {
          id: 'right-body',
          position: {x: -8, y: 0, z: 0},
          rotation: {x:-30, y: 540, z: 10},
          camera: {x: 0, y: 0, z: 30, mm: 20},
        },
        {
          id: 'right-camera',
          position: {x: -8, y: 0, z: 0},
          rotation: {x: 0, y: 180, z: 90},
          camera: {x: 0, y: 0, z: 8 , mm: 48},
        },
        {
          id: 'right-edge',
          position: {x: -7, y: 1, z: 0},
          rotation: {x: -45, y: -135, z: 0},
          camera: {x: 0, y: 0, z:16 , mm: 36},
        },
        // {
        //   id: 'charging-subsection',
        //   position: {x: 0, y: 1, z: 0},
        //   rotation: {x: -80, y: 0, z: 0},
        //   camera: {x: 0, y: 0, z:10 , mm: 24},
        // },
      ];

      arrPositionModel.forEach((k, i) => {
        // position tween
        tl.to(iphone.position, {
          x: k.position.x,
          y: k.position.y,
          z: k.position.z,
          ease: "none",
          duration: 0.5,
        }, i); // sequence by index

        // rotation tween runs concurrently with position
        tl.to(iphone.rotation, {
          x: (k.rotation.x / 180) * Math.PI,
          y: (k.rotation.y / 180) * Math.PI,
          z: (k.rotation.z / 180) * Math.PI,
          ease: "none",
          duration: 0.5,
        }, i);

        // camera tween runs concurrently with position
        tl.to(camera.position, {
          x: k.camera.x,
          y: k.camera.y,
          z: k.camera.z,
          ease: "none",
          duration: 0.5,
        }, i);

        // fov tween runs concurrently with position
        tl.to(camera, {
          fov: k.camera.mm,
          ease: "none",
          duration: 0.5,
          onUpdate: () => camera.updateProjectionMatrix()
        }, i);
      });
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
      console.log('Erorr :' + error);
  });

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  renderer.toneMapping = THREE.NeutralToneMapping;
  // renderer.toneMapping = THREE.ReinhardToneMapping;
  // renderer.toneMapping = THREE.CineonToneMapping;
  // renderer.toneMapping = THREE.NoToneMapping;
  // renderer.toneMapping = THREE.AgXToneMapping;
  renderer.toneMappingExposure = 0.7;
  
  renderer.outputEncoding = THREE.sRGBEncoding;

  // Composition
  const composer = new EffectComposer(renderer);
  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);
  const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.08, 0.4, 1.5);
  composer.addPass(bloomPass);

// Animation
  document.getElementById('container3D').appendChild(renderer.domElement);

  const animate = function () {
    requestAnimationFrame(animate);
    // composer.render(scene, camera);
    renderer.render(scene, camera);
    // only rotate if the model has finished loading
    // if (iphone) {
    //   iphone.rotation.y += 0.009;
    // }
  };
  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
  });
});

</script>