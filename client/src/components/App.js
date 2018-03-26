import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwtDecode from "jwt-decode";

import logo from "../logo.svg";
import "../App.css";
import SignInPage from "./SignInPage";
import AuctionsIndexPage from "./AuctionsIndexPage";
import AuctionsShowPage from "./AuctionsShowPage";
import AuctionsNewPage from "./AuctionsNewPage";
import NavBar from "./NavBar";
import AuthRoute from "./AuthRoute";

class App extends Component {

    constructor(props) {

        super(props);

        this.state = {
            user: null
        };
    }

    componentWillMount() {
        this.signIn();
    }

    signIn() {

        const jwt = localStorage.getItem("jwt");

        if (jwt) {

            this.setState({
                user: jwtDecode(jwt)
            });
        }
    }

    signOut() {

        localStorage.removeItem("jwt");

        this.setState({
            user: null
        });
    }

    isSignedIn() {
        return (this.state.user !== null);
    }

    render() {

        const { user } = this.state;

        return (
            <Router>
                <div className="App">
                    <NavBar user={ user } />
                    <Switch>
                        <AuthRoute
                            isAuthenticated={ this.isSignedIn() }
                            path="/auctions"
                            component={ props => <AuctionsIndexPage { ...props } user={ user } /> }
                            exact
                        />
                        <AuthRoute
                            isAuthenticated={ this.isSignedIn() }
                            path="/auctions/:id(\d+)"
                            component={ props => <AuctionsShowPage { ...props } user={ user } /> }
                        />
                        <AuthRoute
                            isAuthenticated={ this.isSignedIn() }
                            path="/auctions/new"
                            component={ props => <AuctionsNewPage { ...props } user={ user } /> }
                        />
                        <Route
                            path="/sign_in"
                            component={ props => <SignInPage  { ...props } onSignIn={ this.signIn.bind(this) } /> }
                        />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
