class Comment < ApplicationRecord
  
  validates :body, presence: true,allow_blank:false
  validates :post_id, presence:true;
  validates :user_id, presence:true;
  belongs_to :post
  belongs_to :user
  


end
