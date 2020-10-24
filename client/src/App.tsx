import React, {useEffect, useRef, useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {AppHeader, ErrorBanner, Home, Host, Listing, Listings, Login, NotFound, User} from "./components";
import {Affix, Layout} from "antd";
import {Viewer} from "./graphql/types";
import {useMutation} from "@apollo/client";
import {LogIn as LogInData, LogInVariables} from "./graphql/mutations/LogIn/__generated__/LogIn";
import {LOG_IN} from "./graphql/mutations/LogIn";

const initialViewer: Viewer = {
    id: null,
    token: null,
    avatar: null,
    hasWallet: null,
    didRequest: false
}

function App() {
    const [viewer, setViewer] = useState<Viewer>(initialViewer);
    const [logIn, {error}] = useMutation<LogInData, LogInVariables>(LOG_IN, {
        onCompleted: data => {
            if (data && data.logIn) {
                setViewer(data.logIn);

                if (data.logIn.token) {
                    sessionStorage.setItem("token", data.logIn.token);
                } else {
                    sessionStorage.removeItem("token");
                }
            }
        }
    });

    const logInRef = useRef(logIn);

    useEffect(() => {
        logInRef.current();
    }, []);

    const logInErrorBannerElement = error
        ? <ErrorBanner description="We weren't able to verify if you were logged in. Please try again later!"/>
        : null;

    return (
        <Router>
            <Layout id="app">
                {logInErrorBannerElement}
                <Affix offsetTop={0} className={"app__affix-header"}>
                    <AppHeader viewer={viewer} setViewer={setViewer}/>
                </Affix>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/host" component={Host}/>
                    <Route exact path="/listing/:id" component={Listing}/>
                    <Route exact path="/listings/:location?" component={Listings}/>
                    <Route
                        exact
                        path="/login"
                        render={props => <Login {...props} setViewer={setViewer}/>}
                    />
                    <Route exact path="/user/:id" component={User}/>
                    <Route exact component={NotFound}/>
                </Switch>
            </Layout>
        </Router>
    );
}

export default App;
