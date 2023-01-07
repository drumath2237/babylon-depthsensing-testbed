# babylon-depthsensing-testbed

## About

babylon.jsにDepth Sensing Featureを実装する際に動作検証するためのプロジェクト。
`@babylonjs/core`をローカルで`npm link`してインストールしているため、
`package.json`には依存関係を記述していない。詳細はSetupを参照。

## Environment

| env       |                 |
| :-------- | :-------------- |
| OS        | Windows 11 Home |
| npm       | 16.18.0         |
| babylonjs | 5.x.x           |
| vite      | 4.0.0           |

## Setup

ローカル環境でBabylon.jsのプロジェクトをクローンし、
`buildSystem.md`に従ってビルドしたものをシンボリックリンクを張る。

Babylon.jsのプロジェクト内で以下のコマンドを実行。

```
npx nx build core

npm link -w @babylonjs/core
``` 