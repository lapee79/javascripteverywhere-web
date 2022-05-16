import React from "react";
import styled from 'styled-components';

import Header from "./Header";
import Navigation from "./Navigation";

// Component style
const Wrapper = styled.div`
    /* styled component 내에 media query style 적용 가능 */
    /* 700px 이상 스크린 layout에만 적용 */
    @media (min-width: 700px) {
        display: flex;
        top: 64px;
        position: relative;
        height: calc(100% - 64px);
        width: 100%;
        flex: auto;
        flex-direction: column;
    }
`;

const Main = styled.main`
    position: fixed;
    height: calc(100% - 185px);
    width: 100%;
    padding: 1em;
    overflow-y: scroll;
    /* Again apply media query styles to screens above 700px */
    @media (min-width: 700px) {
        flex: 1;
        margin-left: 220px;
        height: calc(100% - 64px);
        width: calc(100% - 220px);
    }
`;

const Layout = ({ children }) => {
    return (
        <React.Fragment>
            <Header />
            <Wrapper>
                <Navigation />
                <Main>{children}</Main>
            </Wrapper>
        </React.Fragment>
    );
};

export default Layout;
