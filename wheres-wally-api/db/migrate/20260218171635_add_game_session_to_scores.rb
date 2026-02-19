class AddGameSessionToScores < ActiveRecord::Migration[8.0]
  def change
    add_reference :scores, :game_session, null: false, foreign_key: true
    remove_reference :scores, :image, foreign_key: true
  end
end
