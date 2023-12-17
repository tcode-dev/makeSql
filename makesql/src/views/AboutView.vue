<script setup lang="ts">
import Title from '@/components/title/Title.vue'
</script>

<template>
  <div>
    <Title>このサイトについて</Title>
    <section>
      <h3 class="ui header">テキストからSQLを作成する</h3>
      <ol class="ui ordered list">
        <li>[設定情報]で、区切り文字や文字コードを設定します。</li>
        <li>[テーブル名]に、テーブル名を入力します。</li>
        <li>[更新情報]・[テーブル情報]に、カンマやタブ区切りのテキストデータを入力します。</li>
        <li>SQLのボタンをクリックし、SQLを作成します。</li>
      </ol>
      <p>
        [更新情報]は、UPDATE文を作成時にSET句として使用します。<br>
        [テーブル情報]は、SELECT文・DELETE文・UPDATE文を作成時にWHERE句として、INSERT文を作成時にVALUES句として使用します。<br>
        [更新情報]・[テーブル情報]の先頭行をフィールド名として使用します。
      </p>
    </section>
    <section>
      <h3 class="ui header">ファイルからSQLを作成する</h3>
      <ol class="ui ordered list">
        <li>[設定情報]で、区切り文字や文字コードを設定します。</li>
        <li>[ファイル選択]からcsvファイルを選択します(複数選択可)。</li>
        <li>SQLのボタンをクリックし、SQLを作成します。</li>
      </ol>
      <p>
        ファイル名には、半角英字（a-z A-Z）、半角数字（0-9）、ダッシュ（-）、アンダースコア（_）を使用できます。 <br>
        テーブル名には、ファイル名を使用します。<br>
        フィールド名には、ファイルの先頭行を使用します。<br>
        SET句には、ファイルの2行目を使用します（Update文作成時）。<br>
        Downloadボタンをクリックして作成したSQLをダウンロードできます。
      </p>
    </section>
    <section>
      <h3 class="ui header">その他</h3>
      <p>動作環境: Mac、Google Chrome</p>
      <p>問い合わせ先: &#109;&#97;&#107;es&#113;&#108;&#64;&#103;&#109;&#97;&#105;l&#46;c&#111;m</p>
      <p>GitHub: <a href="https://github.com/tcode-dev/makeSql">https://github.com/tcode-dev/makeSql</a></p>
      <p>当サイトのご利用については自己責任でお願いします。</p>
    </section>
  </div>
</template>

<style scoped>
.ui.header {
  margin-top: 2rem;
}
</style>
