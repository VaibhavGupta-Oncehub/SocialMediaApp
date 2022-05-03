class Post < ApplicationRecord

  validates :title, presence: true, allow_blank:false
  validates :description, presence: true, allow_blank:false, length: { minimum: 5 , maximum: 100}
  # validates_format_of :image,presence:true, allow_blank:false, with: %r{\.gif|jpg|png}i, message: "must be a url for gif, jpg, or png image."
  has_one_attached :image
  belongs_to :user

end
