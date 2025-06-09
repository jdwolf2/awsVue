<template>
  <div class="p-4 space-y-4">
    <!-- trigger button -->
    <button
      @click="openDatePicker"
      class="px-4 py-2 bg-blue-600 text-white rounded"
    >
      Select Date
    </button>

    <!-- Syncfusion picker -->
    <SyncfusionDateRangePicker
      ref="picker"
      @update:startDate="startDate = $event"
      @update:stopDate="stopDate = $event"
    />

    <!-- only the formatted dates are visible -->
    <div><strong>Start:</strong> {{ formattedStartDate }}</div>
    <div><strong>End:</strong> {{ formattedStopDate }}</div>

    <!-- hidden fields preserve the UNIX values for later -->
    <input type="hidden" :value="startDate" name="startDate" />
    <input type="hidden" :value="stopDate" name="stopDate" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import SyncfusionDateRangePicker from './SyncfusionDateRangePicker.vue'

const picker = ref(null)
const startDate = ref(null) // UNIX seconds
const stopDate = ref(null)

function openDatePicker() {
  picker.value.openPicker()
}

function formatUnix(unix) {
  if (unix == null) return '—'
  const d = new Date(unix * 1000)
  const m = d.toLocaleString('en-US', { month: 'short' })
  return `${m} ${d.getDate()} ${d.getFullYear()}`
}

const formattedStartDate = computed(() => formatUnix(startDate.value))
const formattedStopDate = computed(() => formatUnix(stopDate.value))
</script>
