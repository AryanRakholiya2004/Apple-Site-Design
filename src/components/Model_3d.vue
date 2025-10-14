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
  loader.load('src/assets/iPhone_model.glb',
    function (gltf) {
      iphone = gltf.scene;

      iphone.position.set(0, -2, 0);
      var rot_x = 0;
      var rot_y = 180;
      var rot_z = 0;

      iphone.rotation.set((rot_x/180) * Math.PI, (rot_y/180) * Math.PI, (rot_z/180) * Math.PI);
      scene.add(iphone);
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
      console.log('Error :' + error);
    }
  );

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.toneMappingExposure = 0.7;
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.shadowMap.enabled = true;
  // renderer.shadowMap.type = THREE.VSMShadowMap;
  renderer.shadowMap.type = THREE.PCFShadowMap;

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
    renderer.render(scene, camera);
  };
  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
  });

  // Event-driven model/camera control
  window.addEventListener('model-section-change', (e) => {
    if (!iphone) return; // Ensure model is loaded
    const { position, rotation, camera: cam } = e.detail;
    console.log('Model/Camera Change Event:', e.detail);
    gsap.to(iphone.position, { ...position, duration: 1 });
    gsap.to(iphone.rotation, {
      x: (rotation.x / 180) * Math.PI,
      y: (rotation.y / 180) * Math.PI,
      z: (rotation.z / 180) * Math.PI,
      duration: 1
    });
    gsap.to(camera.position, { ...cam, duration: 1 });
    gsap.to(camera, {
      fov: cam.mm,
      duration: 1,
      onUpdate: () => camera.updateProjectionMatrix()
    });
  });
});
</script>