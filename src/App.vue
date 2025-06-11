<template>
  <div class="date-">
    <div class="top-line">
      <!-- Sign In/Out Buttons -->
      <button
        class="select-date"
        v-if="!isAuthenticated"
        @click="onSignInClick"
      >
        Sign in
      </button>
      <button
        class="select-date"
        v-if="isAuthenticated"
        @click="onSignOutClick"
      >
        Sign out
      </button>

      <!-- Logo -->
      <div class="logo">
        <img src="./assets/tableLogo.jpg" alt="AccuSalt Logo" class="logo" />
      </div>

      <!-- Select Date Button -->
      <button
        @click="handleSelectDate"
        class="select-date"
        @mouseenter="onMouseEnter"
        @mouseleave="hideTooltip"
      >
        {{ dateButtonText }}
      </button>

      <!-- Display Date Range in an Input, with Tooltip -->
      <div style="display: inline-block; position: relative">
        <input
          type="text"
          class="date-input"
          :value="dateRangeDisplay"
          readonly
          @mouseenter="onMouseEnter"
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

      <!-- Syncfusion Date Picker -->
      <SyncfusionDateRangePicker
        ref="picker"
        @update:startDate="onStartDateUpdate"
        @update:stopDate="onStopDateUpdate"
      />
    </div>

    <!-- Hidden fields for UNIX values -->
    <input type="hidden" :value="startDate" name="startDate" />
    <input type="hidden" :value="stopDate" name="stopDate" />

    <!-- Formatted Date Range Display (optional) -->
    <div v-if="startDate && stopDate" style="margin-top: 1rem">
      <strong>Selected Dates:</strong>
      {{ formattedStartDate }} – {{ formattedStopDate }}
      <br />
      (Unix: {{ startDate }} – {{ stopDate }})
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import SyncfusionDateRangePicker from './DtRang.vue'
import { useAuth } from './useAuth.js' // adjust if needed

// ─── Auth State and Logic ───────────────────
const { user, signIn, signOut, checkAuth } = useAuth()
const isAuthenticated = computed(() => !!user.value)
onMounted(() => {
  if (typeof checkAuth === 'function') checkAuth()
})

function onSignInClick() {
  if (typeof signIn === 'function') signIn()
  else console.error('signIn is not a function')
}

function onSignOutClick() {
  if (typeof signOut === 'function') signOut()
  else console.error('signOut is not a function')
}

// ─── Date Picker State and Logic ────────────
const picker = ref(null)
const startDate = ref(null) // UNIX seconds
const stopDate = ref(null) // UNIX seconds

function openDatePicker() {
  if (picker.value && picker.value.openPicker) picker.value.openPicker()
}

function handleSelectDate() {
  if (!isAuthenticated.value) {
    alert('Please sign in to select dates.')
    return
  }
  openDatePicker()
}

function formatUnix(unix) {
  if (unix == null) return '—'
  const d = new Date(unix * 1000)
  const m = d.toLocaleString('en-US', { month: 'short' })
  return `${m} ${d.getDate()} ${d.getFullYear()}`
}
const formattedStartDate = computed(() => formatUnix(startDate.value))
const formattedStopDate = computed(() => formatUnix(stopDate.value))

const dateRangeDisplay = computed(() =>
  startDate.value && stopDate.value
    ? `${formattedStartDate.value}  to  ${formattedStopDate.value}`
    : ''
)

const dateButtonText = computed(() =>
  startDate.value && stopDate.value ? 'Change Date' : 'Select Date'
)

// Tooltip logic
const showTooltip = ref(false)
let tooltipTimeout = null

function hideTooltip() {
  tooltipTimeout = setTimeout(() => {
    showTooltip.value = false
  }, 150)
}
function onMouseEnter() {
  if (tooltipTimeout) clearTimeout(tooltipTimeout)
  showTooltip.value = true
}

// Date picker emits
function onStartDateUpdate(val) {
  startDate.value = val
}
function onStopDateUpdate(val) {
  stopDate.value = val
}
</script>

<style scoped>
/* Example CSS, adjust as needed for your project */
.select-date {
  margin: 0 8px;
  padding: 7px 16px;
  font-size: 1rem;
  border-radius: 5px;
  border: none;
  background-color: #1976d2;
  color: white;
  cursor: pointer;
  transition: background 0.2s;
}
.select-date:hover {
  background: #125da4;
}
.date-input {
  padding: 7px 12px;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #bdbdbd;
  background: #f5f5f5;
  width: 200px;
}
.logo img.logo {
  height: 42px;
  margin-right: 10px;
}
.custom-tooltip {
  pointer-events: none;
}
</style>
