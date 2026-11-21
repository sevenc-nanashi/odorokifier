![Vibecoded by GPT-6-Astra](https://img.shields.io/badge/Vibecoded--by-GPT--6--Astra-red)

# AI驚き屋メーカー

口調と5つのパラメーターから、パロディ投稿用のプロンプトを組み立てます。
文字数・投稿形式は「140字以内」「制限なし」「スレッド（各140字以内）」から選べます。

## 開発

```sh
vp install
vp run dev
```

## 検証・ビルド

```sh
vpr fmt
vpr check
vpr typecheck
vpr build
vpr preview
```

ビルド結果は `dist/` に出力されます。

## GitHub Pages

リポジトリの Settings → Pages → Build and deployment → Source を `GitHub Actions` に設定してください。
`main` への push、または Actions の `Deploy to GitHub Pages` の手動実行で公開します。
公開パスは GitHub Pages の設定から取得してビルドに渡します。

## 素材と依存

- 開発・ビルド・lint・format: [Vite+](https://viteplus.dev/)
- コンポーネント: [Vue](https://vuejs.org/)（`src/App.vue`、`src/AppIcon.vue`）
- Vue SFC コンパイラー: [Vize](https://vizejs.dev/guide/vite-plugin/)（`@vizejs/vite-plugin`）
- 型チェック: [tsrs](https://oxc.rs/docs/guide/usage/typechecker) + [Vize content mapper](https://vizejs.dev/guide/content-mapper/)
- UI: [slopstrap](https://slopstrap.mikelacher.com/) の公式配布 CSS を `src/vendor/slopstrap.css` に保存（2026-11-21取得、ヘッダー表記 v4.2.0 / MIT）。元のライセンス表記を保持しています。CSS のみ使用し、JavaScript は不要です。
- 生成ルール、ロゴ、マスコット: 元サイトから移植。

クリップボードへのコピーには HTTPS または localhost とブラウザの許可が必要です。拒否された場合はエラーを表示し、プレビューを手動でコピーできます。
