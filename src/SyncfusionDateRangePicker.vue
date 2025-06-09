// SyncfusionDateRangePicker.vue
<template>
  <!-- Hidden input wrapper with calendar icon via CSS class -->
  <EjsDaterangepicker
    ref="drp"
    :placeholder="waterMark"
    @change="handleChange"
    cssClass="no-input"
  />
</template>

<script>
import { DateRangePickerComponent as EjsDaterangepicker } from '@syncfusion/ej2-vue-calendars'

export default {
  name: 'SyncfusionDateRangePicker',
  components: { EjsDaterangepicker },
  emits: ['update:startDate', 'update:stopDate'],
  data() {
    return {
      waterMark: 'Select Date Range',
    }
  },
  methods: {
    openPicker() {
      const drp = this.$refs.drp
      if (drp && typeof drp.show === 'function') {
        drp.show()
      }
    },
    handleChange(args) {
      const startUnix = args.startDate
        ? Math.floor(args.startDate.getTime() / 1000)
        : null
      const endUnix = args.endDate
        ? Math.floor(args.endDate.getTime() / 1000)
        : null
      this.$emit('update:startDate', startUnix)
      this.$emit('update:stopDate', endUnix)
    },
  },
}
</script>
