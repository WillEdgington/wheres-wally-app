class Api::ImagesController < ApplicationController
  def index
    render json: Image.all.select(:id, :title)
  end
end