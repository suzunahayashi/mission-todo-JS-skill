# misson-todo-js

## コーディング規約

<!-- 追加してください -->
- クラスの命名規則は BEM
  - .block__element--modifier
- 複数の単語をつなげる場合はローワーキャメルケース

## 注意事項

## node version
```
18.18.0
```

## Getting Started

```
npm i
npm run dev
```

## npm scripts 一覧

| コマンド | 内容 |
| - | - |
| dev   | gulp でプレビューサーバーと watch タスクを開始します。 |
| build | ビルド用の設定で`dist`配下のファイルを作成します。 |
| revbuild | ビルド用の設定で`dist`配下のファイルを作成します。<br>（アセット配下のファイルにリビジョン番号を付与）|
| htmlhint | htmlhintを実行します。自動fixできるものは修正します。
| eslint | ESLintを実行します。自動fixできるものは修正します。
| stylelint | stylelintを実行します。自動fixできるものは修正します。 |
| format | prettierでフォーマットをかけます。 |

-  **webpack 等の設定が`dev`とは異なる**ため、納品時は必ず `revbuild` or `build` のコマンドを利用してください。
- リビジョン番号を付与したくない場合を除き、**基本的には `revbuild` を使用してください**
  - 付与しない例…納品後、先方で運用していくと事前に分かっている、先方が付与を希望しない、など

### `revbuild` について

- キャッシュ対策として assets配下のファイルにリビジョン番号が付与され、HTML上のファイル名にも自動でリビジョン番号がつきます
- 差分ファイルのみ新しいリビジョン番号が付与されます
- assets のパスを変えたい場合は `gulpfile.js/config.js` の `config.src.asset`, `config.dest.assets` を変更してください
- firebaseプレビュー環境のビルドはデフォルトで `revbuild` になっています。変更したい場合は `deploy-to-preview.yml` の `yarn revbuild` を `yarn build` に変更してください

## webpack での環境変数設定について

`webpack.EnvironmentPlugin` で環境変数の設定ができます。

ローカルサーバーと検証・本番環境で異なる変数を使用したい場合はご自由に追加してください

| 変数名 | タイプ |
| - | - |
| NODE_ENV | `development` or `production`  |

※ js ファイルから `process.env.${変数名}` で参照できます。

### husky (lint-staged) について

コミットの前に、ステージングしたファイルを対象に
- htmlhint
- eslint
- stylelint
- prettier

を実行します。エラーが発生した場合、コミットを中断します。

## Firebaseプレビュー環境の情報
<!-- Firebase プレビュー環境を使用しない場合は削除してください -->

- URL: `https://{FIREBASE_PROJECT_ID}.web.app`
- username: `{BASIC_AUTH_USERNAME}`
- password: `{BASIC_AUTH_PASSWORD}`

### デプロイについて

- `master/main`ブランチが更新されると、`dist`ディレクトリ配下のソースがプレビュー環境に自動デプロイされるようになっています
  - `dist`ディレクトリがルートとなるため、ディレクトリ構造に注意してください
