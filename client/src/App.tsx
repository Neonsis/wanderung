import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Home, Host, Listing, Listings, Login, NotFound, User} from "./components";
import {Layout} from "antd";
import {Viewer} from "./graphql/types";

const initialViewer: Viewer = {
    id: null,
    token: null,
    avatar: null,
    hasWallet: null,
    didRequest: false
}

function App() {
    const [viewer, setViewer] = useState<Viewer>(initialViewer);

    console.log(viewer);

    return (
        <Router>
            <Layout id="app">
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
