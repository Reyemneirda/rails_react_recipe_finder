class Api::V0::RecipesController < ApplicationController
    def index
      recipe = Recipe.all.order(created_at: :desc)
      render json: recipe
    end

    def search
      if params['q'].present?
        @query = params['q']
        recipe = Recipe.where("lower(name) like ?", "%#{@query.downcase}%").or(Recipe.where("array_to_string(ingredients, '||') LIKE ?", "%#{@query.downcase}%" "%gem%")).or(Recipe.where("array_to_string(tags, '||') LIKE ?", "%#{@query.downcase}%" "%gem%"))
        render json: recipe
      end
    end

    def create
    end
  
    def show
      recipe = Recipe.find(params[:id])
      if recipe
        puts recipe
        render json: recipe
      else
        render json: recipe.errors
      end
    end
  
    def destroy
    end
    private

  def recipe_params
    params.permit(:name, :image, :ingredients, :tags, :rate, :author_tip, :budget, :prep_time, :name, 
    :author, :difficulty, :people_quantity, :cook_time, :total_time, :image, :nb_comment)
  end
  end