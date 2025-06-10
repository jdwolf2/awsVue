<template>
  <div class="date-dog">
    <div class="top-line">
      <button @click="openDatePicker" class="select-date">Select Date</button>

      <!-- Syncfusion picker -->
      <SyncfusionDateRangePicker
        ref="picker"
        @update:startDate="startDate = $event"
        @update:stopDate="stopDate = $event"
      />

      <div class="logo">
        <img src="./assets/tableLogo.jpg" alt="AccuSalt Logo" class="logo" />
      </div>
    </div>
    <!-- hidden fields preserve the UNIX values for later -->
    <input type="hidden" :value="startDate" name="startDate" />
    <input type="hidden" :value="stopDate" name="stopDate" />
    <!-- only the formatted dates are visible -->
  </div>
</template>

<script setup>
/* eslint-disable */
import { ref, computed } from 'vue'
import SyncfusionDateRangePicker from './DtRang.vue'

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
