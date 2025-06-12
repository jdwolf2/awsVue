<template>
  <div class="app-container">
    <div class="top-line">
      <!-- Left controls: Select Date and input -->
      <div class="left-controls">
        <button @click="handleSelectDate" class="select-date">
          {{ dateButtonText }}
        </button>
        <div style="display: inline-block; position: relative">
          <input
            type="text"
            class="date-input"
            :value="isAuthenticated ? dateRangeDisplay : ''"
            :placeholder="!isAuthenticated ? 'Sign in to select dates' : ''"
            readonly
            :disabled="!isAuthenticated"
            @mouseenter="onMouseEnter"
            @mouseleave="hideTooltip"
          />
          <div v-if="showTooltip && isAuthenticated" class="custom-tooltip">
            use the {{ dateButtonText }} button
          </div>
        </div>
        <SyncfusionDateRangePicker
          ref="picker"
          :startDate="startDate"
          :stopDate="stopDate"
          @update:startDate="onStartDateUpdate"
          @update:stopDate="onStopDateUpdate"
        />
      </div>

      <!-- Right controls: logo and sign in/out -->
      <div class="right-controls">
        <div class="logo">
          <img src="./assets/tableLogo.jpg" alt="AccuSalt Logo" class="logo" />
        </div>
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
      </div>
    </div>
    <!-- ... rest of the template ... -->
  </div>
</template>

<script setup>
/* eslint-disable */
import { ref, computed, onMounted, watch } from 'vue'
import SyncfusionDateRangePicker from './DtRang.vue'
import { useAuth } from './useAuth.js'
import { useDynamoDB } from './useDynamoDB.js'

// ---- Default dates: JUL/01/2020 - NOV/23/2020 ----
function getUnix(month, day, year) {
  return Math.floor(new Date(year, month - 1, day).getTime() / 1000)
}
const defaultStartUnix = getUnix(7, 1, 2020) // July is 7
const defaultStopUnix = getUnix(11, 23, 2020) // November is 11

const startDate = ref(defaultStartUnix)
const stopDate = ref(defaultStopUnix)

// ---- Auth state & logic ----
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

// ---- Date picker state & logic ----
const picker = ref(null)
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

// function onStartDateUpdate(val) {
//   startDate.value = val
// }
// function onStopDateUpdate(val) {
//   stopDate.value = val
// }

// ---- DynamoDB query integration ----
const { items, fetchError, itemsFetched, fetchItems } = useDynamoDB()
// Table headers (dynamic, update as needed)
const tableHeaders = computed(() =>
  items.value.length > 0 ? Object.keys(items.value[0]) : []
)
// Auto-fetch when dates or auth change
watch([startDate, stopDate, isAuthenticated], async ([start, stop, authed]) => {
  if (authed && start && stop) {
    await fetchItems(start.toString(), stop.toString())
  }
})
</script>

<style>
.app-container {
  display: flex;
  width: 80%;
  /* margin: 0 auto; */
  /* padding: 20px; */
  padding: 0;
  font-family: Arial, sans-serif;
}

.select-date {
  /* margin: 0 8px; */
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 0;
  padding-bottom: 0;
  height: 40px;
  font-size: 16px;
  /* border-radius: 5px; */
  border: none;
  background-color: white;
  color: black;
  cursor: pointer;
  /* transition: background 0.2s; */
}
.select-date:hover {
  background: #125da4;
}
.date-input {
  margin-left: auto;
  padding: 7px 12px;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #bdbdbd;
  background: #f5f5f5;
  width: 220px;
}
.date-input:disabled {
  background: #eee;
  color: #bbb;
}
.logo {
  /* display: inline-block; */
  width: auto;
  height: 22px;
  /* margin-bottom: 10px; */

  margin-left: auto;
  padding-right: 10px;
  /* margin-bottom: 15px; */
  /* margin: 0 auto -20px 10px; */

  /* background-color: white; */
}
.custom-tooltip {
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
  pointer-events: none;
}
.results-table {
  margin-top: 1.2em;
  border-collapse: collapse;
  width: 100%;
}
.results-table th,
.results-table td {
  border: 1px solid #ccc;
  padding: 8px 12px;
  font-size: 1rem;
}
.results-table th {
  background: #f5f5f5;
  font-weight: bold;
}
.no-data-msg {
  margin-top: 1em;
  color: #d32f2f;
  background: #fff4f4;
  border: 1px solid #ffcdd2;
  padding: 12px 18px;
  border-radius: 7px;
  font-size: 1.12rem;
  text-align: left;
  letter-spacing: 0.01em;
}
@import './style.css';
</style>
