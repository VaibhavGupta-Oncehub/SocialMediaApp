class UsersController < ApplicationController
  def create
    @user=User.new(user_params)
    if @user.save
      render :create 
    else
      head(:unprocessable_entity)
    end
  end 

  def user_posts
    @user= User.find_by(user_post_params)

    if !@user.nil?
      render json: @user.posts
    else
      render json: {status: false , message: 'User does not exist.'}
    end

  end

  private 
  def user_params 
    params.require(:user).permit(:email,:password, :password_confirmation,:first_name,:last_name,:age,:gender,:username)
  end

  def user_post_params
    params.permit(:id)
  end

end
