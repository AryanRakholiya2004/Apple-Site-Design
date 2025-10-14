<template>
  <section
    class="design-camera-section p-10 h-screen overflow-hidden"
  >
    <div
      class="bg-white w-full mx-auto rounded-[2em] h-full overflow-hidden"
      id="main_area_design_camera"
    >
      <div class="flex w-full h-auto items-center justify-center">
        <div class="left w-1/3 h-auto p-10">
          <div class="box bg-black rounded-2xl h-full w-full"></div>
        </div>

        <!-- -------------------------------------- Camera Specs --------------------------------------------- -->
        <div
          class="section right w-2/3 h-full border-stone-200 border-s-2 font-mono py-7"
          id="right-camera"
        >
          <h1
            class="ms-4 px-4 text-7xl text-stone-800 font-pop font-semibold uppercase"
          >
            Camera
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
            Crafted from
            <span class="text-stone-800 font-semibold">Precision.</span>
            Perfected in every detail
          </h1>

          <span class="mt-9 w-full h-[1px] bg-stone-200 block"></span>

          <ul class="p-6 px-9 gap-8">
            <li
              class="font-mono text-lg text-stone-600 opacity-60 hover:opacity-100 hover:scale-[101%] transition-all duration-500"
            >
              <span class="font-semibold text-stone-800 font-pop uppercase"
                >Triple-Lens System :</span
              >
              48MP Main, 48MP Wide and 48MP Telephoto lens.
            </li>
            <li
              class="font-mono text-lg text-stone-600 opacity-60 hover:opacity-100 hover:scale-[101%] transition-all duration-500"
            >
              <span class="font-semibold text-stone-800 font-pop uppercase"
                >Lens Coating :</span
              >
              Nano-matte sapphire lens cover reduces glare and reflection.
            </li>
            <li
              class="font-mono text-lg text-stone-600 opacity-60 hover:opacity-100 hover:scale-[101%] transition-all duration-500"
            >
              <span class="font-semibold text-stone-800 font-pop uppercase"
                >Lens Alignment :</span
              >
              Perfectly leveled lens placement ensures consistent depth and
              shadow response under all lighting angles.
            </li>
            <li
              class="font-mono text-lg text-stone-600 opacity-60 hover:opacity-100 hover:scale-[101%] transition-all duration-500"
            >
              <span class="font-semibold text-stone-800 font-pop uppercase"
                >Material Contrast :</span
              >
              The brushed titanium ring around the camera creates a fine
              contrast against the matte body surface.
            </li>
            <li
              class="font-mono text-lg text-stone-600 opacity-60 hover:opacity-100 hover:scale-[101%] transition-all duration-500"
            >
              <span class="font-semibold text-stone-800 font-pop uppercase"
                >Thermal Optimization :</span
              >
              Hidden micro-vents around the housing maintain temperature
              stability during extended 4K recording.
            </li>
          </ul>

          <div class="flex justify-end">
            <button
              class="bg-stone-100 ps-6 font-semibold rounded-full flex items-center gap-4 hover:scale-[102%] transition-all duration-300 me-9"
            >
              Know More about Camera Specs
              <span class="p-2 rounded-full bg-stone-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    fill-rule="evenodd"
                    d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10M9.97 8.47a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06L12.44 12L9.97 9.53a.75.75 0 0 1 0-1.06"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            </button>
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

  tl.to("#main_area_design_camera", {
    ease: "power2.inOut",
    duration: 1.5,
    scrollTrigger: {
      id: "main_area-camera",
      trigger: ".design-camera-section",
      start: "top 0%",
      end: "bottom -100%",
      scrub: 1.6,
      //   markers: true,
      pin: true,
      onEnter: () => {
        window.dispatchEvent(
          new CustomEvent("model-section-change", {
            detail: {
              position: { x: -8.4, y: 0, z: 0 },
              rotation: { x: 0, y: 180, z: 90 },
              camera: { x: 0, y: 0, z: 9, mm: 48 },
            },
          })
        );
      },
      onEnterBack: () => {
        window.dispatchEvent(
          new CustomEvent("model-section-change", {
            detail: {
              position: { x: -8.4, y: 0, z: 0 },
              rotation: { x: 0, y: 180, z: 90 },
              camera: { x: 0, y: 0, z: 9, mm: 48 },
            },
          })
        );
      },
    },
  });

  tl.from("#right-camera", {
    x: 100,
    opacity: 0,
    duration: 0.8,
    ease: "Power1.easeInOut",
    scrollTrigger: {
      id: "right-camera",
      trigger: ".design-camera-section",
      start: "top 100%",
      end: "bottom 60%",
      scrub: 1,
      // markers: true,
    },
  });
});
</script>
