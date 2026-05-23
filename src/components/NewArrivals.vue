<script setup lang="ts">
// NewArrivals Component
</script>

<template>
  <section class="bg-surface-container-low py-32 px-16">
    <div class="max-w-[1440px] mx-auto">
      <div class="flex items-center gap-4 mb-16">
        <h2 class="font-headline-md text-headline-md text-white">NEW ARRIVALS</h2>
        <div class="h-px flex-grow bg-white/10"></div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
        <!-- Product 1 -->
        <div class="group cursor-pointer">
          <div class="relative aspect-[3/4] overflow-hidden glass-panel mb-6">
            <img alt="Technical Parka" class="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCt_yBVLXns_FRfJy4V90gKREFyQqoAKF6O_5Ga3kOlYkpIhLRVR0B-KKt40EmQe5b55r2eIjUbd9vYCVDp7SU4VpTYoBQUP3HCgyvTFNJliuxCMoZtFqiYRhcNloq2vEwRoPUntdyUOemXCnyJHJVFO6ubUaZhktwXnTYTFxpIw_g-0cjhopasoeR6vF0jGxj-iqQfWaIBy81goozIJ6bmdOHaFjTdXZSC8LMSVSt9lYVl4SVWKqP79zaTdIKu1cF8QWylGO9RKx9I"/>
            <div class="absolute top-4 left-4">
              <span class="bg-primary-container text-on-primary-container font-label-caps text-[10px] px-2 py-1">LIMITED</span>
            </div>
            <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <button class="bg-[#BDFF00] text-black px-6 py-3 font-label-caps text-label-caps flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                <span class="material-symbols-outlined text-sm" data-icon="shopping_bag">shopping_bag</span>
                ADD TO BAG
              </button>
            </div>
          </div>
          <div class="flex justify-between items-start">
            <div>
              <h4 class="font-title-sm text-title-sm text-white mb-1">KINETIC SHELL 0.4</h4>
              <p class="text-white/40 font-body-md text-sm uppercase">MATTE BLACK</p>
            </div>
            <span class="text-white font-title-sm">€840</span>
          </div>
        </div>
        <!-- Product 2 -->
        <div class="group cursor-pointer">
          <div class="relative aspect-[3/4] overflow-hidden glass-panel mb-6">
            <img alt="Minimalist Trouser" class="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCy9BDneGN3djMWo810_09wBlt3RjyqyZMKuIR-htuTOEl7cycJVzKipzM2vu98DXg8j7mpr4kREI4KE83pEQTNNYJfarWTY8DmWxA4mjvUMdjUtdhvrpxBeUyqgaHMrOC_l6cTv11qHLn_K3dGGqQdU084SNjbVQx0IKXqnd9qbH0WGyIidDpr_YuBUWvXAKEOHkpVtfb1LtGi3UQXA3BLRypDl4QomhzXa0HeildVgc57y4dtGZmthiRTbXgNnsE1yUOdyb7FOHJI"/>
            <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <button class="bg-[#BDFF00] text-black px-6 py-3 font-label-caps text-label-caps flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                <span class="material-symbols-outlined text-sm" data-icon="shopping_bag">shopping_bag</span>
                ADD TO BAG
              </button>
            </div>
          </div>
          <div class="flex justify-between items-start">
            <div>
              <h4 class="font-title-sm text-title-sm text-white mb-1">DRAPE TROUSER</h4>
              <p class="text-white/40 font-body-md text-sm uppercase">ANTHRACITE</p>
            </div>
            <span class="text-white font-title-sm">€420</span>
          </div>
        </div>
        <!-- Product 3 -->
        <div class="group cursor-pointer">
          <div class="relative aspect-[3/4] overflow-hidden glass-panel mb-6">
            <img alt="Vantage Tee" class="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYmVhnCp6vG7lOA1jMuYH-Y-fUZZxRzOHeL7FxWWoylZ8bTiuHFTQS7AHkSE7GoxUBLkypL2APIK-uadtiHkwTm_CjkDXzLMQYtjdQLR1tE5mVeK-M3X9JPJ30cYz9JodHgFh__01BWfXNTtrvvPx9lCZh7lcRcs9ftj28WNbxM6byDBdqK_te-7M_pZbYkQNEciGsdkQrHmS6_4DjU1RwhZx502lZ51bvAtH8ZhkKurSDNU_wb4URYRKi3pYgNsYSA7-7mMWtJ3Q9"/>
            <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <button class="bg-[#BDFF00] text-black px-6 py-3 font-label-caps text-label-caps flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                <span class="material-symbols-outlined text-sm" data-icon="shopping_bag">shopping_bag</span>
                ADD TO BAG
              </button>
            </div>
          </div>
          <div class="flex justify-between items-start">
            <div>
              <h4 class="font-title-sm text-title-sm text-white mb-1">ESSENTIAL TEE</h4>
              <p class="text-white/40 font-body-md text-sm uppercase">OBSIDIAN</p>
            </div>
            <span class="text-white font-title-sm">€180</span>
          </div>
        </div>
        <!-- Product 4 -->
        <div class="group cursor-pointer">
          <div class="relative aspect-[3/4] overflow-hidden glass-panel mb-6">
            <img alt="Technical Boot" class="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsgIbCFDMwM2FUWXEk6Sp2zIulVhIhlHsUNXewN58bOhY4SYMLPVFsgIgcawAZ35cZYJCqrPP1qUDW9KnrVS-zFSZoj9X4z6A1RY2yTBq-5o3umpaohjdBiDJU1E9GB1khAQIfZ5exRxDG-Oo_ZCTNgIrk_rxBZFGFRPfPFA_-6eeTT8cIsT4Y8fg7sNWhKi9o-AkijSpc4nE6nHda2DybrRnCTjA4apEZ_DQ18iGk3pkW7lawVsucmS-Kc0JFxZ8pOlWT3O3VSivj"/>
            <div class="absolute top-4 left-4">
              <span class="bg-[#BDFF00] text-black font-label-caps text-[10px] px-2 py-1">NEW</span>
            </div>
            <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <button class="bg-[#BDFF00] text-black px-6 py-3 font-label-caps text-label-caps flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                <span class="material-symbols-outlined text-sm" data-icon="shopping_bag">shopping_bag</span>
                ADD TO BAG
              </button>
            </div>
          </div>
          <div class="flex justify-between items-start">
            <div>
              <h4 class="font-title-sm text-title-sm text-white mb-1">ORBIT BOOT</h4>
              <p class="text-white/40 font-body-md text-sm uppercase">TECH BLACK</p>
            </div>
            <span class="text-white font-title-sm">€1,150</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
