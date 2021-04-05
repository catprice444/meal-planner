class CreateMeals < ActiveRecord::Migration[6.1]
  def change
    create_table :meals do |t|
      t.string :name
      t.string :ingredients
      t.references :category, null: false, foreign_key: true

      t.timestamps
    end
  end
end
