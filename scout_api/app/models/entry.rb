class Entry < ApplicationRecord
  belongs_to :student
  belongs_to :room
end
