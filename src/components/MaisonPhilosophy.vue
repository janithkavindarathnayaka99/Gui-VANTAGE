<script setup lang="ts">
const scrollToFooter = () => {
  document.querySelector('footer')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section class="py-32 px-16 max-w-[1440px] mx-auto text-center">
    <div class="max-w-2xl mx-auto">
      <span class="font-label-caps text-label-caps text-primary-fixed mb-8 block">THE MAISON</span>
      <p class="font-headline-md text-[2rem] text-white leading-relaxed mb-12">"VANTAGE IS A STUDY OF REDUCTION. WE CREATE ONLY WHAT IS ESSENTIAL, REFINING EVERY LINE UNTIL ONLY PRECISION REMAINS."</p>
      <button @click="scrollToFooter" class="border-b-2 border-[#BDFF00] text-[#BDFF00] font-label-caps text-label-caps pb-2 hover:text-white hover:border-white transition-all">READ OUR MANIFESTO</button>
    </div>
  </section>
</template>
