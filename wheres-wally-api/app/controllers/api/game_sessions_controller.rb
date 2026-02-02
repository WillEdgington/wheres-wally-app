class Api::GameSessionsController < ApplicationController
  def create
    session = GameSession.create!(started_at: Time.current)
    render json: {
      id: session.id,
      started_at: session.started_at
    }
  end

  def complete
    session = GameSession.find(params[:id])
    session.update!(completed_at: Time.current)

    duration = session.completed_at - session.started_at
    render json: { duration: duration.to_i }
  end
end