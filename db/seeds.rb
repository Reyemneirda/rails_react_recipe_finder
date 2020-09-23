# require "json"
# lines = File.open("db/recipes.json").read.split("}\n").join("},")

# data = ActiveSupport::JSON.decode([lines].to_s) 

File.open('db/recipes.json', 'r') do |file|
    file.each do |line|
        user_attrs = JSON.parse line
        Recipe.create!(
            rate: user_attrs['rate'],
            author_tip: user_attrs['author_tip'],
            budget: user_attrs['budget'],
            prep_time: user_attrs['prep_time'],
            name: user_attrs['name'],
            author: user_attrs['author'],
            difficulty: user_attrs['difficulty'],
            people_quantity: user_attrs['people_quantity'],
            cook_time: user_attrs['cook_time'],
            total_time: user_attrs['total_time'],
            image: user_attrs['image'],
            nb_comment: user_attrs['nb_comment'],
            tags: user_attrs['tags'],
            ingredients: user_attrs['ingredients'],
        )
    end
end