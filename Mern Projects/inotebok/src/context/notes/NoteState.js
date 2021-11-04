import NoteContext from './noteContext';
import { useState } from 'react';

const NoteState = (props) => {
    const notesInital = [
        {
            "_id": "617f7b25c02a87d3a00ea7d4",
            "user": "617ec72cd0a5dda884299804",
            "title": "Title",
            "description": "This is the desciripshon",
            "tag": "basic",
            "date": "2021-11-01T05:29:09.807Z",
            "__v": 0
        },
        {
            "_id": "617f81f3e32c2e5ccb3deee2",
            "user": "617ec72cd0a5dda884299804",
            "title": "Title",
            "description": "This is the desciripshon",
            "tag": "basic",
            "date": "2021-11-01T05:58:11.530Z",
            "__v": 0
        },
        {
            "_id": "617f81f4e32c2e5ccb3deee4",
            "user": "617ec72cd0a5dda884299804",
            "title": "Title",
            "description": "This is the desciripshon",
            "tag": "basic",
            "date": "2021-11-01T05:58:12.292Z",
            "__v": 0
        },
        {
            "_id": "617f81f4e32c2e5ccb3deee6",
            "user": "617ec72cd0a5dda884299804",
            "title": "Title",
            "description": "This is the desciripshon",
            "tag": "basic",
            "date": "2021-11-01T05:58:12.851Z",
            "__v": 0
        },
        {
            "_id": "617f81f3e32c2e5ccb3deee2",
            "user": "617ec72cd0a5dda884299804",
            "title": "Title",
            "description": "This is the desciripshon",
            "tag": "basic",
            "date": "2021-11-01T05:58:11.530Z",
            "__v": 0
        },
        {
            "_id": "617f81f4e32c2e5ccb3deee4",
            "user": "617ec72cd0a5dda884299804",
            "title": "Title",
            "description": "This is the desciripshon",
            "tag": "basic",
            "date": "2021-11-01T05:58:12.292Z",
            "__v": 0
        },
        {
            "_id": "617f81f4e32c2e5ccb3deee6",
            "user": "617ec72cd0a5dda884299804",
            "title": "Title",
            "description": "This is the desciripshon",
            "tag": "basic",
            "date": "2021-11-01T05:58:12.851Z",
            "__v": 0
        },
    ]

    const [notes, setNotes] = useState(notesInital);

    return (
        <NoteContext.Provider value={{ notes, setNotes }} >
            {props.children}
        </NoteContext.Provider >
    )
};

export default NoteState;