class User < ApplicationRecord
  enum status: [ :active, :inactive ]

  validates :email, uniqueness: true
end
