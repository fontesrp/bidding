import React from "react";

const BidCreate = function (props) {
    return (
        <form onSubmit={ props.onAddBid }>
            <div>
                <label htmlFor="value" />
                <input id="value" name="value" type="number" required/>
            </div>
            <input type="submit" value="Bid" />
        </form>
    );
};

export default BidCreate;
