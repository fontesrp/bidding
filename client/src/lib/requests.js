const DOMAIN = "localhost:3000";
const BASE_URL = `http://${DOMAIN}`;

const getJwt = function () {
    return localStorage.getItem("jwt");
};

const request = function (params) {

    return fetch(`${BASE_URL}${params.path}`, {
        headers: {
            "Authorization": getJwt(),
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        method: params.method,
        body: JSON.stringify(params.body),
        mode: "cors"
    })
        .then(res => res.json())
        .catch(() => { return { error: "request error" }; });
};

// HTTP REQUESTS

const Token = {

    create(params) {
        return request({
            path: "/tokens",
            method: "POST",
            body: params
        });
    }
};

const Bid = {

    index(auctionId) {
        return request({
            path: `/auctions/${auctionId}/bids`,
            method: "GET"
        });
    },

    create(auctionId, params) {
        return request({
            path: `/auctions/${auctionId}/bids`,
            method: "POST",
            body: params
        });
    }
};

const Auction = {

    index() {
        return request({
            path: "/auctions",
            method: "GET"
        });
    },

    destroy(id) {
        return request({
            path: `/auctions/${id}`,
            method: "DELETE"
        });
    },

    show(id) {

        let auctionProps;

        return request({
            path: `/auctions/${id}`,
            method: "GET"
        })
            .then(function (auction) {
                auctionProps = { ...auction };
                return Bid.index(auction.id);
            })
            .then(function (bids) {
                auctionProps.bids = bids;
                return auctionProps;
            });
    },

    create(params) {
        return request({
            path: "/auctions",
            method: "POST",
            body: params
        });
    }
};

export { Token, Auction, Bid };
