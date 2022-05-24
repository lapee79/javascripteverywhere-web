import React, { useEffect } from "react";
import styled from 'styled-components';

import Button from '../components/Button';

const Wrapper = styled.div`
    border: 1px solid #f5f4f0;
    max-width: 500px;
    padding: 1em;
    margin: 0 auto;
`;

const Form = styled.form`
    label,
    input {
        isplay: block;
        ine-height: 2em;
    }

    input {
        width: 100%;
        margin-bottom: 1em;
    }
`;

// 나중에 쓰기 위해 props를 포함한 후 component에 전달
const SignUp = props => {
    useEffect(() => {
        // 문서 제목 update
        document.title = 'Sign Up - Notedly';
    });

    return (
        <Wrapper>
            <h2>Sign Up</h2>
            <Form>
                <label htmlFor="username">Username:</label>
                <input
                    required
                    type="text"
                    id="username"
                    name="username"
                    placeholder="username"
                />
                <label htmlFor="email">Email:</label>
                <input
                    required
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                />
                <label htmlFor="password">Password:</label>
                <input
                    required
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                />
                <Button type="submit">Submit</Button>
            </Form>
        </Wrapper>
    );
};

export default SignUp;
