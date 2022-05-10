Rails.application.routes.draw do
  default_url_options :host => "localhost:3000"

  resources :posts do 
    get '/comments/userinfo',to: 'comments#get_comments_userInfo_for_each_post'
    resources :comments

  end

  post '/users', to:'users#create'
  post '/users/sign_in', to: 'sessions#create'
  delete '/users/sign_out', to: 'sessions#destroy'
  get '/user_posts/:id', to: 'users#user_posts'
  devise_for :users
 

end
