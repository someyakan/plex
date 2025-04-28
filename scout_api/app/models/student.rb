class Student < ApplicationRecord
  # メッセージ関連
  has_many :messages
  has_many :companies, through: :messages

  # エントリとルーム関連
  has_many :entries
  has_many :rooms, through: :entries

  # 企業とのメッセージ送信のための関連
  has_many :company_rooms, through: :rooms, source: :company

  # パスワードセキュリティ
  has_secure_password
end
