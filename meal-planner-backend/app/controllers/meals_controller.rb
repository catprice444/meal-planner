class MealsController < ApplicationController
    def index 
        meals = Meal.all
        render json: MealSerializer.new(meals)
    end 

    def create
        meal = Meal.new(meal_params)
        if meal.save
            render json: MealSerializer.new(meal)
        else 
            render json: {errors: meal.error.full_messages}
        end 
    end 

    private 
    def meal_params
        params.require(meals).permit(:name, :ingredients, :category)
    end 
end
