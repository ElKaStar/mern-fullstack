import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const {loading, request, error, clearError} = useHttp()
    const message = useMessage()
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect( () => {
        window.M.updateTextFields()
    })

    const changeHandler = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
           message(data.message)
        } catch (e) {
        }
    }
    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)
        } catch (e) {
        }
    }


return (
    <div className="row">
        <div className="col s6 offset-s3">
            <nav>
                <div className="nav-wrapper white" style={{marginTop: 10}}>
                    <span className="brand-logo center black-text">Welcome</span>
                </div>
            </nav>
            <div className="card blue-grey darken-1">
                <div className="card-content white-text">
                    <span className="card-title">Authorization</span>
                    <div>

                        <div className="input-field">
                            <input
                                placeholder="enter your email"
                                id="email"
                                type="text"
                                className="validate"
                                name="email"
                                value={form.email}
                                onChange={changeHandler}
                            />
                            <label htmlFor="autocomplete-input">Email</label>

                        </div>
                        <div className="input-field">
                            <input
                                placeholder="enter your password"
                                id="password"
                                type="password"
                                className="validate"
                                name="password"
                                value={form.password}
                                onChange={changeHandler}
                            />
                            <label htmlFor="autocomplete-input">Password</label>

                        </div>

                    </div>
                </div>
                <div className="card-action">
                    <button
                        className="btn rebeccapurple darken-2"
                        style={{marginRight: 5}}
                        disabled={loading}
                        onClick={loginHandler}
                    >Log in
                    </button>
                    <button
                        className="btn rebeccapurple darken-2"
                        style={{marginRight: 5}}
                        onClick={registerHandler}
                        disabled={loading}
                    >Register
                    </button>
                </div>
            </div>
        </div>

    </div>
)


}


