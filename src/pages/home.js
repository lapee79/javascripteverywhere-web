import React from "react";
import { useQuery, gql } from "@apollo/client";

import NoteFeed from "../components/NoteFeed";
import Button from '../components/Button';

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
    // query hook
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
        // parent element 제공을 위해 <React.Fragment> 추가
        <React.Fragment>
            <NoteFeed notes={data.noteFeed.notes} />
            {/* hasNextPage가 true면 Load More 표시 */}
            {data.noteFeed.hasNextPage && (
                // onClick은 현재 커서를 변수로 전달하며 쿼리를 수행한다
                <Button
                    onClick={() =>
                        fetchMore({
                            variables: {
                                cursor: data.noteFeed.cursor
                            },
                            updateQuery: (previousResult, { fetchMoreResult }) => {
                                return {
                                    noteFeed: {
                                        cursor: fetchMoreResult.noteFeed.cursor,
                                        hasNextPage: fetchMoreResult.noteFeed.hasNextPage,
                                        // 새 결과를 기존 결과와 결합
                                        notes: [
                                            ...previousResult.noteFeed.notes,
                                            ...fetchMoreResult.noteFeed.notes
                                        ],
                                        __typename: 'noteFeed'
                                    }
                                };
                            }
                        })}>
                    Load more
                </Button>
            )}
        </React.Fragment>
    );
};

export default Home;
