# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#

require 'json'

puts "Loading names.json..."
# Load in a list of names to use for more realistic user generation
names_json = JSON.parse(File.read('./db/seeds/names.json'))
names_arr = names_json["names"]

# Array to hold our 1000 users for later db seeding
users = []

n = 1;
puts "Generating 1000 test user objects..."
while n < 1001
  # cycles is used to ensure email uniqueness (adds an incrementing integer to email address prior to @ symbol)
  cycles = (n / names_arr.length).floor()
  # There are only ~670 names `names.json`, so we have to ensure we stay in bounds
  name = names_arr[n % names_arr.length()];
  users.push({
    name: "#{name}",
    email: "#{name}#{cycles > 0 ? cycles : ""}@trainual.com",
    title: n % 10 === 0 ? "Manager" : "Developer",
    phone: "480-123-#{9999 - n}",
    status: :active
  })
  n += 1
end

puts "Creating 1000 users..."
User.create(users)

puts "Successfully created 1000 test users! We are ready to demo!"
