<template>
    <div id="scroll-progress-bar" :class="[
            'fixed left-1/2 bottom-2 -translate-x-1/2 w-[40vw] h-6 px-20 rounded-full bg-black bg-opacity-30 pointer-events-none opacity-0 liquid-glass px-20 transition-opacity duration-400 ease-[cubic-bezier(.4,0,.2,1)] z-[1000] flex items-center justify-center',
            isVisible ? 'opacity-100' : '',
        ]">
        <div
            class="bar absolute left-50 right-50 top-1/2 h-0.5 bg-white rounded w-[95%] -translate-y-1/2 shadow-[0_0_8px_0_rgba(255,255,255,0.08)]">
        </div>
        <div class="circle absolute top-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_16px_4px_rgba(255,255,255,0.4),0_2px_8px_0_rgba(0,0,0,0.12)] -translate-y-1/2 transition-[left] duration-250 ease-[cubic-bezier(.4,0,.2,1)]"
            :style="{ left: circleLeft + '%' }"></div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                circleLeft: 0,
                isVisible: false,
                ticking: false,
            };
        },
        mounted() {
            window.addEventListener('scroll', this.onScroll, { passive: true });
            this.onScroll(); // initialize
        },
        beforeDestroy() {
            window.removeEventListener('scroll', this.onScroll);
        },
        methods: {
            onScroll() {
                if (!this.ticking) {
                    window.requestAnimationFrame(() => {
                        const scrollTop = window.scrollY || window.pageYOffset;
                        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                        let progress = docHeight > 0 ? scrollTop / docHeight : 0;
                        progress = Math.max(0, Math.min(1, progress));
                        this.circleLeft = progress * 90; // 0% to 90% (since bar is 90vw)
                        this.isVisible = progress > 0.01;
                        this.ticking = false;
                    });
                    this.ticking = true;
                }
            },
        },
    };
</script>

<style scoped>
    @media (max-width: 600px) {
        #scroll-progress-bar {
            width: 98vw;
            max-width: 100vw;
            bottom: 16px;
        }
    }

    body {
        background: #18181b;
    }
</style>