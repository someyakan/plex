# app/models/message.rb
class Message < ApplicationRecord
  belongs_to :student
  belongs_to :company
  belongs_to :room  # Roomモデルとの関連を追加

  validates :message, presence: true  # メッセージの内容が必須であることをバリデーションとして追加
end
