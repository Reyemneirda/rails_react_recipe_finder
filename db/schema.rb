# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_09_22_215124) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "recipes", force: :cascade do |t|
    t.string "rate"
    t.string "author_tip"
    t.string "budget"
    t.string "prep_time", null: false
    t.string "name", null: false
    t.string "author"
    t.string "difficulty"
    t.string "people_quantity"
    t.string "cook_time"
    t.string "total_time"
    t.string "image"
    t.string "nb_comment"
    t.string "tags", array: true
    t.string "ingredients", null: false, array: true
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["ingredients"], name: "index_recipes_on_ingredients", using: :gin
    t.index ["tags"], name: "index_recipes_on_tags", using: :gin
  end

end
