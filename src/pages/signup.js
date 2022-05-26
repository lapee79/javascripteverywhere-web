import { gql, useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
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

const SIGNUP_USER = gql`
    mutation signUp($email: String!, $username: String!, $password: String!) {
        signUp(email: $email, username: $username, password: $password)
    }
`;

// 나중에 쓰기 위해 props를 포함한 후 component에 전달
const SignUp = props => {
    // 기본 양식 상태 설정
    const [values, setValues] = useState();

    // 사용자가 양식을 채우면 상태 업데이트
    const onChange = event => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    useEffect(() => {
        // 문서 제목 update
        document.title = 'Sign Up - Notedly';
    });

    // mutation hook 추가
    const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
        onCompleted: data => {
            // mutation이 완료되면 JWT를 logging
            console.log(data.signUp);
        }
    });

    return (
        <Wrapper>
            <h2>Sign Up</h2>
            {/* User가 Form을 제출하면 데이터를 mutation으로 전달 */}
            <Form
                onSubmit={event => {
                    event.preventDefault();
                    signUp({
                        variables: {
                            ...values
                        }
                    });
                }}>
                <label htmlFor="username">Username:</label>
                <input
                    required
                    type="text"
                    id="username"
                    name="username"
                    placeholder="username"
                    onChange={onChange}
                />
                <label htmlFor="email">Email:</label>
                <input
                    required
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    onChange={onChange}
                />
                <label htmlFor="password">Password:</label>
                <input
                    required
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    onChange={onChange}
                />
                <Button type="submit">Submit</Button>
            </Form>
        </Wrapper>
    );
};

export default SignUp;
