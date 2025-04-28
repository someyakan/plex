# インターンマッチングサービス
インターン生と企業をつなぐスカウト型マッチングプラットフォームです。
学生はプロフィールを登録し、企業は気になる学生にスカウトメッセージを送ることができます。

## 技術スタック

- フロントエンド：Next.js

- バックエンド：Ruby on Rails (APIモード)

- データベース：PostgreSQL

## 主な機能

### 学生側
- ユーザー登録 / ログイン

- プロフィール作成・編集

- 企業からのメッセージの受信 途中

- dm機能　自分には難しすぎたため断念
rooms_controllerやmodelsのentry.rbとroom.rbなど作成したが、
そこを削除してしまうと他にエラーが出てしまう可能性があるので触れられていない



### 企業側

- 企業アカウント登録 / ログイン

- 登録してる学生の一覧の閲覧 

- 学生へのメッセージ　途中



## セットアップ方法

### 必要なもの

- Ruby  3.4.3
- Rails 8.0.2
- Node.js （インストール）
    - node v22.14.0
    - npm  10.9.2
    - npx  10.9.2
- PostgreSQL


### インストール手順

1. リポジトリをクローンします。

   ```bash
   git clone https://github.com/yourusername/intern-matching-service.git
   cd intern-matching-service

2. バックエンドの依存関係をインストールする
    ```bash 
    cd scout_api
    bundle install

3. フロントエンドの依存関係をインストールします。
    ```bash
    cd scout-frontend
    npm install

4. データベースをセットアップします
    ```bash
    cd scout_api
    bin/rails db:create
    bin/rails db:migrate

5. サーバーを起動します。
```bash
バックエンド:
            cd scout_api
            bin/rails s -p 3001

フロントエンド:
            cd scout-frontend
            npm run dev