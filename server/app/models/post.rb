class Post < ApplicationRecord
  validates :title, presence: true, allow_blank:false
  validates :description, presence: true, allow_blank:false, length: { minimum: 5 , maximum: 100}
  validates_format_of :image, :with => %r{\.(png|jpg|jpeg)$}i, :message => "Please Upload Correct Format."
end
