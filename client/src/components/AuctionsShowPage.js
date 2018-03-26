import React, { Component } from "react";

import { Auction, Bid } from "../lib/requests";
import { toCurrency } from "../lib/util";
import Bids from "./Bids";

class AuctionsShowPage extends Component {

    constructor(props) {

        super(props);

        this.state = {
            loading: true,
            auction: {}
        };
    }

    componentDidMount() {
        this.fetchAuction();
    }

    fetchAuction() {

        const auctionId = this.props.match.params.id;

        Auction
            .show(auctionId)
            .then(auction => {
                this.setState({
                    loading: false,
                    auction
                });
            });

        this.setState({
            loading: true
        });
    }

    currentPrice(bids) {
        return bids.reduce((price, bid) => Math.max(price, bid.value), 0);
    }

    reservePriceMet(auction, price) {

        const met = (auction.reserve_price > price)
            ? "Not "
            : "";

        return `Reserve Price ${met}Met`;
    }

    onAddBid(evt) {

        evt.preventDefault();

        const auctionId = this.props.match.params.id;
        const form = evt.currentTarget;
        const data = new FormData(form);

        const props = {
            value: data.get("value")
        };

        Bid
            .create(auctionId, props)
            .then(() => this.fetchAuction());

        this.setState({
            loading: true
        });
    }

    render() {

        const { loading, auction } = this.state;

        if (loading) {
            return (
                <main
                    className="AuctionsShowPage"
                    style={{
                        margin: "0 1rem"
                    }}
                >
                    <h2>Auction</h2>
                    <h3>Loading...</h3>
                </main>
            );
        }

        const price = this.currentPrice(auction.bids);
        const owner = (auction.user_id === this.props.user.id);

        return (
            <main
                className="AuctionsIndexPage"
                style={{
                    margin: "0 1rem"
                }}
            >
                <div>
                    <h3>{ auction.title }</h3>
                    <p>Current Price: { toCurrency(price) }</p>
                </div>
                <div>
                    <p>{ auction.details }</p>
                    <p>{ this.reservePriceMet(auction, price) }</p>
                </div>
                <Bids onAddBid={ this.onAddBid.bind(this) } bids={ auction.bids } owner={ owner } />
            </main>
        );
    }
}

export default AuctionsShowPage;
