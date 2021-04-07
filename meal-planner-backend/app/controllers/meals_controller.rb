class MealsController < ApplicationController
    def index 
        meals = Meal.all
        render json: meals
    end 

    def create
        meal = Meal.new(meal_params)
        if meal.save
            render json: meal
        else 
            render json: {errors: meal.error.full_messages}
        end 
    end 

    private 
    def meal_params
        params.require(meals).permit(:name, :ingredients, :category)
    end 
end
