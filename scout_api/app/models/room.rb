class Room < ApplicationRecord
    has_many :entries
    has_many :students, through: :entries
    has_many :companies, through: :entries
    has_many :messages
end
