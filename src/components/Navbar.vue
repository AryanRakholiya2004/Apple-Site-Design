<template>
  <div class="navbar">
    <div class="fixed bottom-0 left-0 w-screen flex justify-center items-center pb-4 z-50 font-pop">
        <div class="absolute w-2/5 rounded-full flex items-center justify-between text-stone-300 p-1.5 relative" ref="tabsContainer">
            <button ref="tabRefs[0]" class="p-3 px-5">Overview</button>
            <button ref="tabRefs[1]" class="p-3 px-5">Design</button>
            <button ref="tabRefs[2]" class="p-3 px-5">Camera</button>
            <button ref="tabRefs[3]" class="p-3 px-5">Performance</button>
            <button ref="tabRefs[4]" class="p-3 px-5">Compare</button>
            <div ref="indicator" class="tab-indicator liquid-glass"></div>
        </div>
    </div>
    <svg style="display: none">
      <filter
        id="glass-distortion"
        x="0%"
        y="0%"
        width="100%"
        height="100%"
        filterUnits="objectBoundingBox"
      >
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.01 0.01"
          numOctaves="2"
          seed="1"
          result="turbulence"
        />
        <!-- Seeds: 14, 17,  -->

        <feComponentTransfer in="turbulence" result="mapped">
          <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
          <feFuncG type="gamma" amplitude="1" exponent="1" offset="0" />
          <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
        </feComponentTransfer>

        <feGaussianBlur in="turbulence" stdDeviation="100" result="softMap" />

        <feSpecularLighting
          in="softMap"
          surfaceScale="5"
          specularConstant="1"
          specularExponent="120"
          lighting-color="white"
          result="specLight"
        >
          <fePointLight x="-200" y="-200" z="300" />
        </feSpecularLighting>

        <feComposite
          in="specLight"
          operator="arithmetic"
          k1="0"
          k2="1"
          k3="1"
          k4="0"
          result="litImage"
        />

        <feDisplacementMap
          in="SourceGraphic"
          in2="softMap"
          scale="150"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </svg>
</div>
</template>