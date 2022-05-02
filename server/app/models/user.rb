class User < ApplicationRecord
  
  acts_as_token_authenticatable
  
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,:confirmable
         
  def invalidate_all_sessions!
    update_attribute(:authentication_token, SecureRandom.hex)
  end

  has_many :posts,:dependent =>:destroy

  validates :first_name, presence: true, allow_blank:false
  validates :last_name, presence: true, allow_blank:false
  validates :username, presence: true, allow_blank:false,uniqueness:true
  validates :password, presence: true, allow_blank:false
  validates :email, presence: true, uniqueness:true
  validates :gender,presence: true, allow_blank:false, :inclusion => %w(Male Female)
  validates :age, presence: true, length: { minimum: 0, maximum: 100 }
end
