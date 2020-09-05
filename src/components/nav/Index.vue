<template>
  <nav class="nav d-flex mb-5 border-bottom">
    <router-link class="nav-link text-secondary" to="/text">テキストから作成</router-link>
    <router-link class="nav-link text-secondary" to="/file">ファイルから作成</router-link>
    <router-link class="nav-link text-secondary" to="/config">設定情報</router-link>
    <router-link class="nav-link text-secondary" to="/help">使い方</router-link>
    <router-link class="nav-link text-muted ml-auto small" to="/about">このサイトについて</router-link>
  </nav>
</template>

<style scoped>
a {
  border-bottom: 2px solid transparent;
}
.router-link-active {
  border-color: #1e87f0;
}
</style>
