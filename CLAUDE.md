# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 概要

makesql (https://makesql.tcode.dev) は、CSV などの表形式のテキストから SELECT / INSERT / DELETE / UPDATE の SQL を作る Vue 3 + TypeScript + Pinia の SPA。サーバー側の処理はなく、ビルドした静的ファイルを S3 + CloudFront で配信している。コードのコメントやエラーメッセージは日本語で書かれている。

## コマンド

開発は Docker Compose で行う (node_modules はコンテナ専用ボリュームなので、ホストで `npm install` しない)。

```sh
docker compose run --rm app npm install           # セットアップ
docker compose up                                 # 開発サーバー (port 80)
docker compose run --rm app npm run build         # 型チェック (vue-tsc) + ビルド
docker compose run --rm app npm run lint          # ESLint (--fix 付き)
docker compose run --rm app npm run format        # Prettier (src/ のみ)
docker compose run --rm app npx vitest run        # ユニットテスト (npm run test:unit は watch モード)
docker compose run --rm e2e                       # E2E テスト (Playwright, Chromium のみ)
```

単一テストの実行:

```sh
docker compose run --rm app npx vitest run src/sql/__tests__/MakeInsert.test.ts
docker compose run --rm app npx vitest run -t "テスト名"
docker compose run --rm e2e npx playwright test e2e/text.test.ts
```

* ユニットテストは `src/**/__tests__/*.test.ts` (jsdom)、E2E は `e2e/*.test.ts`。
* E2E はデフォルトで `build-only` + `preview` (port 4173) を起動してテストする。`BASE_URL` を指定するとそのサイトに対して実行する (デプロイ後の本番テストで使用)。
* E2E の `test` / `expect` は `@playwright/test` ではなく `e2e/fixtures.ts` から import する。テスト対象以外への通信 (Google Analytics, CDN の Semantic UI CSS) を遮断する fixture が自動で適用される。
* E2E で画面を移動するときは `page.goto` ではなく `e2e/helpers.ts` の `navigate` を使う (再読み込みで Pinia の状態が消えるため)。
* Prettier は `semi: false`, `singleQuote`, `printWidth: 300`, `trailingComma: none`。

## アーキテクチャ

* **画面** (`src/views/`): テキスト画面 (`/`)、ファイル画面 (`/file`)、設定画面 (`/config`)、About。各画面の部品は `src/components/page/<画面>/`。スタイルは CDN から読み込む Semantic UI の CSS クラス (`ui accordion` など) を使う。
* **SQL 生成** (`src/sql/`): `SqlFactory` が SQL の種類に応じて `MakeSelect` / `MakeInsert` / `MakeDelete` / `MakeUpdate` を選ぶ。どれも `MakeSql` を継承し、入力の1行目を列名、2行目以降を値として扱う。値のクォート・エスケープ、入力の検証 (列数の不一致・空行など) は `MakeSql` に集約されている。`SqlType` に種類を追加すると `fromText` の `never` チェックで型エラーになる。
  * テキスト画面の UPDATE は「更新情報」(SET 句) と「テーブル情報」(WHERE 句) を別々に入力する。ファイル画面の UPDATE は `UpdateTextSplitter` がファイルの2行目を SET、3行目以降を WHERE に分ける。
* **入力のパース** (`src/util/table.ts`): カンマ・タブ区切りは papaparse で CSV として読む (ダブルクォート内の区切り文字・改行に対応)。スペース区切りは CSV ではなく連続する空白 (`/\s+/`) で分割する。そのため delimiter は `string | RegExp`。
* **設定** (`src/stores/configStore.ts`, `src/const/ConfigConst.ts`): 文字コード・区切り文字・大文字小文字・bulk・クォート・バックスラッシュエスケープを保持し、`config` (computed) で `MakeSql` の `Config` 型に変換する。`saveConfig` が有効なら Cookie に保存し、読み込み時は項目ごとに検証して不正な値は初期値にする。
* **エラー処理**: ユーザーの入力が原因のエラーは `InputError` を投げ、UI でそのメッセージを表示する。それ以外のエラーはテキスト画面では再 throw、ファイル画面ではそのファイルだけ汎用エラーとして表示する。
* **ファイル画面**: `FileExtractor` が選択した文字コードで読み込み (改行は LF に統一)、ファイル名 (拡張子を除く) をテーブル名にする。複数ファイルの結果は選択順に並べ、`fileStore.makeSqlList` が最後に開始した作成処理の結果だけを反映する。Download は成功したファイルの SQL を zip にまとめる (同名は `uniqueNames` で重複回避)。

## CI / デプロイ

* `ci.yml`: master 以外への push で lint (`npx eslint .`、修正なし)・ユニットテスト・E2E を実行する。master はルールセットで CI 通過をマージ条件にしている。
* `deploy.yml`: master への push でビルドして S3 に同期 (`assets/` は長期キャッシュ、それ以外は no-cache)、CloudFront のキャッシュを削除し、完了後に本番サイトに対して E2E を実行する。

## Playwright のバージョン

`@playwright/test` は `package.json` で固定バージョンにしている。更新するときは、以下の Playwright イメージ (`mcr.microsoft.com/playwright:v<version>-noble`) も同じバージョンに揃えること。ずれるとブラウザのバイナリが見つからず E2E テストが失敗する。

* `compose.yaml` の `e2e` サービス
* `.github/workflows/ci.yml` の `test-e2e` ジョブ
* `.github/workflows/deploy.yml` の `test-e2e-production` ジョブ

Node のバージョン (現在 26) も `compose.yaml` の `app` サービスと各ワークフローの `setup-node` で揃えている。
