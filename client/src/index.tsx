import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {ApolloClient, InMemoryCache} from '@apollo/client';
import {ApolloProvider} from "@apollo/react-hooks";
import "./styles/index.css";

const client = new ApolloClient({
    uri: '/api',
    cache: new InMemoryCache(),
    headers: {
        "X-CSRF-TOKEN": sessionStorage.getItem("token") || ""
    }
});

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <App/>
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
