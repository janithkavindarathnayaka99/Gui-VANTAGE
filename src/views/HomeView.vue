<script setup lang="ts">
import TopNavBar from '../components/TopNavBar.vue'
import HeroSection from '../components/HeroSection.vue'
import FeaturedCollections from '../components/FeaturedCollections.vue'
import NewArrivals from '../components/NewArrivals.vue'
import MaisonPhilosophy from '../components/MaisonPhilosophy.vue'
import FooterComponent from '../components/FooterComponent.vue'
</script>

<template>
  <div class="min-h-screen">
    <TopNavBar />
    <main class="pt-24">
      <HeroSection />
      <FeaturedCollections id="collections" />
      <NewArrivals id="new-arrivals" />
      <MaisonPhilosophy id="maison" />
    </main>
    <FooterComponent />
  </div>
</template>
