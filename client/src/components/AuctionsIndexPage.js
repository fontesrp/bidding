import React, { Component } from "react";
import { Link } from "react-router-dom";

import { Auction } from "../lib/requests";

class AuctionsIndexPage extends Component {

    constructor(props) {

        super(props);

        this.state = {
            auctions: [],
            loading: true
        };
    }

    componentDidMount() {
        this.fetchAuctions();
    }

    fetchAuctions() {

        Auction
            .index()
            .then(auctions => {
                if (!auctions.error) {
                    this.setState({
                        auctions,
                        loading: false
                    });
                }
            });

        this.setState({
            loading: true
        });
    }

    deleteAuction(evt) {

        const id = Number(evt.currentTarget.dataset.id);

        Auction
            .destroy(id)
            .then(() => this.fetchAuctions());
    }

    render() {

        const { user = {} } = this.props;
        const { auctions, loading } = this.state;

        if (loading) {
            return (
                <main
                    className="AuctionsIndexPage"
                    style={{
                        margin: "0 1rem"
                    }}
                >
                    <h2>Auctions</h2>
                    <h3>Loading...</h3>
                </main>
            );
        }

        return (
            <main
                className="AuctionsIndexPage"
                style={{
                    margin: "0 1rem"
                }}
            >
                <h2>Auctions</h2>
                <div>
                    { auctions
                        .map((auc, idx) => (
                            <div key={ idx }>
                                <Link to={ `/auctions/${auc.id}` }>{ auc.title }</Link>
                                { (auc.user_id === user.id)
                                    ? (
                                        <button
                                            data-id={ auc.id }
                                            onClick={ this.deleteAuction.bind(this) }
                                        >
                                            Delete
                                        </button>
                                    )
                                    : null
                                }
                            </div>
                        ))
                    }
                </div>
            </main>
        );
    }
}

export default AuctionsIndexPage;
