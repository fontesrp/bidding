import React from "react";

import { Auction } from "../lib/requests";

const onSubmit = function (evt) {

    evt.preventDefault();

    const data = new FormData(evt.currentTarget);

    const params = {
        title: data.get("title"),
        details: data.get("details"),
        ends_on: data.get("ends_on"),
        reserve_price: data.get("reserve_price")
    };

    Auction
        .create(params)
        .then(() => this.history.push("/auctions"));
};

const AuctionsNewPage = function (props) {

    return (
        <main>
            <h1>Create New Auction</h1>
            <form onSubmit={ onSubmit.bind(props) }>
                <div>
                    <label htmlFor="title">Title</label>
                    <input id="title" name="title" type="text" />
                </div>
                <div>
                    <label htmlFor="details">Details</label>
                    <textarea id="details" name="details" cols="80" rows="5" />
                </div>
                <div>
                    <label htmlFor="ends_on">Ends On</label>
                    <input id="ends_on" name="ends_on" type="date" />
                </div>
                <div>
                    <label htmlFor="reserve_price">Reserve Price</label>
                    <input id="reserve_price" name="reserve_price" type="number" />
                </div>
                <input type="submit" value="Save" />
            </form>
        </main>
    );
};

export default AuctionsNewPage;
