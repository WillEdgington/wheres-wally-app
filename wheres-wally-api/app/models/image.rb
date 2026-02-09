class Image < ApplicationRecord
  has_many :characters, dependent: :destroy
  has_many :game_sessions, dependent: :destroy
  has_many :scores, dependent: :destroy
end