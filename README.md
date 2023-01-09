# babylon-depthsensing-testbed

## About

babylon.js に Depth Sensing Feature を実装する際に動作検証するためのプロジェクト。
`@babylonjs/core`をローカルで`npm link`してインストールしているため、
`package.json`には依存関係を記述していない。詳細は Setup を参照。

## Environment

| env       |                 |
| :-------- | :-------------- |
| OS        | Windows 11 Home |
| npm       | 16.18.0         |
| babylonjs | 5.x.x           |
| vite      | 4.0.0           |

## Setup

### babylonjs の link

ローカル環境で Babylon.js のプロジェクトをクローンし、
`buildSystem.md`に従ってビルドしたものをシンボリックリンクを張る。

Babylon.js のプロジェクト内で以下のコマンドを実行。

```bash
npx nx build core

npm link -w @babylonjs/core
```

### https の有効化

下記コマンドを実行して SSL/TLS 証明書を作成してください。

```bash
openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem
```
