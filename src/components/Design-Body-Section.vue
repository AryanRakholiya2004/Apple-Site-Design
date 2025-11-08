<template>
  <section class="design-body-section mt-[1000px] p-10 my-20 h-screen overflow-hidden">
    <div class="section bg-white w-full mx-auto rounded-[2em] h-full overflow-hidden" id="main_area_design_body">
      <div
        class="flex w-full h-auto items-center justify-center"
        id="body-content"
      >
        <div class="left w-1/3 h-auto p-10">
          <div class="box bg-black rounded-2xl h-full w-full"></div>
        </div>

        <!-- -------------------------------------- Body Specs --------------------------------------------- -->
        <div
          class="right w-2/3 h-fit border-stone-200 border-s-2 font-mono py-7 overflow-hidden"
          id="right-body"
        >
          <h1
            class="ms-4 px-4 text-7xl text-stone-800 font-pop font-semibold uppercase"
          >
            Aluminium Uni-Body
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
            Built with
            <span class="text-stone-800 font-semibold">Artistic Aluminium Uni-body design</span>
          </h1>

          <span class="mt-9 w-full h-[1px] bg-stone-200 block"></span>

          <ul class="p-6 px-9">
            <li
              class="font-mono text-lg text-stone-600 opacity-60 hover:opacity-100 hover:scale-[101%] transition-all duration-500"
            >
              <span class="font-semibold text-stone-800 font-pop uppercase"
                >Material :</span
              >
              Aluminium
            </li>
            <li
              class="font-mono text-lg text-stone-600 opacity-60 hover:opacity-100 hover:scale-[101%] transition-all duration-500"
            >
              <span class="font-semibold text-stone-800 font-pop uppercase"
                >Durability :</span
              >
              Precision-milled unibody with enhanced structural rigidity
            </li>
            <li
              class="font-mono text-lg text-stone-600 opacity-60 hover:opacity-100 hover:scale-[101%] transition-all duration-500"
            >
              <span class="font-semibold text-stone-800 font-pop uppercase"
                >Finish :</span
              >
              Ultra-fine matte micro-texture for superior grip and reduced
              fingerprints
            </li>
            <li
              class="font-mono text-lg text-stone-600 opacity-60 hover:opacity-100 hover:scale-[101%] transition-all duration-500"
            >
              <span class="font-semibold text-stone-800 font-pop uppercase"
                >Thermal :</span
              >
              Internal vapor chamber for efficient heat dissipation
            </li>
            <li
              class="font-mono text-lg text-stone-600 opacity-60 hover:opacity-100 hover:scale-[101%] transition-all duration-500"
            >
              <span class="font-semibold text-stone-800 font-pop uppercase"
                >Colors :</span
              >
              Cosmic Orange, Deep Blue ,Silver
            </li>
          </ul>

          <!-- colors range -->
          <div class="flex items-center w-full h-[120px] gap-6 ps-9 mb-9">
            <div
              class="box object-cover w-[160px] h-full p-2 border-2 border-slate-300 rounded-xl flex flex-col items-center justify-start bg-slate-200 hover:border-slate-500 transition duration-300"
            >
              <img
                src="../assets/Deep_Blue.png"
                alt=""
                class="h-full w-full object-contain"
              />
              <p class="text-stone-700 font-mono mt-3">Deep Blue</p>
            </div>
            <div
              class="box object-cover w-[160px] h-full p-2 border-2 border-gray-300 rounded-xl flex flex-col items-center justify-start bg-gray-100 hover:border-gray-500 transition duration-300"
            >
              <img
                src="../assets/Silver.png"
                alt=""
                class="h-full w-full object-contain"
              />
              <p class="text-gray-500 font-mono mt-3">Silver</p>
            </div>
            <div
              class="box object-cover w-[160px] h-full p-2 border-2 border-orange-200 rounded-xl flex flex-col items-center justify-start bg-orange-100 hover:border-orange-500 transition duration-300"
            >
              <img
                src="../assets/[CITYPNG.COM]Orange iPhone 17 Pro in Back View - 4000x4000.png"
                alt=""
                class="h-full w-full object-contain"
              />
              <p class="text-orange-700 font-mono mt-3">Cosmic Orange</p>
            </div>
          </div>
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

  tl.to("#main_area_design_body", {
    width: "100%",
    scrollTrigger: {
      id: "main_area",
      trigger: ".design-body-section",
      start: "top 0%",
      end: "bottom -100%",
      scrub: 1.6,
      pin: true,
      onEnter: () => {
        window.dispatchEvent(new CustomEvent('model-section-change', {
          detail: {
            position: { x: -8, y: 0, z: 0 },
            rotation: { x: -30, y: 540, z: 10 },
            camera: { x: 0, y: 0, z: 30, mm: 20 }
          }
        }));
      },
      onEnterBack: () => {
        window.dispatchEvent(new CustomEvent('model-section-change', {
          detail: {
            position: { x: -8, y: 0, z: 0 },
            rotation: { x: -30, y: 540, z: 10 },
            camera: { x: 0, y: 0, z: 30, mm: 20 }
          }
        }));
      },
    },
    duration: 1.2,
    ease: "Power1.easeInOut",
  });

  tl.from('#right-body', {
      x: 100,
      opacity: 0,
      duration: 0.8,
      ease: "Power1.easeInOut",
      scrollTrigger: {
        id: "right-camera",
          trigger: ".design-body-section",
          start: "top 100%",
          end: "bottom 60%",
          scrub: 1,
          // markers: true,
      },
  })
});
</script>
