class Api::ImagesController < ApplicationController
  def index
    render json: Image.all.select(:id, :title)
  end

  # def characters
  #   image = Image.find(params[:id])
  #   render json: image.characters.select(:name)
  # end

  # def show
  #   image = Image.includes(:characters, :scores).find(params[:id])

  #   render json: {
  #     id: image.id,
  #     title: image.title,
  #     characters: image.characters.map { |c|
  #       { name: c.name }
  #     },
  #     leaderboard: image.scores
  #       .order(duration: :asc)
  #       .limit(10)
  #       .map { |s|
  #         {
  #           name: s.name
  #           duration: s.duration
  #         }
  #       }
  #   }
  # end
end