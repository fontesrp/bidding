class BidsController < ApplicationController

  before_action :authenticate_user!
  before_action :find_auction, only: [:index, :create]

  def index
    render json: @auction.bids
  end

  def create

    if @auction.user == current_user
      return render json: { error: "Cannot bid on your own Auction" }
    end

    bid_params = params.require(:bid).permit :value

    bid = Bid.new bid_params
    bid.auction = @auction;
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

  private

  def find_auction
    @auction = Auction.find params.require(:auction_id)
  end

end
