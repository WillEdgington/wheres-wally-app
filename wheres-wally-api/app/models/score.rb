class Score < ApplicationRecord
  belongs_to :image

  validates :name, presence: true
  validates :duration, numericality: { greater_than: 0 }
end
