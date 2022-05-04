Rails.application.routes.draw do
  default_url_options :host => "localhost:3000"

  resources :posts
  post '/users', to:'users#create'
  post '/users/sign_in', to: 'sessions#create'
  delete '/users/sign_out', to: 'sessions#destroy'
  get '/user_posts/:id', to: 'users#user_posts'
  patch '/edituser',to: 'users#user_edit'
  get '/addfriend',to: 'users#friends_index'
  devise_for :users,expect: [:update]
  # custom users routes

end
