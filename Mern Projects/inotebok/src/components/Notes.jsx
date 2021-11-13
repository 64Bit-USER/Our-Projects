import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/notes/noteContext'
import AddNote from './AddNote';
import NoteItem from './NoteItem';
import { useHistory } from 'react-router-dom';


const Notes = (props) => {

    const context = useContext(noteContext);
    let history = useHistory();
    const { notes, getNotes, editNote } = context;
    useEffect(() => {
        if (localStorage.getItem('authToken')) {
            getNotes();
            // eslint-disable-next-line
        } else {
            history.push('/');
        }
    }, [])
    const ref = useRef(null);
    const closeRef = useRef(null);
    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    };
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
    const handleClick = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag);
        closeRef.current.click();
        props.showAlert('Updated Succesfully', 'success')
    };
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };
    return (
        <>
            <AddNote showAlert={props.showAlert} />
            {/* <!-- Button trigger modal --> */}
            <button ref={ref} type="button" className="d-none btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Edit Note
            </button>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-4">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" value={note.edescription} name="edescription" onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" value={note.etag} id="etag" name="etag" onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={closeRef} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" disabled={note.etitle.length < 5 || note.edescription.length < 5} onClick={handleClick} className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h1>Your Notes</h1>
                <div className="container mx-3">
                    {notes.length === 0 && "Add notes to your account"}
                </div>
                {
                    notes.map((note) => { return <NoteItem key={note._id} note={note} updateNote={updateNote} showAlert={props.showAlert} /> })
                }
            </div>
        </>
    )
}

export default Notes;
