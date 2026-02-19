class GameSession < ApplicationRecord
  belongs_to :image
  has_one :score, dependent: :destroy

  def duration
    return nil unless completed_at && started_at
    (completed_at - started_at).to_i
  end
end