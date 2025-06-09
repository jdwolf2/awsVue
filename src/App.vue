<template>
  <div class="p-4 space-y-4">
    <!-- Hidden native inputs -->
    <input type="date" ref="startRef" @change="onStartChange" class="hidden" />
    <button
      @click="openPicker(startRef)"
      class="px-4 py-2 bg-blue-600 text-white rounded"
    >
      Select Start Date
    </button>
    <div><strong>startDate:</strong> {{ startDate ?? '—' }}</div>

    <input type="date" ref="stopRef" @change="onStopChange" class="hidden" />
    <button
      @click="openPicker(stopRef)"
      class="px-4 py-2 bg-green-600 text-white rounded"
    >
      Select Stop Date
    </button>
    <div><strong>stopDate:</strong> {{ stopDate ?? '—' }}</div>
  </div>
</template>

<script setup>
import './style.css'
import { ref, watch } from 'vue'

// Define emits for date changes
const emit = defineEmits<{
  (e: 'update:startDate', value: number | null): void
  (e: 'update:stopDate', value: number | null): void
}>()

// Refs for hidden inputs
const startRef = ref<HTMLInputElement | null>(null)
const stopRef = ref<HTMLInputElement | null>(null)

// Reactive UNIX timestamp state
const startDate = ref<number | null>(null)
const stopDate = ref<number | null>(null)

// Open native date picker
function openPicker(elementRef: typeof startRef) {
  const el = elementRef.value
  if (!el) return
  if (typeof (el as any).showPicker === 'function') {
    ;(el as any).showPicker()
  } else {
    el.focus()
    el.click()
  }
}

// Convert ISO date to UNIX timestamp
function onStartChange(event: Event) {
  const iso = (event.target as HTMLInputElement).value
  startDate.value = iso ? Math.floor(new Date(iso).getTime() / 1000) : null
}
function onStopChange(event: Event) {
  const iso = (event.target as HTMLInputElement).value
  stopDate.value = iso ? Math.floor(new Date(iso).getTime() / 1000) : null
}

// Emit updates
watch(startDate, (val) => emit('update:startDate', val))
watch(stopDate, (val) => emit('update:stopDate', val))
</script>
