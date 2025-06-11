import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
// import './style2.css'

// import Amplify from 'aws-amplify'
// import awsconfig from './aws-exports'
// Amplify.configure(awsconfig)

import { registerLicense } from '@syncfusion/ej2-base'
registerLicense(
  'Ngo9BigBOggjHTQxAR8/V1NNaF5cXmBCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdmWXlfcXVSRGVdUExxW0tWYUA='
)

createApp(App).mount('#app')
