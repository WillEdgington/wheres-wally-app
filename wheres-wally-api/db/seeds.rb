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
  { name: "Wally", x: 91.8, y: 55.7, image: image },
  { name: "Wizard", x: 67.1, y: 72.5, image: image },
  { name: "Wilma", x: 82.8, y: 58.1, image: image },
  { name: "Woof", x: 80.8, y: 89.8, image: image},
  { name: "Odlaw", x: 5.2, y: 49.6, image: image},
])