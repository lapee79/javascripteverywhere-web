import React from "react";
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { gql, useQuery } from "@apollo/client";

import logo from '../img/logo.svg';
import ButtonAsLink from "./ButtonAsLink";

const HeaderBar = styled.header`
    width: 100%;
    padding: 0.5em 1em;
    display: flex;
    height: 64px;
    position: fixed;
    align-items: center;
    background-color: #fff;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.25);
    z-index: 1;
`;

const LogoText = styled.h1`
    margin: 0;
    padding: 0;
    display: inline;
`;

const UserState = styled.div`
    margin-left: auto;
`;

const IS_LOGGED_IN = gql`
    {
        isLoggedIn @client
    }
`;

const Header = props => {
    // login status인 User에게 query hook
    const { data, client } = useQuery(IS_LOGGED_IN);

    return (
        <HeaderBar>
            <img src={logo} alt="Notedly Logo" height="40" />
            <LogoText>Notedly</LogoText>
            {/* If logged in display a log out link, else display sign in options */}
            <UserState>
                {data.isLoggedIn ? (
                    <ButtonAsLink onClick={() => {
                        // Remove the token
                        localStorage.removeItem('token');
                        // Delete the application cache
                        client.resetStore();
                        // Update local state
                        client.writeData({ data: { isLoggedIn: false } });
                        // Redirect the user to the homepage
                        props.history.push('/');
                    }}>Log Out</ButtonAsLink>
                ) : (
                    <p>
                        <Link to={'/signin'}>Sign In</Link> or{' '}
                        <Link to={'/signup'}>Sign Up</Link>
                    </p>
                )}
            </UserState>
        </HeaderBar>
    );
};

export default withRouter(Header);