<template>
  <EjsDaterangepicker
    ref="drp"
    :placeholder="waterMark"
    @change="handleChange"
    class="w-full"
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

<style src="./style.css"></style>
