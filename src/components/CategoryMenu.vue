<script setup lang="ts">
type CategoryMenuProps = {
  categories: string[]
  menuOpen: boolean
  mobile?: boolean
}

const props = defineProps<CategoryMenuProps>()
const emit = defineEmits<{
  (e: 'toggle'): void
  (e: 'select', category: string): void
}>()
</script>

<template>
  <div :class="props.mobile ? 'border-b border-[#C8FF00]/70 py-4' : 'relative'">
    <button
      type="button"
      class="relative flex items-center gap-1.5 py-2 text-[13px] font-medium uppercase tracking-[0.16em] text-white/55 transition-colors duration-200 after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-[#C8FF00] after:transition-all after:duration-200 hover:text-white hover:after:w-full"
      :aria-expanded="props.menuOpen"
      aria-haspopup="true"
      @click.stop="emit('toggle')"
    >
      Category
      <span class="material-symbols-outlined text-[16px] leading-none transition-transform duration-200" :class="{ 'rotate-180': menuOpen }">expand_more</span>
    </button>

    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="props.menuOpen" :class="props.mobile ? 'mt-3 space-y-1' : 'absolute left-1/2 top-full mt-5 w-64 -translate-x-1/2 border-t border-[#C8FF00] bg-[#111111] p-3 shadow-2xl shadow-black/40'">
        <button
          v-for="category in props.categories"
          :key="category"
          type="button"
          class="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium uppercase tracking-[0.12em] text-white transition-colors hover:text-[#C8FF00]"
          @click="emit('select', category)"
        >
          {{ category }}
          <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
      </div>
    </transition>
  </div>
</template>
