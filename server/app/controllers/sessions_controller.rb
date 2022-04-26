class SessionsController < ApplicationController
  def create 
    user=User.where(email: params[:email]).first

    if user.confirmed?

      if user &.valid_password?(params[:password])
          render json: user.as_json(only: [:id ,:first_name,:last_name,:username,:age,:gender, :email,:authentication_token]),status: :created
      else 
          head(:unauthorized)
      end
    else
      render json: { error: true, message: 'Please confirm your registered email to access your account.'}, 
        status: 401 and return
    end
  end 
  
  def destroy
  end

end