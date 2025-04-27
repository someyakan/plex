class Student < ApplicationRecord
  has_many :entries
  has_many :rooms, through: :entries
  has_many :messages
  has_secure_password

  # 企業側とのメッセージを送るために必要な関連付け
  has_many :company_rooms, through: :rooms, source: :company
end
