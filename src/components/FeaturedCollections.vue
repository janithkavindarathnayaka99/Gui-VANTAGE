<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <section class="px-16 py-32 max-w-[1440px] mx-auto">
    <div class="flex justify-between items-end mb-16">
      <div>
        <span class="font-label-caps text-label-caps text-primary-fixed block mb-2">CURATED SERIES</span>
        <h2 class="font-headline-md text-headline-md text-white">COLLECTIONS</h2>
      </div>
      <router-link to="/" class="text-white/40 font-label-caps text-label-caps hover:text-white transition-colors border-b border-white/10 pb-1">VIEW ALL</router-link>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-12 grid-rows-2 gap-6 h-[800px]">
      <div class="md:col-span-8 md:row-span-2 group relative overflow-hidden glass-panel">
        <img alt="Outerwear collection" class="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-all duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC43wUmt3eOCnLyJtHjHDRpK7fX5TLzax9IqGQ1EhCNj2wnGHl--dM2mwE3ZGxg4Sl5Vy0DnbqDykt7FQPo05hPP1nbygp13cUyeDVueZ9KJzDbl5K_Vp6jDtPzJp2vUYuWZLVeRe_rClkkNe_HPK9_iCO4RuwHx0DxRT6auVC9BdIFkMQTEHFs9UA9ZCmFoPny6DqklI0T9acDrtDgPz_IH86ir3vyF-qxFIkyOsk4AfwgHOJAm6nfw0aFJT90oUsTg0pbCYx9zC5J"/>
        <div class="absolute bottom-10 left-10">
          <h3 class="text-4xl font-headline-md text-white mb-2">STRUCTURAL OUTERWEAR</h3>
          <p class="text-white/60 mb-6 font-body-md">Precision-cut technical layers.</p>
          <button @click="router.push('/')" class="bg-white text-black px-6 py-2 font-label-caps text-label-caps hover:bg-[#BDFF00] transition-colors">EXPLORE</button>
        </div>
      </div>
      <div @click="router.push('/')" class="md:col-span-4 md:row-span-1 group relative overflow-hidden glass-panel cursor-pointer">
        <img alt="Accessories" class="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-all duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCz77DvdBiexnoiyzanMMiitS6K9WNuwMbA_31509X4jXFia2mJ-AbstYoxG9SJrsgEtHe01dREhnAUtimCYOfZGclM9EWKCsr9tRpoGp6z6WWaruSnRMcWrQxP6-A8B92u1LdpL2UTO-711kYlGzISf5Us5ACm8FS1k8jHFzPKEcCaRmeyG5IFgy1lG45r2nH7VJIbxaE8wrsWYbeoTvDok5C8bgS7vc4pfEjlQSij49efc4KVBWiAGV2Hdms6Gw2E989cnJAEOCUK"/>
        <div class="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-black/80 to-transparent">
          <h3 class="text-xl font-headline-md text-white">ACCESSORIES 01</h3>
        </div>
      </div>
      <div @click="router.push('/')" class="md:col-span-4 md:row-span-1 group relative overflow-hidden glass-panel cursor-pointer">
        <img alt="Monochrome Essentials" class="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-all duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7TwQkmQBdufg1kjm5jRahGgRD727T6dY_4fqpX_VWVrgjeHIyySSWvABetV8gW2pJcZL0Fe7e3zzzeRmv9U37oQRDQUX6W_KybnUa2xE4tPaw8DIc78Qg4Pod7mefwTDS2VlLv-nXAJeu4a9GdSd41Bjv1IEkcoE6EfACITB6lhrO_UARiOMu04W9XgkBL1ksShVFvovEkFJ4bX-FIUnriixBGM7MMEWlwicExBnBLa4CvQDxnVMdds_di_3RMgt3QFEDjv_enc5l"/>
        <div class="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-black/80 to-transparent">
          <h3 class="text-xl font-headline-md text-white">ESSENTIALS</h3>
        </div>
      </div>
    </div>
  </section>
</template>
