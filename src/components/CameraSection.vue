<template>
  <section id="camera-section" class="section h-screen w-screen bg-yellow-100 relative">
    <div class="camera-section relative w-full h-full">
      <!-- Slider: initially hidden, revealed after scroll animation -->
      <div
        class="main_sec w-screen h-screen fixed left-1/2 top-1/2 flex z-50 text-7xl opacity-0 items-center justify-center -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      >
        <div class="w-full flex items-center justify-center gap-4 pointer-events-auto">
          <!-- Prev button (Swiper will wire this) -->
          <button type="button" class="px-4 py-2 bg-white/90 rounded-lg shadow-md z-50 swiper-button-prev">
            ‹
          </button>

          <!-- Swiper wrapper -->
          <div class="w-[72vw] max-w-4xl h-80">
            <Swiper
              :modules="modules"
              :slides-per-view="3"
              :space-between="24"
              :centered-slides="true"
              class="h-full"
              navigation
            >
              <SwiperSlide v-for="(s, i) in slides" :key="i" class="snap-center flex-shrink-0 h-full rounded-xl overflow-hidden">
                <img :src="s" class="w-full h-full object-cover" draggable="false" />
              </SwiperSlide>
            </Swiper>
          </div>

          <!-- Next button -->
          <button type="button" class="px-4 py-2 bg-white/90 rounded-lg shadow-md z-50 swiper-button-next">
            ›
          </button>
        </div>
      </div>
  <!-- Masked white section, pinned during scroll -->
  <div class="bg-white h-screen w-screen absolute top-0 left-0 z-0" id="white-section"></div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from "vue";
import cosmic from "../assets/cosmic_orange.jpg";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

// expose components to template
const modules = [Navigation];
const slides = ref([cosmic, cosmic, cosmic, cosmic, cosmic]);

onMounted(() => {
  const el = document.getElementById("camera-section");
  if (!el) return;

  // Set initial mask to fully cover (white everywhere)
  gsap.set("#white-section", {
    mask: "radial-gradient(circle at 50% 50%, white 100%, white 100%)",
    webkitMask: "radial-gradient(circle at 50% 50%, white 100%, white 100%)",
  });

  gsap.set(".main_sec", { opacity: 0, pointerEvents: "none" });

  // Animate mask to reveal the slider
  gsap.to("#white-section", {
    mask: "radial-gradient(circle at 50% 50%, transparent 70%, white 100%)",
    webkitMask: "radial-gradient(circle at 50% 50%, transparent 70%, white 100%)",
    ease: "power2.inOut",
    duration: 1.2,
    scrollTrigger: {
      trigger: el,
      start: "top top",
      end: "bottom -100%",
      scrub: 1.2,
      pin: true,
      // markers: true,
      onLeave: () => {
        // Reveal slider after mask animation
        gsap
          .timeline()
          .to(".main_sec", { opacity: 1, pointerEvents: "auto", duration: 0.45, ease: "power1.out" })
          .fromTo(
            ".main_sec",
            { scale: 0.85, y: 30, opacity: 0 },
            { scale: 1, y: 0, opacity: 1, duration: 0.9, ease: "back.out(1.4)" },
            "-=0.35"
          );
      },
      onEnterBack: () => {
        gsap.to(".main_sec", { opacity: 0, pointerEvents: "none", duration: 0.2 });
      },
    },
  });
});
</script>

<style>
/* The mask starts fully white, then animates to reveal the center */
#white-section {
  mask: radial-gradient(circle at 50% 50%, white 100%, white 100%);
  -webkit-mask: radial-gradient(circle at 50% 50%, white 100%, white 100%);
  transition: mask 0.8s, -webkit-mask 0.8s;
}

/* Slide styling to reproduce scale/blur/opacity effect */
.swiper-slide {
  width: calc((72vw - 48px) / 3); /* match previous sizing (spaceBetween * 2 = 48px) */
  max-width: 28rem;
  transform: scale(.92);
  filter: blur(4px);
  opacity: 0.9;
  transition: transform .3s, filter .3s, opacity .3s;
}

.swiper-slide img {
  display: block;
  height: 100%;
  width: 100%;
  object-fit: cover;
  user-select: none;
  -webkit-user-drag: none;
}

.swiper-slide-active {
  transform: scale(1) !important;
  filter: blur(0) !important;
  opacity: 1 !important;
}

/* optional: hide default swiper navigation visuals if you want custom style */
.swiper-button-prev,
.swiper-button-next {
  background: transparent;
  border: none;
}
</style>
