import React from "react";
import ReactMarkdown from "react-markdown";
import { format } from "date-fns";
import styled from 'styled-components';
import { useQuery } from "@apollo/client";

import NoteUser from "./NoteUser";
import { IS_LOGGED_IN } from "../gql/query";

// Note 행 표시 길이를 800px 이내로 유지
const StyledNote = styled.article`
    max-width: 800px;
    margin: 0 auto;
`;

// Note metadata style 지정
const MetaData = styled.div`
    @media (min-width: 500px) {
        display: flex;
        align-items: top;
    }
`;

// avatar와 meta 정보 사이에 공간 추가
const MetaInfo = styled.div`
    padding-right: 1em;
`;

// 'UserActions'를 화면 우측 정렬
const UserActions = styled.div`
    margin-left: auto;
`;

const Note = ({ note }) => {
    const { loading, error, data } = useQuery(IS_LOGGED_IN);
    // if the data is loading, display a loading message
    if (loading) return <p>Loading...</p>;
    // if there is an error fetching the data, display an error message
    if (error) return <p>Error!</p>;

    return (
        <StyledNote>
            <MetaData>
                <MetaInfo>
                    <img 
                        src={note.author.avatar}
                        alt={`${note.author.username} avatar`}
                        height="50px"
                    />
                </MetaInfo>
                <MetaInfo>
                    <em>by</em> {note.author.username} <br />
                    {format(note.createdAt, 'MMM Do YYYY')}
                </MetaInfo>
                { data.isLoggedIn ? (
                    <UserActions>
                        <NoteUser note={note} />
                    </UserActions>
                ) : (
                    <UserActions>
                        <em>Favorites:</em> {note.favoriteCount}
                    </UserActions>
                ) }
            </MetaData>
            <ReactMarkdown source={note.content} />
        </StyledNote>
    );
};

export default Note;
