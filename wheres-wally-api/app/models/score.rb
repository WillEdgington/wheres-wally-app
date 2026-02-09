class Score < ApplicationRecord
  belongs_to :image
  belongs_to :game_session

  validates :name, presence: true
  validates :duration, numericality: { greater_than: 0 }
end
