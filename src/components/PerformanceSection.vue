<template>
  <section class="section h-screen w-screen mb-[2000px]">
    <h1>Perfomance</h1>
    <!-- keep layout in document flow but hide visuals until ready -->
    <div class="container-fluid" id="per-container" aria-hidden="true">
      <div class="flex h-screen w-screen bg-stone-500">
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let tl = null;
let started = false;
let designComplete = false;
let visible = false;
let observer = null;
let eventListener = null;
let fallbackTimer = null;

function createTimeline() {
  if (started) return;
  const triggerSelector = "#per-container";
  // reveal visuals immediately before creating ScrollTrigger so user doesn't see raw elements
  gsap.set(triggerSelector, { autoAlpha: 1 });

  tl = gsap.timeline({
    scrollTrigger: {
      trigger: triggerSelector,
      start: "top center",
      end: "bottom top",
      scrub: 1,
      pin: true,
      // markers: true,
    },
  });

  // example perf animations
  tl.to(triggerSelector, {
    backgroundColor: "#000000",
    duration: 0.4,
    ease: "power2.inOut",
  });

  tl.to(triggerSelector, {
    width: "100vw",
    backgroundColor: "#ffffff",
    duration: 0.4,
    ease: "power2.inOut",
  });

  started = true;
}

function tryStart() {
  if (started) return;
  if (!designComplete) return;
  if (!visible) return;
  // ensure layout settled
  requestAnimationFrame(() => createTimeline());
}

onMounted(() => {
  const perEl = document.getElementById("per-container");
  if (!perEl) return;

  // hide visuals until we are ready (keeps layout in flow)
  gsap.set(perEl, { autoAlpha: 0 });

  // IntersectionObserver: mark visible when the section is well in viewport
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        visible = entry.isIntersecting;
        if (visible) tryStart();
      });
    },
    { threshold: 0.5 } // require 50% visible to start
  );
  observer.observe(perEl);

  // Listen for DesignSection completion event
  eventListener = () => {
    designComplete = true;
    tryStart();
  };
  window.addEventListener("designAnimationsComplete", eventListener);

  // If design already finished earlier, mark it
  if (window.designAnimationsComplete === true) {
    designComplete = true;
  }

  // Fallback: if event never fires, allow start after 30s (long dev fallback)
  fallbackTimer = setTimeout(() => {
    designComplete = true;
    tryStart();
  }, 30000);
});

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect();
    observer = null;
  }
  if (eventListener) {
    window.removeEventListener("designAnimationsComplete", eventListener);
    eventListener = null;
  }
  if (fallbackTimer) {
    clearTimeout(fallbackTimer);
    fallbackTimer = null;
  }
  if (tl) {
    try {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    } catch (e) { /* ignore */ }
    tl = null;
  }
});
</script>
