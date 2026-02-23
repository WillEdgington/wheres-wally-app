class Api::ScoresController < ApplicationController
  def index
    image = Image.find(params[:image_id])

    scores = Score.joins(:game_session)
                  .where(game_sessions: { image_id: image.id })
                  .order(:duration)

    render json: scores.as_json(only: [:id, :name, :duration, :game_session_id])
  end

  def create
    session = GameSession.find(params[:game_session_id])

    unless session.completed_at
      return render json: { error: "Game not completed" }, status: :unprocessable_entity
    end

    score = Score.create!(
      name: params[:name],
      duration: session.duration,
      game_session: session
    )

    render json: score.as_json(only: [:id, :name, :duration, :game_session_id])
  end
end