Rails.application.routes.draw do
  resources :posts
  post '/users', to:'users#create'
  post '/users/sign_in', to: 'sessions#create'
  delete '/users/sign_out', to: 'sessions#destroy'
  devise_for :users

end
