class Score < ApplicationRecord
  belongs_to :game_session
  delegate :image, to: :game_session

  validates :name, presence: true
  validates :duration, numericality: { greater_than: 0 }
  validates :game_session_id, uniqueness: true
end
