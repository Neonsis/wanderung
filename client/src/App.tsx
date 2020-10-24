import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Home, Host, Listing, Listings, NotFound, User} from "./components";

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/host" component={Host}/>
                <Route exact path="/listing/:id" component={Listing}/>
                <Route exact path="/listings/:location?" component={Listings}/>
                <Route exact path="/user/:id" component={User}/>
                <Route exact component={NotFound}/>
            </Switch>
        </Router>
    );
}

export default App;
