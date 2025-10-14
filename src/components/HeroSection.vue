<template>
  <section id="hero-section" class="section">
    <div class="w-screen bg-black h-screen relative mb-[200px]">

      <div class="flex items-center justify-between p-4 relative z-50 font-pop">
        <div class="img_box">
          <img src="../assets/icons8-apple.svg" alt="" class="h-[36px]">
        </div>

        <div>
          <h1 class="text-white text-center ms-20 text-2xl mt-2 font-rob font-bold">iPhone 17 Pro</h1>
        </div>

        <div class="top_right_btn flex gap-2 items-center justify-center text-stone-300">
          <button class="liquid-glass p-2 px-4 rounded-full hover:bg-stone-100 transition duration-300 hover:text-stone-800 hover:shadow-inner">Sign-in</button>
          <button class="liquid-glass p-2 px-4 rounded-full bg-white text-stone-800 hover:bg-opacity-5 hover:text-stone-100 transition duration-300">Explore</button>
        </div>
      </div>

      <div class="img_box w-full pt-28 relative">
        <div class="fixed bg-orange-500 bg-opacity-10 h-[500px] w-[500px] rounded-full top-1/3 left-1/3 blur-[200px]"></div>
      </div>
    </div>
  </section>
</template>

<script setup>

import { onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

onMounted(() => {
  const dispatchModelChange = (detail) => {
    window.dispatchEvent(new CustomEvent('model-section-change', { detail }));
  };

  const presets = {
    default: {
      position: { x: 0, y: -2, z: 0 },
      rotation: { x: 0, y: 180, z: 0 },
      camera: { x: 0, y: 0, z: 24, mm: 20 }
    },
  };

  // initial model state
  dispatchModelChange(presets.default);

  // Explore button -> trigger explore view
  const btns = document.querySelectorAll('.top_right_btn button');
  if (btns.length >= 2) {
    const exploreBtn = btns[1];
    exploreBtn.addEventListener('click', () => dispatchModelChange(presets.explore));
  }

  // change model based on scroll position of the hero section
  ScrollTrigger.create({
    trigger: '#hero-section',
    start: 'top top',
    end: 'bottom top',
    scrub: 1,
    onEnter: () => dispatchModelChange(presets.default),
    onEnterBack: () => dispatchModelChange(presets.default),
  });
});


</script>