<script setup>
import HeroSection from './components/HeroSection.vue'
import Navbar from './components/Navbar.vue'
import Model3D from './components/Model_3d.vue'
import Design from './components/DesignSection.vue'
import TimeLine from './components/Time-line-bar.vue'
import Performance from './components/PerformanceSection.vue'

// Design section
import Design_Body_Section from './components/Design-Body-Section.vue'
import Design_Camera_Section from './components/Design-Camera-Section.vue'
import Design_Ports_Section from './components/Design-Ports-Section.vue'
import FooterSection from './components/FooterSection.vue'

// Camera section
// import CameraSection from './components/CameraSection.vue'
</script>

<template>
  <HeroSection/>

  <Design_Body_Section />
  <Design_Camera_Section />
  <Design_Ports_Section />

  <FooterSection/>

  <Model3D/>  
  <!-- <div class="h-screen"></div> -->


  <!-- <Design /> -->
  <!-- <Performance/> -->
  <!-- <Navbar/> -->
  <TimeLine/>
</template>