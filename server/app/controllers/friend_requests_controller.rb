require 'json'

class FriendRequestsController < ApplicationController
  before_action :set_friend_request, only: [:show, :update, :destroy]

  # GET /friend_requests
  def index
    @friend_requests = FriendRequest.all
    render json: @friend_requests
  end

  # GET /friend_requests/1
  def show
    render json: @friend_request
  end

  def user_friendRequests 
    @user=User.where(id: params[:id]).first
    @requests=@user.friendRequests
    friends=[]
    for i in @requests do 
      puts(i.friend_id)
      username=User.where(id: i.friend_id).first
      friends.append({username: username, requests: i})
    end 
    puts("====================================")
    puts(friends)
    if !friends.nil?
      render json: friends
    else
      render json: {status: false , message: 'No friendRequest'}
    end

  end

  # POST /friend_requests
  def create
    @friend_request = FriendRequest.new(friend_request_params)
    if @friend_request.save
      render json: @friend_request, status: :created, location: @friend_request
    else
      render json: @friend_request.errors.full_messages, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /friend_requests/1
  def update
    if @friend_request.update(friend_request_params)
      render json: @friend_request
    else
      render json: @friend_request.errors, status: :unprocessable_entity
    end
  end

  # DELETE /friend_requests/1
  def destroy
    @friend_request.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_friend_request
      @friend_request = FriendRequest.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def friend_request_params
      params.require(:friend_request).permit(:user_id, :friend_id)
    end
end
