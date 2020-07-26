import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";
import {NotePage} from "./NotePage";
import {Loader} from "../components/loader";

export const NotesPage = () => {

    useEffect( () => {
        window.M.updateTextFields()
    })

    const auth = useContext(AuthContext)
    const message = useMessage()
    const {request, loading} = useHttp()
    const [note, setNote] = useState('')
    const [notesArray, setNotesArray] = useState([])


    const getNotes = useCallback(async () => {
            try {
                const data = await request('/api/notes', 'GET', null ,  { Authorization: `Bearer ${auth.token}`})
                setNotesArray(data)
            } catch (e) {
            }
        },[request, auth.token])

    useEffect(() => {
        getNotes()

    },[getNotes])


    const newPostHandler = async () => {
        const date = Date.now()
        const owner = auth.userId
        try {
            console.log("I sent request")
            const data = await request('/api/notes/new', 'POST', {note, date, owner}, { Authorization: `Bearer ${auth.token}`})
            message(data.message)
            setNote('')
            getNotes()

        } catch (e) {
        }
    }
    const onChangeHandler = (e) => {
        setNote(e.target.value)
    }

    if (loading) {
        return <Loader />
    }


    return (
        <div>
            <div className="row">
                <h4>Notes</h4>
                <div className="input-field col s12">
                    <textarea
                        id="newnote"
                        className="materialize-textarea"
                        data-length="120"
                    placeholder="enter your note here"
                        value={note}
                        onChange={onChangeHandler}
                    >
                    </textarea>
                    <button
                        className="btn rebeccapurple darken-2"
                        style={{marginRight: 5}}
                        onClick={newPostHandler}
                    >Save
                    </button>
                </div>
                <div>
                    <NotePage notes={notesArray}/>
                </div>
            </div>
        </div>
    )
}