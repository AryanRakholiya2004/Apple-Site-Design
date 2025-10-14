<template>
  <section
    class="design-edge-section p-10 h-screen mb-[1000px] overflow-hidden"
  >
    <div
      class="bg-white w-full mx-auto rounded-[2em] h-full overflow-hidden"
      id="main_area_design_edge"
    >
      <div class="flex w-full h-auto items-center justify-center">
        <div class="left w-1/3 h-auto p-10">
          <div class="box bg-black rounded-2xl h-full w-full"></div>
        </div>

        <!-- -------------------------------------- Edge & Connectivity --------------------------------------------- -->
        <div
          class="section right w-2/3 h-full border-stone-200 border-s-2 font-mono py-7"
          id="right-edge"
        >
          <h1
            class="ms-4 px-4 text-7xl text-stone-800 font-pop font-semibold uppercase"
          >
            Edge & Connectivity
          </h1>
          <h1
            class="ms-8 text-2xl text-stone-600 font-rob flex items-center gap-3 mt-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                fill-rule="evenodd"
                d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10m.47-13.53a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l1.72-1.72H8a.75.75 0 0 1 0-1.5h6.19l-1.72-1.72a.75.75 0 0 1 0-1.06"
                clip-rule="evenodd"
              />
            </svg>
            Sculpted edges. Seamless connections.
          </h1>

          <span class="mt-9 w-full h-[1px] bg-stone-200 block"></span>

          <ul class="pt-6 px-9 gap-8">
            <li
              class="font-mono text-lg text-stone-600 opacity-60 hover:opacity-100 hover:scale-[101%] transition-all duration-500"
            >
              <span class="font-semibold text-stone-800 font-pop uppercase"
                >Edges :</span
              >
              Precision-beveled chamfer with matte micro-finish for tactile grip
              and refined reflections.
            </li>
            <li
              class="font-mono text-lg text-stone-600 opacity-60 hover:opacity-100 hover:scale-[101%] transition-all duration-500"
            >
              <span class="font-semibold text-stone-800 font-pop uppercase"
                >Ports :</span
              >
              Universal USB-C with fast PD charging and high-speed data
              transfer; sealed port gasket for improved ingress protection.
            </li>
            <li
              class="font-mono text-lg text-stone-600 opacity-60 hover:opacity-100 hover:scale-[101%] transition-all duration-500"
            >
              <span class="font-semibold text-stone-800 font-pop uppercase"
                >Wireless :</span
              >
              MagSafe-compatible magnetic charging, Qi wireless, and rapid
              reverse wireless charging.
            </li>
            <li
              class="font-mono text-lg text-stone-600 opacity-60 hover:opacity-100 hover:scale-[101%] transition-all duration-500"
            >
              <span class="font-semibold text-stone-800 font-pop uppercase"
                >Connectivity :</span
              >
              Wi‑Fi 6E, Bluetooth 5.4, Ultra Wideband (UWB) and dual eSIM +
              physical SIM support.
            </li>
            <li
              class="font-mono text-lg text-stone-600 opacity-60 hover:opacity-100 hover:scale-[101%] transition-all duration-500"
            >
              <span class="font-semibold text-stone-800 font-pop uppercase"
                >Sealing :</span
              >
              Precision gasket and micro-louver drainage delivering IP68 water
              and dust resistance.
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

onMounted(() => {
  const tl = gsap.timeline();

  tl.to("#main_area_design_edge", {
    ease: "power2.inOut",
    duration: 1.5,
    scrollTrigger: {
      id: "main_area-edge",
      trigger: ".design-edge-section",
      start: "top 0%",
      end: "bottom -100%",
      scrub: 1.6,
      //   markers: true,
      pin: true,
      onEnter: () => {
        window.dispatchEvent(
          new CustomEvent("model-section-change", {
            detail: {
              position: { x: -7, y: 1, z: 0 },
              rotation: { x: -56, y: -135, z: 0 },
              camera: { x: 0, y: 0, z: 15, mm: 36 },
            },
          })
        );
      },
      onEnterBack: () => {
        window.dispatchEvent(
          new CustomEvent("model-section-change", {
            detail: {
              position: { x: -7, y: 1, z: 0 },
              rotation: { x: -56, y: -135, z: 0 },
              camera: { x: 0, y: 0, z: 15, mm: 36 },
            },
          })
        );
      },
    },
  });

  tl.from("#right-edge", {
    x: 100,
    opacity: 0,
    duration: 0.8,
    ease: "Power1.easeInOut",
    scrollTrigger: {
      id: "right-edge",
      trigger: ".design-edge-section",
      start: "top 100%",
      end: "bottom 60%",
      scrub: 1,
      // markers: true,
    },
  });

  tl.to("#main_area_design_edge", {
    scale: 1.2,
    duration: 0.8,
    scrollTrigger: {
      id: "fade-edge",
      trigger: ".design-edge-section",
      start: "top -100%",
      end: "bottom 50%",
      scrub: 1.2,
      pin: true,
      // markers: true,
    },
  })
});
</script>
