class Character < ApplicationRecord
  belongs_to :image

  validates :name, presence: true
  validates :x, :y, presence: true
end
