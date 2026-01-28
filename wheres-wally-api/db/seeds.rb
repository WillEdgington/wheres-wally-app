# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
image = Image.create!(
  title: "Film Set"
)

Character.create!([
  { name: "Wally", x: 34.2, y: 67.9, image: image },
  { name: "Wizard", x: 12.5, y: 45.3, image: image },
  { name: "Wilma", x: 78.1, y: 22.4, image: image }
])