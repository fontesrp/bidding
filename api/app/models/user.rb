class User < ApplicationRecord
  has_many :auctions, dependent: :destroy
  has_many :bids, dependent: :destroy
  has_many :bid_auctions, through: :bids, source: :auction
  has_secure_password
end
