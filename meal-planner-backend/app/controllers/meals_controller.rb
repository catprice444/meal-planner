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
            render json: {errors: meal.errors.full_messages}
        end 
    end 

    private 
    def meal_params
        params.permit(:name, :ingredients, :category_id)
    end 
end
