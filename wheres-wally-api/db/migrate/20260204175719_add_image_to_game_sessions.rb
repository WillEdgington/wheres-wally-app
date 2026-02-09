class AddImageToGameSessions < ActiveRecord::Migration[8.0]
  def change
    add_reference :game_sessions, :image, null: false, foreign_key: true
  end
end
