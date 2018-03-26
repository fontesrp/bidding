import React, { Component } from "react";

import { Token } from "../lib/requests";

class SignInPage extends Component {

    createToken(evt) {

        const { props } = this;
        const { onSignIn = () => {} } = props;

        evt.preventDefault();

        const data = new FormData(evt.currentTarget);

        Token
            .create({
                email: data.get("email"),
                password: data.get("password")
            })
            .then(function (data) {
                if (data && !data.error) {
                    localStorage.setItem("jwt", data.jwt);
                    onSignIn();
                    props.history.push("/");
                }
            });
    }

    render() {

        return (
            <main
                className="SignInPage"
                style={{
                    margin: "0 1rem"
                }}
            >
                <h2>Sign In</h2>
                <form onSubmit={ this.createToken.bind(this) }>
                    <div>
                        <label htmlFor="email">Email</label>
                        <br />
                        <input
                            type="email"
                            id="email"
                            name="email"
                        />
                    </div>

                    <div>
                        <label htmlFor="password">Password</label>
                        <br />
                        <input
                            type="password"
                            id="password"
                            name="password"
                        />
                    </div>

                    <div>
                        <input type="submit" value="Sign In" />
                    </div>
                </form>
            </main>
        );
    }
}

export default SignInPage;
