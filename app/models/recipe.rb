class Recipe < ApplicationRecord
    validates :name, presence: true
    validates :prep_time, presence: true
    validates ingredients, presence: true
end
