import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
// import './style2.css'

import { registerLicense } from '@syncfusion/ej2-base'
registerLicense(
  'Ngo9BigBOggjHTQxAR8/V1NMaF5cXmRCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdmWX5ednVdRmNcUUJ+Wko='
)

createApp(App).mount('#app')
