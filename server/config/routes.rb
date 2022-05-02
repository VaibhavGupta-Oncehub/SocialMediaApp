Rails.application.routes.draw do
  default_url_options :host => "localhost:3000"

  resources :posts
  post '/users', to:'users#create'
  post '/users/sign_in', to: 'sessions#create'
  delete '/users/sign_out', to: 'sessions#destroy'
  get '/user_posts/:id', to: 'users#user_posts'
  devise_for :users
  # custom users routes
 

end
