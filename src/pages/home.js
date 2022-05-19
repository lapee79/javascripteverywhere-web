import React from "react";
import { useQuery, gql } from "@apollo/client";

import Button from "../components/Button";

// variable로 저장한 graphQL query
const GET_NOTES = gql`
    query noteFeed($cursor: String) {
        noteFeed(cursor: $cursor) {
            cursor
            hasNextPage
            notes {
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
    }
`;

const Home = () => {
    // Hook query
    const { data, loading, error, fetchMore } = useQuery(GET_NOTES);

    // data loading 이면 loading message 표시
    if (loading) {
        return <p>Loading...</p>;
    }
    // data loading 중에 error 발생하면 error message 표시
    if (error) {
        return <p>Error!</p>
    }

    // data loading에 성공하면 UI에 data 표시
    return (
        <div>
            {data.noteFeed.notes.map(note => (
                <div key={note.id}>{note.author.username}</div>
            ))}
        </div>
    );
};

export default Home;
