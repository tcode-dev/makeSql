import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// デプロイで古いバージョンのファイルは削除されるため、デプロイ前に開いた画面から、変更があった (ファイル名が変わった) 画面に移ると
// 遅延読み込みするファイルが見つからずエラーになる。再読み込みして最新のバージョンを読み込む
const reloadedAtKey = 'preloadErrorReloadedAt'

window.addEventListener('vite:preloadError', (event) => {
  // 再読み込みしても読み込めない場合に、再読み込みを繰り返さないようにする
  if (Date.now() - Number(sessionStorage.getItem(reloadedAtKey)) < 10_000) {
    return
  }

  sessionStorage.setItem(reloadedAtKey, String(Date.now()))
  event.preventDefault()
  window.location.reload()
})

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
