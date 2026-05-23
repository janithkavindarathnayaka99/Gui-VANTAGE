<script setup lang="ts">
// Footer Component
</script>

<template>
  <footer class="bg-[#050505] border-t border-white/5">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 px-16 py-24 max-w-[1440px] mx-auto">
      <div>
        <div class="text-xl font-bold text-white mb-4 font-headline-md">VANTAGE</div>
        <p class="text-white/40 font-body-md max-w-sm mb-8 text-[14px]">The vanguard of luxury technical apparel. Engineered in Paris. Crafted for eternity.</p>
        <div class="flex gap-6">
          <a class="text-white/30 hover:text-[#BDFF00] transition-colors" href="#"><span class="material-symbols-outlined" data-icon="share">share</span></a>
          <a class="text-white/30 hover:text-[#BDFF00] transition-colors" href="#"><span class="material-symbols-outlined" data-icon="public">public</span></a>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-8">
        <div class="flex flex-col gap-4 font-manrope text-[12px] uppercase tracking-widest">
          <a class="text-white/30 hover:text-[#BDFF00] transition-colors opacity-100 hover:opacity-80" href="#">Privacy Policy</a>
          <a class="text-white/30 hover:text-[#BDFF00] transition-colors opacity-100 hover:opacity-80" href="#">Terms of Service</a>
        </div>
        <div class="flex flex-col gap-4 font-manrope text-[12px] uppercase tracking-widest">
          <a class="text-white/30 hover:text-[#BDFF00] transition-colors opacity-100 hover:opacity-80" href="#">Shipping &amp; Returns</a>
          <a class="text-white/30 hover:text-[#BDFF00] transition-colors opacity-100 hover:opacity-80" href="#">Contact</a>
        </div>
      </div>
    </div>
    <div class="px-16 pb-12 max-w-[1440px] mx-auto">
      <div class="pt-12 border-t border-white/5 text-white/20 font-manrope text-[12px] uppercase tracking-[0.2em] text-center">
        © 2024 VANTAGE COLLECTIVE. ALL RIGHTS RESERVED.
      </div>
    </div>
  </footer>
</template>
