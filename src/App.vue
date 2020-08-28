<template>
  <div id="container">
    <header id="page-header" class="hero-unit">
      <h1>makeSQL</h1>
      <p id="lead">makeSQLは、ブラウザ上でSQLを作成するサイトです。</p>
    </header>
    <div id="page-content">
      <nav id="page-nav" class="navbar">
        <div class="navbar-inner">
          <ul class="nav">
            <li><router-link to="/text">テキストから作成</router-link></li>
            <li><router-link to="/file">ファイルから作成</router-link></li>
            <li><router-link to="/config">設定情報</router-link></li>
            <li><router-link to="/help">使い方</router-link></li>
          </ul>
          <ul class="nav pull-right">
            <li><router-link to="/about" class="about">このサイトについて</router-link></li>
          </ul>
        </div>
      </nav>
      <div id="page-body">
        <router-view></router-view>
      </div>
    </div>
    <footer id="page-footer">
      <page-footer/>
    </footer>
  </div>
</template>

<script>
import PageFooter from './components/footer/Index.vue';

export default {
  components: {
    'page-footer': PageFooter,
  },
};
</script>
