# app/models/message.rb
class Message < ApplicationRecord
  belongs_to :student
  belongs_to :company
  belongs_to :room

  validates :message, presence: true
end

