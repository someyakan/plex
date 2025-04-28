class Company < ApplicationRecord
  has_secure_password
  
  validates :name, presence: true
  validates :email, presence: true, uniqueness: true

  # 学生との関連を表す
  has_many :entries
  has_many :rooms, through: :entries
  has_many :messages

  # 学生と直接関連を持つ
  has_many :students, through: :rooms

  # 企業がメッセージを送るために学生との関連
  has_many :students, through: :messages
end
