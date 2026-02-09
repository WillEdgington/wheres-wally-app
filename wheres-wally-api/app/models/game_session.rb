class GameSession < ApplicationRecord
  belongs_to :image
  has_one :score, dependent: :destroy
end