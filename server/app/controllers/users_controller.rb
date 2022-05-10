class UsersController < ApplicationController
    before_action :set_user, only: [:show, :update, :destroy]

    def create
    @user=User.new(user_params)
    if @user.save
      render :create 
    else
      head(:unprocessable_entity)
    end
  end 
  
  
  # #get /users"
  # def index
  #   @users = User.all
  #   render json: @users
  # end

  # # GET /user/1
  # def show
  #   render json: @user
  # end

  # PATCH/PUT /user/1
  # def update
  #         if @user.update(user_modified_params)
  #     render json: @user
  #   else
  #     render json: ErrorSerializer.serialize(@user.errors), status: :unprocessable_entity
  #   end
  # end

  # # DELETE /user/1
  # def destroy
  #   if @user.destroy
  #    render json: {success: true , message: 'User was successfully destroyed'}
  #   else
  #     render json: {success: false , message:"User cant be deleted/"}
  # end

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
  # def user_modified_params
  #   params.permit(:id,:first_name,:last_name,:age,:gender,:username,:email:password,:password_confirmation);
  # end
  # #  # Use callbacks to share common setup or constraints between actions.
  #   def set_user
  #     @user = User.find(params[:id])
  #   end

end
