# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


category_a = Category.create(name: "Breakfast")
category_b = Category.create(name: "Lunch")
category_c = Category.create(name: "Dinner")
category_d = Category.create(name: "Snacks")
category_e = Category.create(name: "Drinks")

meal_a = Meal.create(name: "Breakfast Burrito", ingredients: "Eggs, Bacon, Quesadilla", category: category_a)
meal_b = Meal.create(name: "French Toast", ingredients: "Eggs, Milk, Bread", category: category_a)
meal_c = Meal.create(name: "Turkey Sandwich", ingredients: "Turkey, Cheese, Bread", category: category_b)
meal_d = Meal.create(name: "Tuna Salad Sandwich", ingredients: "Tuna, Mayo, Bread", category: category_b)
meal_e = Meal.create(name: "Stir Fry", ingredients: "Tofu, Broccoli, Carrots", category: category_c)
meal_f = Meal.create(name: "Burgers", ingredients: "Ground Beef, Cheese, Buns", category: category_c)
meal_g = Meal.create(name: "Veggies with Hummus", ingredients: "Red Peppers, Carrots, Hummus", category: category_d)
meal_h = Meal.create(name: "Fruit Smoothie", ingredients: "Milk, Berries, Yogurt", category: category_d)
meal_i = Meal.create(name: "Green Tea", ingredients: "Hot Water, Green Tea, Honey", category: category_e)
meal_j = Meal.create(name: "Coffee", ingredients: "Hot Water, Coffee Beans, Milk", category: category_e)