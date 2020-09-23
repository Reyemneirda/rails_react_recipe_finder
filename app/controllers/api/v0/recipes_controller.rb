class Api::V0::RecipesController < ApplicationController
    def index
      recipe = Recipe.all.order(created_at: :desc)
      render json: recipe
    end

    def search
      if params['t'].present?
        tags = params[:t].split(",")
        if params['limit'].present?
          recipe = Recipe.where("tags @> ARRAY[?]::varchar[]", tags).limit(params['limit']).where.not(id: params[:id])
        else
          recipe = Recipe.where("tags @> ARRAY[?]::varchar[]", @tags)
        end
        render json: recipe
      end

      if params['q'].present?
        @query = params['q']
        if params['limit'].present?
          recipe = Recipe.where("lower(name) like ?", "%#{@query.downcase}%").or(Recipe.where("array_to_string(ingredients, '||') LIKE ?", "%#{@query.downcase}%" "%gem%")).or(Recipe.where("array_to_string(tags, '||') LIKE ?", "%#{@query.downcase}%" "%gem%")).limit(params['limit'])
        else
          recipe = Recipe.where("lower(name) like ?", "%#{@query.downcase}%").or(Recipe.where("array_to_string(ingredients, '||') LIKE ?", "%#{@query.downcase}%" "%gem%")).or(Recipe.where("array_to_string(tags, '||') LIKE ?", "%#{@query.downcase}%" "%gem%"))
        end
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