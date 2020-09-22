class CreateRecipes < ActiveRecord::Migration[6.0]
  def change
    create_table :recipes do |t|
      t.string :rate
      t.string :author_tip
      t.string :budget
      t.string :prep_time,
      t.string :name, null: false
      t.string :author
      t.string :difficulty
      t.string :people_quantity
      t.string :cook_time
      t.string :total_time
      t.string :image
      t.string :nb_comment
      t.string 'tags', array: true
      t.string 'ingredients', array: true

      t.timestamps
    end
    add_index :recipes, :tags, using: 'gin'
    add_index :recipes, :ingredients, using: 'gin'
  end
end
