import React from "react";

import { toCurrency } from "../lib/util";
import BidsCreate from "./BidsCreate";

const Bids = function (props) {

    const { bids, owner } = props;

    return (
        <div>
            { (owner) ? null : <BidsCreate { ...props } /> }
            <div>
                <p>Previous bids</p>
                <div>
                    { bids
                        .map(bid => (
                            <p key={ bid.id }>
                                { toCurrency(bid.value) } at { (new Date(bid.created_at)).toLocaleDateString() }
                            </p>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Bids;
