import React from "react";
import ReactDOM from "react-dom";

// Import Apollo client library
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import GlobalStyle from "./components/GlobalStyle";
import Pages from "./pages";

// API URI 및 cache 설정
const uri = process.env.API_URI;
const cache = new InMemoryCache();

// Apollo Client 설정
const client = new ApolloClient({
    uri,
    cache,
    connectToDevTools: true
});

const App = () => {
    return (
        <ApolloProvider client={client}>
            <GlobalStyle />
            <Pages />
        </ApolloProvider>
    )
};

ReactDOM.render(<App />, document.getElementById('root'));