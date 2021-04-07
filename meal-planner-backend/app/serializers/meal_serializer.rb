class MealSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :ingredients, :category_id, :category
end
