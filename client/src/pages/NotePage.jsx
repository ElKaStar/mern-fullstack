import React, {useEffect, useState} from 'react'

export const NotePage = ({notes}) => {

    const [reversNotes, setReversNotes] = useState([])

    useEffect(() => {
        setReversNotes(notes.reverse())
    },[notes])

    if (!notes.length) {
        return <p className="center">No one note added yet</p>
    }

    return (
        <div>
        {reversNotes.map( note => {
            return (
                <div className="col s12 m8 offset-m2 l6 offset-l3">
                    <div className="card-panel grey lighten-5 z-depth-1">
                        <div className="row valign-wrapper">
                            <div className="col s3">
                                <span className="black-text">{new Date(note.date).toLocaleDateString()}</span>
                            </div>
                            <div className="col s9">
              <span className="black-text">
                  {note.note}
              </span>
                            </div>
                        </div>
                    </div>
                </div>)
        })}
        </div>
    )



}