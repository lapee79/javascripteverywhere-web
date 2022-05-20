import React from "react";
import { useQuery, gql } from "@apollo/client";

import Note from "../components/Note";

const GET_NOTE = gql`
    query note($id: ID!) {
        note(id: $id) {
            id
            createdAt
            content
            favoriteCount
            author {
                username
                id
                avatar
            }
        }
    }
`;

const NotePage = props => {
    // URL의 ID를 variable로 저장
    const id = props.match.params.id;

    // hook을 query하며 ID 값을 variable로 전달
    const { loading, error, data } = useQuery(GET_NOTE, { variables: { id }});
    // data loading 중이면 loading message 표시
    if (loading) return <p>Loading...</p>;
    // data loading 중에 error가 발생하면 error message 표시
    if (error) return <p>Error! Note not found</p>

    // data loading에 성공하면 UI에 data 표시
    return <Note note={data.note} />;
};

export default NotePage;
