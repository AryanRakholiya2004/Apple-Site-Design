import { createApp } from 'vue'
import './style.css'
import './index.css'
import App from './App.vue'

// add Lenis + link with GSAP ScrollTrigger
import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const lenis = new Lenis({
  duration: 2, // larger = smoother / slower
  easing: (t) => t, // you can use custom easing
  smooth: true,
  smoothTouch: true,
  lerp: 0.06, // try 0.06..0.12
})

// RAF loop to drive lenis
function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)

// keep ScrollTrigger in sync
lenis.on('scroll', ScrollTrigger.update)

// export if you want to access in components: window.lenis = lenis

createApp(App).mount('#app')
