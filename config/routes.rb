Rails.application.routes.draw do
  namespace :api do
    namespace :v0 do
      get 'recipes/index'
      get 'recipes/search'
      post 'recipes/create'
      get '/show/:id', to: 'recipes#show'
      delete '/destroy/:id', to: 'recipes#destroy'
    end
  end
  root 'pages#index'
  get '/*path' => 'pages#index'

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
