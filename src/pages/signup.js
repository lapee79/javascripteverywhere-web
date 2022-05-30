import React, { useEffect } from 'react';
import { gql, useApolloClient, useMutation } from "@apollo/client";

import UserForm from '../components/UserForm';

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

    // Apollo Client
    const client = useApolloClient();
    // mutation hook
    const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
        onCompleted: data => {
            // JWT를 localStorage에 저장
            localStorage.setItem('token', data.signUp);
            // Update localCache
            client.writeData({ data: { isLoggedIn: true } });
            // User를 home으로 redirect
            props.history.push('/');
        }
    });

    return (
        <React.Fragment>
            <UserForm action={signUp} formType="signup" />
            {/* if the data is loading, display a loading message */}
            {loading && <p>Loading...</p>}
            {/* if there is an error, display a error message */}
            {error && <p>Error creating an account!</p>}
        </React.Fragment>
    );
};

export default SignUp;
