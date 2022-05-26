import React from "react";
import ReactDOM from "react-dom";

// Import Apollo client library
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from "apollo-link-context";

import GlobalStyle from "./components/GlobalStyle";
import Pages from "./pages";

// API URI 및 cache 설정
const uri = process.env.API_URI;
const httpLink = createHttpLink({ uri });
const cache = new InMemoryCache();

// token을 확인하고 context에 대한 header 반환
const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            authorization: localStorage.getItem('token') || ''
        }
    };
});

// Apollo Client 설정
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
    resolvers: {},
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