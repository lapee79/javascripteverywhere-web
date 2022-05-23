import React, { useEffect } from "react";

// 나중에 쓰기 위해 props를 포함한 후 component에 전달
const SignUp = props => {
    useEffect(() => {
        // 문서 제목 update
        document.title = 'Sign Up - Notedly';
    });

    return (
        <div>
            <p>Sign Up</p>
        </div>
    );
};

export default SignUp;
