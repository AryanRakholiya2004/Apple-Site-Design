<template>
    <section class="section h-screen w-screen">
        <div class="bg-white h-full w-full" id="camera-section">Hello</div>
    </section>
</template>

<script setup>

import { onMounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

onMounted(() => {
  const tl = gsap.timeline();
//   tl.to("#camera-section", {
//     opacity: 1,
//     duration: 0.8,
//     scrollTrigger: {
//       id: "camera-section",
//       trigger: ".section",
//       start: "top 100%",
//       end: "bottom 50%",
//       scrub: 1.2,
//       pin: true,
//       // markers: true,
//     },
//   });
});

</script>