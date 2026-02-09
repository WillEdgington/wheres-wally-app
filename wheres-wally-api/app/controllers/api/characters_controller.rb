class Api::CharactersController < ApplicationController
  def index
    image = Image.find(params[:image_id])
    render json: image.characters.select(:id, :name)
  end
end
