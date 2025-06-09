<template>
  <ejs-daterangepicker :placeholder="waterMark"></ejs-daterangepicker>
</template>

<script setup>
import { DateRangePickerComponent as EjsDaterangepicker } from '@syncfusion/ej2-vue-calendars'
import { ref } from 'vue'

const waterMark = ref('Select Date Range')
</script>
<style src="./style.css" scoped></style>
