class UsersController < ApplicationController
    # before_action :set_user, only: [:show, :update, :destroy]
  def create
    @user=User.new(user_params)
    if @user.save
      render :create 
    else
      puts(@user.errors.full_messages)
      head(:unprocessable_entity)
    end
  end 

  def user_edit
    puts("=======================================================")
    puts(" in the user edit function ")
    user=User.where(id: params[:id])
    if user==nil 
      puts("============ in the null user =============")
      render json: { error: true, message: 'User not found !'}, 
      status: 401 and return
    end
    if user.update(user_modified_params)
      puts("============ in the user updated  =============")
      render json: user.as_json(only: [:id ,:first_name,:last_name,:username,:age,:gender, :email,:authentication_token]),status: :created
    else
      puts(user.errors.full_messages)
      head(:unprocessable_entity)
    end
  end
  
  
  # #get /users"
  # def index
  #   @users = User.all
  #   render json: @users
  # end

  # GET /user/1
  # def show
  #   render json: @user
  # end
  def userfriend
    x=Friend.find_by(user_id: current_user.id, friend_id: params[:id])
    puts("========")
    puts(x.block)
    if x.block==true
      puts("==== x bloc function === ")
      render json: { error: true, message: 'You are not authorized to see this profile'}, :status => :unauthorized and return
    end

    user=User.where(id: params[:id]).first
    if user==nil 
      puts("==== user is nill === ")
      
      render json: { error: true, message: 'User not found !'}, 
      status: 401 and return
    else 
      puts("==== success === ")

      render json: user.as_json(only: [:id ,:first_name,:last_name,:username,:age,:gender, :email]),status: :created
    end
  end

  # PATCH/PUT /user/1/
  def update
    puts("in the update function ======================================")
    if @user.update(user_modified_params)
      render json: @user
    else
      render json: ErrorSerializer.serialize(@user.errors), status: :unprocessable_entity
    end
  end

  # # DELETE /user/1
  # def destroy
  #   if @user.destroy
  #    render json: {success: true , message: 'User was successfully destroyed'}
  #   else
  #     render json: {success: false , message:"User cant be deleted/"}
  # end
  # def update_info
  #   puts(" inthe update function ========================")
  #   # @user = User.find(params[:id])
  #   # if @user.update(user_params)
  #   #   puts 'the user info successfully updated' #add whatever you want
  #   # else
  #   #   puts 'failed'
  #   # end
  # end
  def friends_index
    user=current_user
    friend_ids=user.friends.pluck(:friend_id)
    users=User.where.not(id: friend_ids << user.id)

    if users
      render json: users
    else
      render json: {status: false , message: 'No user found'}
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
  def user_modified_params
    params.permit(:id,:first_name,:last_name,:age,:gender,:username,:email,);
  end
  # #  # Use callbacks to share common setup or constraints between actions.
  #   def set_user
  #     @user = User.find(params[:id])
  #   end

end
