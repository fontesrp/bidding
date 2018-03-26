class BidsController < ApplicationController

  before_action :authenticate_user!

  def create

    bid_params = params.require(:bid).permit :value

    bid = Bid.new bid_params
    bid.auction = Auction.find params.require(:auction_id)
    bid.user = current_user

    if bid.save
      render json: { id: bid.id }
    else
      error bid
    end
  end

  def destroy

    bid = Bid.find params.require(:id)

    if bid.destroy
      render json: { success: true }
    else
      error bid
    end
  end

end
