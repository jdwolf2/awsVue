<template>
  <div class="date-">
    <div class="top-line">
      <button @click="openDatePicker" class="select-date">
        {{ dateButtonText }}
      </button>

      <div style="display: inline-block; position: relative">
        <input
          type="text"
          class="date-input"
          :value="dateRangeDisplay"
          readonly
          @mouseenter="showTooltip = true"
          @mouseleave="hideTooltip"
        />
        <div
          v-if="showTooltip"
          class="custom-tooltip"
          style="
            position: absolute;
            top: 100%;
            left: 0;
            background: #333;
            color: #fff;
            padding: 6px 10px;
            border-radius: 6px;
            white-space: nowrap;
            z-index: 10;
            font-size: 0.9rem;
          "
        >
          use the {{ dateButtonText }} button
        </div>
      </div>

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

// --- New computed for combined date range display
const dateRangeDisplay = computed(() =>
  startDate.value && stopDate.value
    ? `${formattedStartDate.value}  to  ${formattedStopDate.value}`
    : ''
)

// --- Computed for dynamic button text
const dateButtonText = computed(() =>
  startDate.value && stopDate.value ? 'Change Date' : 'Select Date'
)

// --- Tooltip logic
const showTooltip = ref(false)
let tooltipTimeout = null

function hideTooltip() {
  tooltipTimeout = setTimeout(() => {
    showTooltip.value = false
  }, 150) // Tooltip hides quickly; adjust ms if you want it faster/slower
}

// Optional: clear timeout if mouse re-enters quickly
function onMouseEnter() {
  if (tooltipTimeout) clearTimeout(tooltipTimeout)
  showTooltip.value = true
}
</script>
