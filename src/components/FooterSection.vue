<template>
  <section
    id="footer-section"
    ref="footerSection"
    class="w-screen h-fit bg-transparent relative backdrop-blur-md z-50"
  >
    <footer
      id="site-footer"
      class="w-full bg-white/90 border-t border-gray-200 text-gray-700 text-sm"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div class="max-w-7xl mx-auto px-6 py-12">
        <nav class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6" aria-label="Footer navigation">
          <div>
            <h4 class="font-semibold text-md font-pop mb-3">Products</h4>
            <ul class="space-y-2">
              <li><a class="hover:underline" href="#site-footer">Mac</a></li>
              <li><a class="hover:underline" href="#site-footer">iPad</a></li>
              <li><a class="hover:underline" href="#site-footer">iPhone</a></li>
              <li><a class="hover:underline" href="#site-footer">Watch</a></li>
              <li><a class="hover:underline" href="#site-footer">Accessories</a></li>
            </ul>
          </div>

          <div>
            <h4 class="font-semibold text-md font-pop mb-3">Services</h4>
            <ul class="space-y-2">
              <li><a class="hover:underline" href="#site-footer">Apple Music</a></li>
              <li><a class="hover:underline" href="#site-footer">iCloud</a></li>
              <li><a class="hover:underline" href="#site-footer">Apple TV+</a></li>
              <li><a class="hover:underline" href="#site-footer">App Store</a></li>
            </ul>
          </div>

          <div>
            <h4 class="font-semibold text-md font-pop mb-3">Support</h4>
            <ul class="space-y-2">
              <li><a class="hover:underline" href="#site-footer">Customer Support</a></li>
              <li><a class="hover:underline" href="#site-footer">Manuals & Guides</a></li>
              <li><a class="hover:underline" href="#site-footer">Repair & Service</a></li>
              <li><a class="hover:underline" href="#site-footer">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h4 class="font-semibold text-md font-pop mb-3">Account</h4>
            <ul class="space-y-2">
              <li><a class="hover:underline" href="#site-footer">Manage Account</a></li>
              <li><a class="hover:underline" href="#site-footer">Orders</a></li>
              <li><a class="hover:underline" href="#site-footer">Redeem</a></li>
              <li><a class="hover:underline" href="#site-footer">Gift Cards</a></li>
            </ul>
          </div>

          <div>
            <h4 class="font-semibold text-md font-pop mb-3">Company</h4>
            <ul class="space-y-2">
              <li><a class="hover:underline" href="#site-footer">About</a></li>
              <li><a class="hover:underline" href="#site-footer">Careers</a></li>
              <li><a class="hover:underline" href="#site-footer">Newsroom</a></li>
              <li><a class="hover:underline" href="#site-footer">Investors</a></li>
            </ul>
          </div>

          <div>
            <h4 class="font-semibold text-md font-pop mb-3">Legal & Settings</h4>
            <ul class="space-y-2">
              <li><a class="hover:underline" href="#site-footer">Privacy Policy</a></li>
              <li><a class="hover:underline" href="#site-footer">Terms of Use</a></li>
              <li><a class="hover:underline" href="#site-footer">Accessibility</a></li>
              <li class="pt-2">
                <label for="footer-country" class="sr-only">Choose your country</label>
                <div class="flex items-center gap-3">
                  <span class="text-lg">🌐</span>
                  <select
                    id="footer-country"
                    class="bg-transparent border border-gray-200 rounded px-2 py-1 text-sm"
                    aria-label="Select country"
                    title="Select country or region"
                  >
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Canada</option>
                    <option>Australia</option>
                  </select>
                </div>
              </li>
            </ul>
          </div>
        </nav>

        <div class="mt-8 border-t border-gray-100 pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div class="text-gray-500 text-xs">
            <p>© 2025 Aryan. All rights reserved.</p>
            <p class="mt-1">The names of products and services are trademarks of their respective owners.</p>
          </div>

          <div class="flex items-center gap-6 text-xs text-gray-500">
            <a class="hover:underline" href="#">Privacy</a>
            <a class="hover:underline" href="#">Legal</a>
            <a class="hover:underline" href="#">Site Map</a>
            <a class="hover:underline" href="#hero-section" title="Back to top">Back to top ↑</a>
          </div>
        </div>
      </div>
    </footer>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const footerSection = ref(null);

onMounted(() => {
  // animate from transparent -> white
  gsap.fromTo(
    footerSection.value,
    { backgroundColor: "rgba(255, 255, 255, 0.3)" },
    {
      backgroundColor: "rgba(255, 255, 255, 1)",
      duration: 1.5,
      ease: "power2.inOut",
      scrollTrigger: {
        id: "footer-section-trigger",
        trigger: footerSection.value,
        start: "top top",
        end: "bottom -100%",
        scrub: false,
        pin: true,
        pinSpacing: false, // prevent extra space added after pin ends
        // markers: true,
      },
    }
  );
  gsap.to('#footer-section',{
    ease: "power2.inOut",
    duration: 1.5,
    scrollTrigger: {
      id: "footer-section-content",
      trigger: '#footer-section',
      start: "top 100%",
      end: "bottom -100%",
      scrub: 1.2,
      //   markers: true,
      onEnter: () => {
        window.dispatchEvent(
          new CustomEvent("model-section-change", {
            detail: {
              position: { x: 0, y: 2, z: 0 },
              rotation: { x: -90, y: 180, z: 90 },
              camera: { x: 0, y: 0, z: 20, mm: 20 },
            },
          })
        );
      },
      onEnterBack: () => {
        window.dispatchEvent(
          new CustomEvent("model-section-change", {
            detail: {
              position: { x: 5, y: 2, z: 5 },
              rotation: { x: -30, y: 45, z: 0 },
              camera: { x: 0, y: 0, z: 20, mm: 50 },
            },
          })
        );
      },
    },
  })
});

</script>