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

- 企業からのメッセージの受信（※作成途中）

- DM機能 → 難易度が高く断念
（rooms_controllerやmodelsのentry.rbとroom.rbなど作成したが、削除するとエラーの可能性があるため、現状維持）


### 企業側

- 企業アカウント登録 / ログイン

- 登録してる学生の一覧の閲覧 

- 学生へのメッセージ送信（※作成途中）



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
   git clone https://github.com/someyakan/plex.git
   cd plex

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

5. バックエンド サーバーを起動
    ```bash
    cd scout_api
    bin/rails s -p 3001

6. フロントエンド サーバーを起動
    ```bash
    cd scout-frontend
    npm run dev



###　表示されているが実装できなかった機能

企業のmypageの生徒へのメッセージ



企業のmypageから飛べる学生の個人へ送るメッセージ

学生のmypageのあなたへのメッセージ

###　勉強や参考にしたもの

- railsの勉強　https://railsguides.jp/getting_started.html
- railsとnext.jsの勉強　https://www.youtube.com/@programming_tutorial_youtube

- next.jsの勉強　https://nextjs.org/docs
- next.jsの勉強２　https://www.shoeisha.co.jp/book/detail/9784798184678



- dm機能 https://zenn.dev/goldsaya/articles/71758cf3024dc1


- README.mdの書き方　https://qiita.com/koeri3/items/f85a617dcb6efebb2cab