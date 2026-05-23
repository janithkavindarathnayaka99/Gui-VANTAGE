<script setup lang="ts">
// NotFoundView — simple 404 page
</script>

<template>
  <div class="bg-[#050505] min-h-screen text-white flex items-center justify-center">
    <div class="text-center max-w-xl px-6">
      <div class="text-[6rem] font-display-lg text-[#BDFF00] leading-none">404</div>
      <div class="text-2xl font-semibold text-white mt-2">PAGE NOT FOUND</div>
      <p class="text-white/40 mt-4">The collection you're looking for doesn't exist.</p>
      <div class="mt-8">
        <router-link to="/" class="bg-[#BDFF00] text-black px-10 py-4 font-bold rounded-full">Back to Home</router-link>
      </div>
    </div>
  </div>
</template>
