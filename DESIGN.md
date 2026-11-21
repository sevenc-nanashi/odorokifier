---
name: AI驚き屋メーカー
description: slopstrap の発光表現を使ったプロンプト作成ワークベンチ
colors:
  purple: "#a855f7"
  cyan: "#06b6d4"
  background: "#030712"
  text: "#f8fafc"
  muted: "#a8b4c9"
typography:
  display:
    fontFamily: '"Noto Sans", "Hiragino Kaku Gothic ProN", "Yu Gothic", Meiryo, sans-serif'
    fontSize: "clamp(1.8rem, 3.5vw, 3rem)"
    fontWeight: 900
    lineHeight: 1.35
    letterSpacing: "-0.03em"
  title:
    fontSize: "1rem"
    lineHeight: 1.5
  prompt:
    fontFamily: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace'
    fontSize: "0.84rem"
    lineHeight: 1.9
rounded:
  input: "8px"
  preset: "12px"
  button: "0.875rem"
  panel: "1.25rem"
spacing:
  small: "12px"
  medium: "20px"
  large: "24px"
components:
  button-primary:
    textColor: "#ffffff"
    rounded: "{rounded.button}"
    padding: "0.75rem 1.45rem"
  input:
    backgroundColor: "#0b1020"
    textColor: "#edf0fa"
    rounded: "{rounded.input}"
    padding: "12px"
  panel:
    backgroundColor: "rgba(15, 23, 42, 0.68)"
    rounded: "{rounded.panel}"
    padding: "24px"
---

# Design System: AI驚き屋メーカー

## Overview

**Creative North Star: "Odorokifier の操作卓"**

既存のロゴとマスコットを残し、slopstrap の暗い背景と紫・シアンの発光を組み合わせる。設定と結果を見比べて操作できる密度を保つ。

**Key Characteristics:**

- 暗い面と発光するアクセント
- 日本語の操作ラベルと等幅の生成文
- 既存のロゴとマスコット

## Colors

主役は紫、補助色はシアン。背景は濃紺、本文は白、補足は淡い青灰色を使う。

**The Slopstrap Rule.** 紫からシアンへのグラデーションは指定されたブランド表現として、見出し・枠・主操作に使う。

## Typography

日本語 UI は Noto Sans 系のスタック、生成文は JetBrains Mono 系のスタックを使用する。フォントファイルの外部読み込みはなく、実際の書体は端末に依存する。
見出しは太く、セクション名は本文に近い大きさ、生成文は広い行間で区別する。狭い画面（400px 以下）の主見出しは 1.65rem。

## Layout

最大幅は 1184px、左右余白は 32px。設定とプレビューを 1.05:1、間隔 24px の二列に置く。790px 以下では一列、最大幅 600px、左右余白 16px に切り替える。パネル余白は 24px、1050px 以下で 20px、400px 以下で 16px。

**The Stable Controls Rule.** 操作パネルはホバーしても移動させない。デスクトップのプレビューは上端 24px に追従し、モバイルでは通常の文書順に戻す。

## Elevation & Depth

暗い面の濃淡、細い境界線、紫の柔らかな発光で重なりを示す。ダイアログは暗い背景幕と影（0 24px 64px #0008）で前面に置く。動きを減らす設定ではアニメーションと遷移を止める。

## Shapes

入力欄、プリセット、ボタン、パネルの順で角丸を広げる。LIVE 表示は丸いピル、スライダーはブラウザ標準のつまみを使う。

## Components

- コピーは全幅、高さ 50px 以上のグラデーションボタン。成功時は緑に変わる。使い方は半透明の副ボタン。
- プリセットは二列。選択状態は紫の面と二重に見える枠で示し、aria-pressed と一致させる。
- テーマ入力は暗い面と明瞭な枠。キーボードフォーカスは薄紫の 3px アウトライン、外側余白 4px。
- プレビューはファイル名の帯とスクロール領域。本文高は 440px、790px 以下では 360px。長い入力は折り返す。
- ヘッダーは既存ブランドと使い方ボタンを左右に置く。

## Do's and Don'ts

### Do:

- **Do** 既存のロゴとマスコットを引き継ぐ。
- **Do** 操作状態とキーボードフォーカスを視覚的に示す。

### Don't:

- **Don't** slopstrap のグラデーションを一般的な装飾禁止ルールで取り除かない。
- **Don't** 操作パネルをホバーで持ち上げない。
