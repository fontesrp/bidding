class AuctionsController < ApplicationController

  before_action :authenticate_user!
  before_action :find_auction, only: [:update, :destroy]

  def index
    render json: Auction.order(created_at: :desc)
  end

  def create

    auction = Auction.new auction_params
    auction.user = current_user

    if auction.save
      render json: { id: auction.id }
    else
      error auction
    end
  end

  def show
    render json: Auction.find(params.require(:id))
  end

  def update
    if @auction.update auction_params
      redirect_to @auction
    else
      error @auction
    end
  end

  def destroy
    if @auction.destroy
      render json: { success: true }
    else
      error @auction
    end
  end

  private

  def auction_params
    params.require(:auction).permit :title, :details, :ends_on, :reserve_price
  end

  def find_auction
    @auction = Auction.find params.require(:id)
  end
end
