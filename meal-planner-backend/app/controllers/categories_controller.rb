class CategoriesController < ApplicationController
    def index 
        categories = Category.all
        render json: categories.to_json(:include => {
            :meals => {:only => [:name, :ingredients]},
          }, :except => [:updated_at, :created_at])
    end 
end
