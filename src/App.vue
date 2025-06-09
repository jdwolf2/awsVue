// App.vue
<template>
  <div class="p-4 space-y-4">
    <!-- Single button to trigger child picker -->
    <button
      @click="openDatePicker"
      class="px-4 py-2 bg-blue-600 text-white rounded"
    >
      Select Date
    </button>

    <!-- Syncfusion DateRangePicker child component -->
    <SyncfusionDateRangePicker
      ref="picker"
      @update:startDate="startDate = $event"
      @update:stopDate="stopDate = $event"
    />

    <div><strong>startDate:</strong> {{ startDate ?? '—' }}</div>
    <div><strong>stopDate:</strong> {{ stopDate ?? '—' }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SyncfusionDateRangePicker from './SyncfusionDateRangePicker.vue'

const picker = ref(null)
const startDate = ref(null)
const stopDate = ref(null)

function openDatePicker() {
  picker.value.openPicker()
}
</script>

<style src="./style.css" scoped></style>
