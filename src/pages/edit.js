import React from "react";
import { useQuery, gql, useMutation } from "@apollo/client";

import NoteForm from "../components/NoteForm";
import { GET_NOTE, GET_ME } from "../gql/query";
import { EDIT_NOTE } from '../gql/mutation';

const EditNote = props => {
    const id = props.match.params.id;

    // hook을 query하며 ID 값을 variable로 전달
    const { loading, error, data } = useQuery(GET_NOTE, { variables: { id }});
    const { data: userdata } = useQuery(GET_ME);
    // Define mutation
    const [editNote] = useMutation(EDIT_NOTE, {
        variables: {
            id
        },
        onCompleted: () => {
            props.history.push(`/note/${id}`);
        }
    });

    // data loading 중이면 loading message 표시
    if (loading) return <p>Loading...</p>;
    // data loading 중에 error가 발생하면 error message 표시
    if (error) return <p>Error! Note not found</p>
    // if the current user and the author of the note do not match
    if (userdata.me.id !== data.note.author.id) {
        return <p>You do not have access to edit this note</p>;
    }

    // data loading에 성공하면 UI에 data 표시
    return <NoteForm content={data.note.content} action={editNote} />;
};

export default EditNote;
