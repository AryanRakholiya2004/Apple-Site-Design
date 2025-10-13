<script setup>
import HeroSection from './components/HeroSection.vue'
import Navbar from './components/Navbar.vue'
import Model3D from './components/Model_3d.vue'
import Design from './components/DesignSection.vue'
import TimeLine from './components/Time-line-bar.vue'
import Performance from './components/PerformanceSection.vue'
</script>

<template>
  <HeroSection/>
  <Model3D/>  
  <!-- <div class="h-screen"></div> -->
  <Design />
  <!-- <Performance/> -->
  <!-- <Navbar/> -->
  <TimeLine/>
</template>

<script>
import {gsap} from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

window.addEventListener('DOMContentLoaded', () => {
  const scrollTo = (targetY, duration = 1) => {
    gsap.to(window, {
      scrollTo: { y: targetY, autoKill: true },
      duration: duration,
      ease: 'power2.out'
    })
  }

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href')
      if (href && href.startsWith('#')) {
        const target = document.querySelector(href)
        if (target) {
          e.preventDefault()
          scrollTo(target.offsetTop)
        }
      }
    })
  })
})
</script>