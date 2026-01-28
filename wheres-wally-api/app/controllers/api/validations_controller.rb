class Api::ValidationsController < ApplicationController
  TOLERANCE = 2.0
  def check
    image = Image.find(params[:image_id])
    character = image.characters.find_by!(name: params[:character])
    return render json: { correct: false } unless character

    x = params[:x].to_f
    y = params[:y].to_f

    correct =
      (character.x - x).abs <= TOLERANCE &&
      (character.y - y).abs <= TOLERANCE

    render json: { correct: correct }
  end
end
