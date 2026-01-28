class CreateGameSessions < ActiveRecord::Migration[8.0]
  def change
    create_table :game_sessions do |t|
      t.datetime :started_at
      t.datetime :completed_at

      t.timestamps
    end
  end
end
