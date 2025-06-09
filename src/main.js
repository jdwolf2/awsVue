import { createApp } from 'vue'
import App from './App.vue'
import './style.css' // <-- pulls in your no-input rule *globally*

import { registerLicense } from '@syncfusion/ej2-base'
registerLicense(
  'Ngo9BigBOggjHTQxAR8/V1NMaF5cXmRCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdmWX5ednVdRmNcUUJ+Wko='
)

createApp(App).mount('#app')
