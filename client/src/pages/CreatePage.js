import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {useHistory} from 'react-router-dom'


export const CreatePage = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const {request} = useHttp()

    useEffect( () => {
        window.M.updateTextFields()
    })

    const [link, setLink] = useState('')
    const onChangeHandler = (event) => {
        setLink(event.target.value)
    }

    const onKeyPressHandler = async (event) => {
        if (event.key === 'Enter') {
            try {
                const data = await request('/api/link/generate', 'POST', {from: link}, {Authorization: `Bearer ${auth.token}`})
                history.push(`/detail/${data.link._id}`)
            } catch (e) {
            }
        }
    }

    return (
        <div className="row">
            <div className="col s8 offset-s2" style={{ paddingTop: '2rem'}}>
                <div className="input-field">
                    <input
                        placeholder="insert your link here"
                        id="link"
                        type="text"
                        className="validate"
                        value={link}
                        onChange={onChangeHandler}
                        onKeyPress={onKeyPressHandler}
                    />
                </div>
            </div>
        </div>
    )


}