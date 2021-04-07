class CategorySerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :meals
end
