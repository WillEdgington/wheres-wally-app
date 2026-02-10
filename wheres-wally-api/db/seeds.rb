# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
filmset = Image.create!(
  title: "Dinosaurs, Spacemen, and Ghouls"
)

Character.create!([
  { name: "Wally", x: 91.8, y: 55.7, image: filmset },
  { name: "Wizard", x: 67.1, y: 72.5, image: filmset },
  { name: "Wilma", x: 82.8, y: 58.1, image: filmset },
  { name: "Woof", x: 80.8, y: 89.8, image: filmset },
  { name: "Odlaw", x: 5.2, y: 49.6, image: filmset },
])

musketeers = Image.create!(
  title: "The Swashbuckling Musketeers"
)

Character.create!([
  { name: "Wally", x: 52.8, y: 80.1, image: musketeers },
  { name: "Wizard", x: 94.0, y: 30.0, image: musketeers },
  { name: "Wilma", x: 43.6, y: 56.3, image: musketeers },
  { name: "Woof", x: 18.0, y: 83.5, image: musketeers },
  { name: "Odlaw", x: 15.1, y: 36.7, image: musketeers },
])

giants = Image.create!(
  title: "The Unfriendly Giants"
)

Character.create!([
  { name: "Wally", x: 17.9, y: 65.6, image: giants },
  { name: "Wizard", x: 96.0, y: 76.8, image: giants },
  { name: "Wilma", x: 69.1, y: 79.1, image: giants },
  { name: "Woof", x: 2.2, y: 73.4, image: giants },
  { name: "Odlaw", x: 58.7, y: 89.9, image: giants },
])

dive = Image.create!(
  title: "The Deep Sea Divers"
)

Character.create!([
  { name: "Wally", x: 66.3, y: 15.5, image: dive },
  { name: "Wizard", x: 78.6, y: 12.7, image: dive },
  { name: "Wilma", x: 51.8, y: 23.8, image: dive },
  { name: "Woof", x: 93.9, y: 28.6, image: dive },
  { name: "Odlaw", x: 30.1, y: 19.2, image: dive },
])