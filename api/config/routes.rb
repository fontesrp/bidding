Rails.application.routes.draw do

  resources :auctions, shallow: true do
    resources :bids, only: [:create, :destroy, :index]
  end

  resources :tokens, only: :create
end
